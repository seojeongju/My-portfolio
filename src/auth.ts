import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// ⚠️ Edge Runtime 제약사항:
// DrizzleAdapter는 모듈 초기화 시점에 getRequestContext()를 호출하므로
// Cloudflare Pages에서 500 에러를 유발합니다.
// 따라서 adapter 없이 JWT 기반 세션으로 운영하고,
// DB 연동은 세션 콜백에서 요청 컨텍스트가 확보된 이후에 수행합니다.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    // adapter 없이는 JWT 전략 사용
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // 최초 로그인 시 user 정보를 token에 포함
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // JWT 전략에서는 token을 통해 user id를 전달
      if (session.user && token.id) {
        session.user.id = token.id as string;

        // DB에서 username 조회 (요청 컨텍스트가 확보된 이후)
        try {
          const { getDb } = await import("@/lib/db-util");
          const db = getDb();
          const dbUser = await db.query.users.findFirst({
            where: (users: any, { eq }: any) => eq(users.id, token.id),
          });
          if (dbUser?.username) {
            (session.user as any).username = dbUser.username;
          }
        } catch (e) {
          // DB 바인딩이 없는 환경(로컬 개발)에서는 조용히 무시
          console.error("Session DB lookup failed:", e);
        }
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
