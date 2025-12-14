import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { StatisticsResponseSchema } from '@/hooks/reward/dto/statistics';
import { ParticipantsResponseSchema } from '@/hooks/reward/dto/participants';
import { ProjectDetailResponseSchema } from '@/hooks/posts/queries/usePostDetailQuery';
import { ProfileResponseSchema } from '@/hooks/profile/quries/useProfileQurey';

export async function getStatistics(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/participations/posts/${postId}/statistics`,
    );
    StatisticsResponseSchema.parse(response.data);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

interface SearchRequest {
  status?: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'PAID' | 'REJECTED' | null;
  searchKeyword?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export async function getParticipants(
  postId: number,
  searchRequest?: SearchRequest,
  pageable?: { page?: number; size?: number; sort?: string[] },
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Authentication required');
  }

  try {
    const params = new URLSearchParams();

    if (searchRequest) {
      params.append('searchRequest', JSON.stringify(searchRequest));
    }

    if (pageable) {
      params.append(
        'pageable',
        JSON.stringify({
          page: pageable.page ?? 0,
          size: pageable.size ?? 10,
          sort: pageable.sort ?? [],
        }),
      );
    }

    const url = `/v1/users/participations/posts/${postId}/participants${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await serverInstance(accessToken, refreshToken).get(url);
    const parsedData = ParticipantsResponseSchema.parse(response.data);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

export async function getPostDetail(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/posts/${postId}`,
    );
    const parsedData = ProjectDetailResponseSchema.parse(response.data);
    return parsedData;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

export async function getProfile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get('/v1/users/profile');
    const parsedData = ProfileResponseSchema.parse(response.data);
    return parsedData;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}
