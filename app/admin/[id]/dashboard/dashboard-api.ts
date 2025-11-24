import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import Logger from '@/lib/logger';
import { StatsResponseSchema } from '@/hooks/dashboard/quries/useStatsQuery';
import { BarChartResponseSchema } from '@/hooks/dashboard/quries/useBarChartQuery';
import { PieChartResponseSchema } from '@/hooks/dashboard/quries/usePieChartQuery';

export async function getStats(postId: number) {
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
      `/v1/users/dashboard/${postId}/stats`,
    );
    const parsedData = StatsResponseSchema.parse(response.data);
    Logger.log('ProjectData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('ProjectData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

export async function getBarChart(postId: number) {
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
      `/v1/users/dashboard/${postId}/analytics/bar-chart`,
    );
    const parsedData = BarChartResponseSchema.parse(response.data);
    Logger.log('BarChartData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('BarChartData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

export async function getPieChart(postId: number) {
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
      `/v1/users/dashboard/${postId}/analytics/pie-chart`,
    );
    const parsedData = PieChartResponseSchema.parse(response.data);
    Logger.log('PieChartData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('PieChartData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}
