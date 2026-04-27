import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // 대시보드 접근 보호
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/api/auth/signin", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
