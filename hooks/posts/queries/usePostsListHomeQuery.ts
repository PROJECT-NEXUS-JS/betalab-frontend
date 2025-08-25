import { QueryKey } from '@tanstack/react-query';
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

  // page, size를 직접 전송 (useUsersPostsListQuery와 동일하게)
  if (typeof params.page === 'number') qp.set('page', String(params.page));
  if (typeof params.size === 'number') qp.set('size', String(params.size));
  (params.sort ?? []).forEach(s => qp.append('sort', s));

  const qs = qp.toString();
  return qs ? `${BASE_PATH}?${qs}` : BASE_PATH;
}

async function fetchPostsListHome(
  params: GetUsersPostsListRequestType,
): Promise<GetUsersPostsListResponseType> {
  const url = buildQueryParams(params);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const fullUrl = `${backendUrl}${url}`;

  const res = await fetch(fullUrl);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data as GetUsersPostsListResponseType;
}

export function usePostsListHomeQuery(
  params: GetUsersPostsListRequestType,
  options?: { enabled?: boolean },
) {
  const key: QueryKey = ['get-posts-list-home', params];

  const parsed = getUsersPostsListRequestSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(`게시글 리스트 파싱 실패: ${JSON.stringify(parsed.error.issues)}`);
  }

  return usePostsQueryDto<GetUsersPostsListDataType, GetUsersPostsListResponseType>(
    key,
    () => fetchPostsListHome(parsed.data),
    getUsersPostsListResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled,
    },
  );
}
