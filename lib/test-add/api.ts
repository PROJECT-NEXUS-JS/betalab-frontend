import { instance } from '@/apis/instance';
import { buildCreatePostPayload, type CreatePostPayload } from './buildCreatePostPayload';
import {
  CreatePostPayloadSchema,
  UserPostSchema,
  UserPostListSchema,
  type UserPostModel,
  type UserPostListModel,
} from '@/hooks/test-add/api/dto/post';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEBUG_HTTP =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_DEBUG_HTTP === 'true') ||
  (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production');

const log = {
  req: (title: string, url: string, method?: string, body?: unknown) => {
    if (!DEBUG_HTTP) return;
    console.groupCollapsed(`%c[REQUEST] ${title}`, 'color:#06f;font-weight:600');
    console.log('url:', url);
    if (method) console.log('method:', method);
    if (body !== undefined) console.log('body:', body);
    console.groupEnd();
  },
  res: (title: string, status: number, data: unknown) => {
    if (!DEBUG_HTTP) return;
    console.groupCollapsed(`%c[RESPONSE] ${title}`, 'color:#090;font-weight:600');
    console.log('status:', status);
    console.log('data:', data);
    console.groupEnd();
  },
};

export async function createUserPostFromForm(
  form: any,
  opts?: { thumbnail?: File | null },
): Promise<UserPostModel> {
  const payload = buildCreatePostPayload(form);
  return createUserPost(payload, opts?.thumbnail ?? null);
}

export async function createUserPost(
  payload: CreatePostPayload,
  thumbnail?: File | null,
): Promise<UserPostModel> {
  try {
    CreatePostPayloadSchema.parse(payload);
  } catch (e) {
    if (DEBUG_HTTP) {
      console.groupCollapsed('%c[ZOD] CreatePostPayload 검증 실패', 'color:#c00;font-weight:600');
      console.log(e);
      console.groupEnd();
    }
    throw e;
  }

  const path = '/v1/users/posts';
  const url = `${BASE_URL}${path}`;

  const fd = new FormData();
  fd.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  if (thumbnail instanceof File) fd.append('thumbnail', thumbnail, thumbnail.name);

  log.req('POST /v1/users/posts', url, 'POST', { hasThumbnail: !!thumbnail });

  const res = await instance.post(path, fd, {
    headers: { 'Content-Type': undefined }, // 인스턴스의 application/json 제거
  });

  log.res('POST /v1/users/posts', res.status, res.data);

  const parsed = UserPostSchema.safeParse(res.data);
  return parsed.success ? parsed.data : (res.data as UserPostModel);
}

export async function getUserPosts(params?: {
  page?: number;
  size?: number;
  q?: string;
}): Promise<UserPostListModel> {
  const url = `/v1/users/posts`;
  const query: Record<string, any> = {};
  if (params?.page != null) query.page = String(params.page);
  if (params?.size != null) query.size = String(params.size);
  if (params?.q) query.q = params.q;

  log.req('GET /v1/users/posts', `${BASE_URL}${url}`, 'GET', query);

  const res = await instance.get(url, { params: query });
  log.res('GET /v1/users/posts', res.status, res.data);

  const parsed = UserPostListSchema.safeParse(res.data);
  return parsed.success ? parsed.data : (res.data as UserPostListModel);
}

export async function getUserPostById(id: string | number): Promise<UserPostModel> {
  const url = `/v1/users/posts/${id}`;
  log.req(`GET /v1/users/posts/${id}`, `${BASE_URL}${url}`, 'GET');

  const res = await instance.get(url);
  log.res(`GET /v1/users/posts/${id}`, res.status, res.data);

  const parsed = UserPostSchema.safeParse(res.data);
  return parsed.success ? parsed.data : (res.data as UserPostModel);
}
