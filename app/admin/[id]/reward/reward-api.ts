import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import Logger from '@/lib/logger';
import { StatisticsResponseSchema } from '@/hooks/reward/dto/statistics';
import { ParticipantsResponseSchema } from '@/hooks/reward/dto/participants';
import { ParticipantsQueryParams } from '@/hooks/reward/queries/useParticipantsQuery';

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

export async function getParticipants(postId: number, params?: Partial<ParticipantsQueryParams>) {
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
    const { status, searchKeyword, sortDirection = 'DESC', page = 0, size = 20 } = params || {};

    const queryParams = new URLSearchParams();
    if (status) {
      queryParams.append('searchRequest[status]', status);
    }
    if (searchKeyword) {
      queryParams.append('searchRequest[searchKeyword]', searchKeyword);
    }
    if (sortDirection) {
      queryParams.append('searchRequest[sortDirection]', sortDirection);
    }
    queryParams.append('pageable[page]', page.toString());
    queryParams.append('pageable[size]', size.toString());

    const queryString = queryParams.toString();
    const url = queryString
      ? `/v1/users/participations/posts/${postId}/participants?${queryString}`
      : `/v1/users/participations/posts/${postId}/participants`;

    const response = await serverInstance(accessToken, refreshToken).get(url);
    const parsedData = ParticipantsResponseSchema.parse(response.data);
    Logger.log('ParticipantsData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('ParticipantsData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

