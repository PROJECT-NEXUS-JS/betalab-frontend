import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const isAuthenticated = !!token;

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
