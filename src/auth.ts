import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "@/lib/db-util";
import * as schema from "@/db/schema";

// getDb()를 호출할 때 오류가 나면 어댑터 없이 초기화되도록 방어막을 칩니다.
const getSafeAdapter = () => {
  try {
    const db = getDb();
    return DrizzleAdapter(db, {
      usersTable: schema.users,
      accountsTable: schema.accounts,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    });
  } catch (e) {
    console.error("Adapter initialization failed:", e);
    return undefined;
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: getSafeAdapter(),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        try {
          const db = getDb();
          const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, user.id),
          });
          if (dbUser?.username) {
            (session.user as any).username = dbUser.username;
          }
        } catch (e) {
          console.error("Session callback DB error:", e);
        }
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
