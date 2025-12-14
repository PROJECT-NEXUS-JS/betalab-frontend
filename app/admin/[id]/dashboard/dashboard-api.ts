import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { StatsResponseSchema } from '@/hooks/dashboard/quries/useStatsQuery';
import { BarChartResponseSchema } from '@/hooks/dashboard/quries/useBarChartQuery';
import { PieChartResponseSchema } from '@/hooks/dashboard/quries/usePieChartQuery';
import { LineChartResponseSchema } from '@/hooks/dashboard/quries/useLineChartQuery';

export async function getStats(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/dashboard/${postId}/stats`,
    );
    StatsResponseSchema.parse(response.data);
    return response.data;
  } catch (err: any) {
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
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/dashboard/${postId}/analytics/bar-chart`,
    );
    BarChartResponseSchema.parse(response.data);
    return response.data;
  } catch (err: any) {
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
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/dashboard/${postId}/analytics/pie-chart`,
    );
    PieChartResponseSchema.parse(response.data);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

export async function getLineChart(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/dashboard/${postId}/analytics/line-chart`,
    );
    LineChartResponseSchema.parse(response.data);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}
