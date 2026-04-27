import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 대시보드 경로 보호
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
