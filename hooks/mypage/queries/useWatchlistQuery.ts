import { QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { usePostsQueryDto } from '@/hooks/posts/usePostsQueryDto';
import {
  getWatchlistResponseSchema,
  GetWatchlistResponseType,
  GetWatchlistDataType,
} from '../dto/watchlist';

const BASE_PATH = '/v1/users/mypage/watchlist';

async function fetchWatchlist(): Promise<GetWatchlistResponseType> {
  try {
    const res = await instance.get(BASE_PATH);
    return res.data as GetWatchlistResponseType;
  } catch (error: any) {
    if (error.response?.status === 403) {
      const res = await fetch(BASE_PATH);
      const data = await res.json();
      return data as GetWatchlistResponseType;
    }
    throw error;
  }
}

export function useWatchlistQuery(options?: { enabled?: boolean }) {
  const key: QueryKey = ['get-watchlist'];

  return usePostsQueryDto<GetWatchlistDataType, GetWatchlistResponseType>(
    key,
    fetchWatchlist,
    getWatchlistResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled,
    },
  );
}
