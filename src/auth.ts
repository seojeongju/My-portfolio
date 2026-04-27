import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "@/lib/db-util";
import * as schema from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth((req) => {
  // getDb()는 getRequestContext()를 사용하므로 요청 핸들러 내에서 호출해야 합니다.
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
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
  };
});
