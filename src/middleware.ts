// 미들웨어 일시 비활성화 테스트
import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
