// 미들웨어 일시 비활성화 테스트
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
