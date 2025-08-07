// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const idToken = req.headers.get('id_token');

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: 'id_token이 없습니다.' },
        { status: 400 },
      );
    }

    const backendRes = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { id_token: idToken },
    });

    const contentType = backendRes.headers.get('content-type');
    let responseData: any;

    if (contentType?.includes('application/json')) {
      responseData = await backendRes.json();
    } else {
      const rawText = await backendRes.text();
      console.error('📦 JSON 아님:', rawText);
      return NextResponse.json(
        { success: false, message: `예상치 못한 응답 형식: ${rawText}` },
        { status: backendRes.status },
      );
    }

    if (!backendRes.ok || !responseData.success || !responseData.data) {
      return NextResponse.json(
        { success: false, message: `백엔드 오류: ${responseData.message || '로그인 실패'}` },
        { status: backendRes.status },
      );
    }

    const { accessToken, refreshToken } = responseData.data;

    const response = NextResponse.json({
      success: true,
      accessToken,
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error('API 로그인 에러:', err);
    return NextResponse.json({ success: false, message: '서버 오류' }, { status: 500 });
  }
}
