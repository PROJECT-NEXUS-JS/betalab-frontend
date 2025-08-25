import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/auth/reissue`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        RefreshToken: refreshToken.value,
      },
      credentials: 'include',
    });

    console.log(backendResponse);

    if (!backendResponse.ok) {
      console.log('Failed to refresh token');
      return NextResponse.json({ message: 'Refresh failed' }, { status: 401 });
    }

    const json = await backendResponse.json();
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = json.data;

    const res = NextResponse.json({ newAccessToken }, { status: 200 });

    res.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1시간
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
