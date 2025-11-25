import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import Logger from '@/lib/logger';
import { StatisticsResponseSchema } from '@/hooks/reward/dto/statistics';

export async function getStatistics(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    Logger.error('토큰이 없습니다:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/participations/posts/${postId}/statistics`,
    );
    const parsedData = StatisticsResponseSchema.parse(response.data);
    Logger.log('StatisticsData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('StatisticsData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

