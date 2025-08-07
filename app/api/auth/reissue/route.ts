import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/api/v1/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ RefreshToken: refreshToken.value }),
      credentials: 'include',
    });

    if (!backendResponse.ok) {
      return NextResponse.json({ message: 'Refresh failed' }, { status: 401 });
    }

    const json = await backendResponse.json();
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = json.data;

    const res = NextResponse.json({ newAccessToken }, { status: 200 });

    res.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 15, // 15분
      secure: true,
      sameSite: 'lax',
    });

    res.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
      secure: true,
      sameSite: 'lax',
    });

    return res;
  } catch (err) {
    console.error('refresh error', err);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
