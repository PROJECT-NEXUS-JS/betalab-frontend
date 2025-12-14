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
type CreateFiles = { thumbnail?: File | null; images?: File[] | null };

export async function createUserPostFromForm(
  form: any,
  opts?: CreateFiles,
): Promise<UserPostModel> {
  const payload = buildCreatePostPayload(form);
  return createUserPost(payload, opts?.thumbnail ?? null, opts?.images ?? null);
}

export async function createUserPost(
  payload: CreatePostPayload,
  thumbnail?: File | null,
  images?: File[] | null,
): Promise<UserPostModel> {
  try {
    CreatePostPayloadSchema.parse(payload);
  } catch (e) {
    throw e;
  }

  const path = '/v1/users/posts';
  const url = `${BASE_URL}${path}`;

  const fd = new FormData();
  // 서버가 object를 기대하므로 Blob으로 전송 (project-manage와 동일한 방식)
  fd.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  if (thumbnail instanceof File) fd.append('thumbnail', thumbnail, thumbnail.name);
  if (images && images.length) {
    for (const img of images) {
      if (img instanceof File) fd.append('images', img, img.name);
    }
  }

  try {
    const res = await instance.post(path, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const parsed = UserPostSchema.safeParse(res.data);
    return parsed.success ? parsed.data : (res.data as UserPostModel);
  } catch (error: any) {
    throw error;
  }
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

  const res = await instance.get(url, { params: query });

  const parsed = UserPostListSchema.safeParse(res.data);
  return parsed.success ? parsed.data : (res.data as UserPostListModel);
}

export async function getUserPostById(id: string | number): Promise<UserPostModel> {
  const url = `/v1/users/posts/${id}`;

  const res = await instance.get(url);

  const parsed = UserPostSchema.safeParse(res.data);
  return parsed.success ? parsed.data : (res.data as UserPostModel);
}
