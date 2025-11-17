'use client';

import { showToast } from '@/components/common/toast/ToastHost';
import { getToastConfig } from '@/lib/toast-messages';

type FetchOpts = RequestInit & {
  skipToast?: boolean;
  successToastMessage?: string;
};

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.BACKEND_URL;

export async function http(path: string, opts: FetchOpts = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });

  const method = (opts.method ?? 'GET').toUpperCase();
  const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

  let responseData: any = null;
  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    try {
      responseData = await res.clone().json();
    } catch {}
  }

  if (res.ok) {
    if (!opts.skipToast && (isMutation || responseData?.code)) {
      const code = responseData?.code;
      const message = responseData?.message;

      if (opts.successToastMessage) {
        showToast({ type: 'alert', iconName: 'check', message: opts.successToastMessage });
      } else {
        const toastConfig = getToastConfig(code, res.status, message);
        if (toastConfig) {
          showToast(toastConfig);
        }
      }
    }
    return res;
  }
  if (!opts.skipToast) {
    const code = responseData?.code;
    const message = responseData?.message;

    const toastConfig = getToastConfig(code, res.status, message);
    if (toastConfig) {
      showToast(toastConfig);
    }
  }

  throw new Error(`HTTP ${res.status}`);
}
