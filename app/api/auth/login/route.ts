import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 10000, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return res; // 성공하면 바로 반환
    } catch (err) {
      clearTimeout(id);
      if (attempt === retries) throw err; // 마지막 시도 실패하면 throw
      console.warn(`Fetch 재시도 ${attempt + 1} 실패, 재시도 중...`, err);
    }
  }
  throw new Error('Fetch 실패'); // 안전장치
}

export async function POST(req: NextRequest) {
  try {
    const idToken = req.headers.get('id_token');

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: 'id_token이 없습니다.' },
        { status: 400 },
      );
    }

    const backendRes = await fetchWithTimeout(
      `${BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        headers: { id_token: idToken },
      },
      15000,
      2,
    ); // 타임아웃 15초, 재시도 2회

    const contentType = backendRes.headers.get('content-type');
    let responseData: any;

    if (contentType?.includes('application/json')) {
      responseData = await backendRes.json();
    } else {
      const rawText = await backendRes.text();
      console.error('JSON 아님:', rawText);
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
