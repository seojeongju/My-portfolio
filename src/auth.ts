import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "@/lib/db-util";
import * as schema from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const { handlers, auth, signIn, signOut } = NextAuth((req) => {
  // Cloudflare 환경에서 env 직접 가져오기
  const { env } = getRequestContext();
  const db = getDb();

  return {
    adapter: DrizzleAdapter(db, {
      usersTable: schema.users,
      accountsTable: schema.accounts,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    }),
    providers: [
      Google({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
          // DB에서 사용자 username을 가져와 세션에 추가 (있을 경우)
          const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, user.id),
          });
          if (dbUser?.username) {
            (session.user as any).username = dbUser.username;
          }
        }
        return session;
      },
    },
    // Edge Runtime 호환을 위한 설정
    trustHost: true,
    secret: env.AUTH_SECRET,
  };
});
