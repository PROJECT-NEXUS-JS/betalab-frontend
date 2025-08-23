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

const IS_BROWSER = typeof window !== 'undefined';

const redactHeaders = (h?: HeadersInit) => {
  if (!h) return h;
  const obj = h instanceof Headers ? Object.fromEntries(h.entries()) : { ...(h as any) };
  if (obj.Authorization) obj.Authorization = '***redacted***';
  return obj;
};

const getCookie = (name: string): string | null => {
  if (!IS_BROWSER) return null;
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return m ? decodeURIComponent(m[1]) : null;
};
const resolveDevToken = (): string | null => {
  if (!IS_BROWSER) return null;
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  if (!isLocal) return null;
  const keys = ['accessToken', 'access_token', 'AUTH_TOKEN', 'token'];
  for (const k of keys) {
    try {
      const v =
        (window.localStorage && localStorage.getItem(k)) ||
        (window.sessionStorage && sessionStorage.getItem(k)) ||
        getCookie(k);
      if (v) return v;
    } catch {}
  }
  return null;
};

const withAuth = (init: RequestInit = {}): RequestInit => {
  const headers = new Headers(init.headers || {});
  const hasAuth = headers.has('Authorization') && !!headers.get('Authorization');
  if (!hasAuth) {
    const token = resolveDevToken();
    if (token)
      headers.set('Authorization', token.startsWith('Bearer ') ? token : `Bearer ${token}`);
  }
  return { ...init, headers };
};

const logReq = (title: string, url: string, init?: RequestInit, bodyPreview?: unknown) => {
  if (!DEBUG_HTTP) return;
  console.groupCollapsed(`%c[REQUEST] ${title}`, 'color:#06f;font-weight:600');
  console.log('url:', url);
  if (init?.method) console.log('method:', init.method);
  if (init?.headers) console.log('headers:', redactHeaders(init.headers)); // 🔒 마스킹
  if (bodyPreview !== undefined) console.log('body:', bodyPreview);
  console.groupEnd();
};

const logRes = (title: string, res: Response, raw: string) => {
  if (!DEBUG_HTTP) return;
  console.groupCollapsed(`%c[RESPONSE] ${title}`, 'color:#090;font-weight:600');
  console.log('status:', res.status, res.statusText);
  console.log('raw:', raw);
  console.groupEnd();
};

export async function createUserPostFromForm(form: any): Promise<UserPostModel> {
  const payload = buildCreatePostPayload(form);
  return createUserPost(payload);
}

export async function createUserPost(payload: CreatePostPayload): Promise<UserPostModel> {
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

  const url = `${BASE_URL}/v1/users/posts`;

  const formData = new FormData();
  // JSON payload를 string으로 변환해서 'data' 필드에 넣기
  formData.append("data", JSON.stringify(payload));
  // thumbnail이 없으면 그냥 빈 Blob 넣어주기 (curl이랑 동일하게)
  formData.append("thumbnail", new Blob([]), "");

  const init: RequestInit = withAuth({
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  console.log(init);

  logReq('POST /v1/users/posts', url, init, payload);
  const res = await fetch(url, init);
  const raw = await res.text();
  logRes('POST /v1/users/posts', res, raw);

  if (!res.ok) {
    let detail: any = null;
    try {
      detail = JSON.parse(raw);
    } catch {}
    throw new Error(
      `POST /v1/users/posts 실패(${res.status}) ${
        detail ? JSON.stringify(detail) : res.statusText
      }`,
    );
  }

  let json: any = null;
  try {
    json = JSON.parse(raw);
  } catch {
    return raw as any;
  }
  const parsed = UserPostSchema.safeParse(json);
  return parsed.success ? parsed.data : json;
}

export async function getUserPosts(params?: { page?: number; size?: number; q?: string }) {
  const query = new URLSearchParams();
  if (params?.page != null) query.set('page', String(params.page));
  if (params?.size != null) query.set('size', String(params.size));
  if (params?.q) query.set('q', params.q);

  const url = `${BASE_URL}/v1/users/posts?${query.toString()}`;
  const init: RequestInit = withAuth({ method: 'GET', credentials: 'include' });

  logReq('GET /v1/users/posts', url, init);
  const res = await fetch(url, init);
  const raw = await res.text();
  logRes('GET /v1/users/posts', res, raw);

  if (!res.ok) throw new Error(`GET /v1/users/posts 실패(${res.status})`);

  let json: any;
  try {
    json = JSON.parse(raw);
  } catch {
    return raw as any;
  }
  const parsed = UserPostListSchema.safeParse(json);
  return parsed.success ? parsed.data : (json as UserPostListModel);
}

export async function getUserPostById(id: string | number) {
  const url = `${BASE_URL}/v1/users/posts/${id}`;
  const init: RequestInit = withAuth({ method: 'GET', credentials: 'include' });

  logReq(`GET /v1/users/posts/${id}`, url, init);
  const res = await fetch(url, init);
  const raw = await res.text();
  logRes(`GET /v1/users/posts/${id}`, res, raw);

  if (!res.ok) throw new Error(`GET /v1/users/posts/${id} 실패(${res.status})`);

  let json: any;
  try {
    json = JSON.parse(raw);
  } catch {
    return raw as any;
  }
  const parsed = UserPostSchema.safeParse(json);
  return parsed.success ? parsed.data : json;
}
