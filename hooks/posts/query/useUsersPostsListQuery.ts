import { QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { usePostsQueryDto } from '../usePostsQueryDto';
import {
  getUsersPostsListRequestSchema,
  getUsersPostsListResponseSchema,
  GetUsersPostsListRequestType,
  GetUsersPostsListResponseType,
  GetUsersPostsListDataType,
} from '../dto/postList';

const BASE_PATH = '/v1/users/posts/list';

function buildQueryParams(params: GetUsersPostsListRequestType): string {
  const qp = new URLSearchParams();

  if (params.mainCategory) qp.set('mainCategory', params.mainCategory);
  if (params.platformCategory) qp.set('platformCategory', params.platformCategory);
  if (params.genreCategory) qp.set('genreCategory', params.genreCategory);
  if (params.keyword) qp.set('keyword', params.keyword);
  if (params.sortBy) qp.set('sortBy', params.sortBy);

  if (typeof params.page === 'number') qp.set('page', String(params.page));
  if (typeof params.size === 'number') qp.set('size', String(params.size));
  (params.sort ?? []).forEach(s => qp.append('sort', s));

  const qs = qp.toString();
  return qs ? `${BASE_PATH}?${qs}` : BASE_PATH;
}

async function fetchUsersPostsList(
  params: GetUsersPostsListRequestType,
): Promise<GetUsersPostsListResponseType> {
  const url = buildQueryParams(params);
  const res = await instance.get(url);
  return res.data as GetUsersPostsListResponseType;
}

export function useUsersPostsListQuery(
  params: GetUsersPostsListRequestType,
  options?: { enabled?: boolean },
) {
  const key: QueryKey = ['usersPostsList', params];

  const parsed = getUsersPostsListRequestSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(`Request schema validation failed: ${JSON.stringify(parsed.error.issues)}`);
  }

  return usePostsQueryDto<GetUsersPostsListDataType, GetUsersPostsListResponseType>(
    key,
    () => fetchUsersPostsList(parsed.data),
    getUsersPostsListResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled,
    },
  );
}
