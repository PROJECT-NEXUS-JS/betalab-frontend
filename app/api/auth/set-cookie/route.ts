import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { accessToken, refreshToken } = await req.json();
  const res = NextResponse.json({ accessToken: accessToken }, { status: 200 });

  res.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60, // 1시간
    secure: true,
    sameSite: 'lax',
  });

  res.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
    secure: true,
    sameSite: 'lax',
  });

  return res;
}
