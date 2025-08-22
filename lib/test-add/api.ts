import { buildCreatePostPayload, type CreatePostPayload } from './buildCreatePostPayload';
import {
  CreatePostPayloadSchema,
  UserPostSchema,
  UserPostListSchema,
  type UserPostModel,
  type UserPostListModel,
} from '@/hooks/test-add/api/dto/post';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createUserPostFromForm(form: any): Promise<UserPostModel> {
  const payload = buildCreatePostPayload(form);
  return createUserPost(payload);
}

export async function createUserPost(payload: CreatePostPayload): Promise<UserPostModel> {
  CreatePostPayloadSchema.parse(payload);

  const res = await fetch(`${BASE_URL}/v1/users/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail: any = null;
    try {
      detail = await res.json();
    } catch {}
    throw new Error(
      `POST /v1/users/posts 실패(${res.status}) ${detail ? JSON.stringify(detail) : res.statusText}`,
    );
  }

  const json = await res.json();
  const parsed = UserPostSchema.safeParse(json);
  return parsed.success ? parsed.data : json;
}

export async function getUserPosts(params?: { page?: number; size?: number; q?: string }) {
  const query = new URLSearchParams();
  if (params?.page != null) query.set('page', String(params.page));
  if (params?.size != null) query.set('size', String(params.size));
  if (params?.q) query.set('q', params.q);

  const res = await fetch(`${BASE_URL}/v1/users/posts?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error(`GET /v1/users/posts 실패(${res.status})`);

  const json = await res.json();
  const parsed = UserPostListSchema.safeParse(json);
  return parsed.success ? parsed.data : (json as UserPostListModel);
}

export async function getUserPostById(id: string | number) {
  const res = await fetch(`${BASE_URL}/v1/users/posts/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error(`GET /v1/users/posts/${id} 실패(${res.status})`);

  const json = await res.json();
  const parsed = UserPostSchema.safeParse(json);
  return parsed.success ? parsed.data : json;
}
