import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/auth/reissue`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        RefreshToken: refreshToken,
      },
      credentials: 'include',
    });

    if (!backendResponse.ok) {
      console.error('Failed to refresh token', backendResponse.status, backendResponse.statusText);
      return NextResponse.json({ message: 'Refresh failed' }, { status: 401 });
    }

    const json = await backendResponse.json().catch(parseError => {
      console.error('Failed to parse refresh response', parseError);
      return null;
    });

    if (!json) {
      return NextResponse.json({ message: 'Invalid refresh response' }, { status: 502 });
    }

    const tokensSource = json.data ?? json;
    const newAccessToken = tokensSource?.accessToken;
    const newRefreshToken = tokensSource?.refreshToken;

    if (!newAccessToken || !newRefreshToken) {
      console.error('Refresh response missing tokens', json);
      return NextResponse.json({ message: 'Malformed refresh response' }, { status: 502 });
    }

    const res = NextResponse.json({ message: newAccessToken }, { status: 200 });
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1시간
      secure: isProduction,
      sameSite: 'lax',
    });

    res.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
      secure: isProduction,
      sameSite: 'lax',
    });

    return res;
  } catch (err) {
    console.error('refresh error', err);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
