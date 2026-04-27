import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

// ✅ Edge Runtime 핵심 패턴:
// NextAuth()를 함수 내부에서 지연 초기화하여,
// getRequestContext()가 반드시 요청 처리 중에만 호출되도록 합니다.
// 모듈 로드 시점에 호출하면 Cloudflare 컨텍스트가 없어 500 에러가 발생합니다.

function createNextAuth() {
  // 요청 컨텍스트에서 D1 바인딩을 가져와 DrizzleAdapter를 초기화합니다.
  let env: any = {};
  let adapter;
  try {
    const ctx = getRequestContext();
    env = ctx.env;
    const db = drizzle(env.DB, { schema });
    adapter = DrizzleAdapter(db, {
      usersTable: schema.users,
      accountsTable: schema.accounts,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    });
  } catch {
    // 로컬 개발 환경이나 빌드 시점에는 adapter 없이 진행
    adapter = undefined;
  }

  return NextAuth({
    adapter,
    providers: [
      Google({
        clientId: env?.AUTH_GOOGLE_ID || process.env.AUTH_GOOGLE_ID,
        clientSecret: env?.AUTH_GOOGLE_SECRET || process.env.AUTH_GOOGLE_SECRET,
      }),
    ],
    // adapter가 있을 때는 database 전략, 없을 때는 jwt 전략으로 fallback
    session: {
      strategy: adapter ? "database" : "jwt",
    },
    callbacks: {
      async session({ session, user, token }) {
        if (session.user) {
          // JWT fallback의 경우 token에서 id를 가져옵니다.
          const id = user?.id ?? (token?.sub as string);
          if (id) {
            session.user.id = id;
            
            // 데이터베이스 어댑터를 사용하는 경우 (Cloudflare D1)
            // JWT 전략일지라도 필요시 D1에서 추가 정보를 가져올 수 있습니다.
            if (!adapter) {
              try {
                const ctx = getRequestContext();
                const db = drizzle(ctx.env.DB, { schema });
                const dbUser = await db.query.users.findFirst({
                  where: (u, { eq }) => eq(u.id, id),
                });
                if (dbUser?.username) {
                  (session.user as any).username = dbUser.username;
                }
              } catch (e) {
                console.error("Failed to fetch user from DB in session callback", e);
              }
            }
          }
        }
        return session;
      },
    pages: {
      signIn: '/auth/signin',
    },
    trustHost: true,
    secret: env?.AUTH_SECRET || process.env.AUTH_SECRET,
  });
}

// NextAuth 인스턴스를 싱글턴으로 캐싱합니다.
// Cloudflare Worker isolate 내에서는 재사용 가능합니다.
let _instance: ReturnType<typeof NextAuth> | null = null;

function getInstance() {
  if (!_instance) {
    _instance = createNextAuth();
  }
  return _instance;
}

// handlers, auth, signIn, signOut를 Proxy로 노출하여
// 실제 호출 시점에 인스턴스가 초기화되도록 합니다.
export const handlers = new Proxy(
  {} as ReturnType<typeof NextAuth>["handlers"],
  {
    get(_t, prop) {
      return getInstance().handlers[prop as keyof ReturnType<typeof NextAuth>["handlers"]];
    },
  }
);

export const auth = ((...args: Parameters<ReturnType<typeof NextAuth>["auth"]>) =>
  getInstance().auth(...args)) as ReturnType<typeof NextAuth>["auth"];

export const signIn = ((...args: Parameters<ReturnType<typeof NextAuth>["signIn"]>) =>
  getInstance().signIn(...args)) as ReturnType<typeof NextAuth>["signIn"];

export const signOut = ((...args: Parameters<ReturnType<typeof NextAuth>["signOut"]>) =>
  getInstance().signOut(...args)) as ReturnType<typeof NextAuth>["signOut"];
