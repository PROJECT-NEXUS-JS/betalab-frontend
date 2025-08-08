import { useMutation } from '@tanstack/react-query';

async function setToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const res = await fetch('/api/auth/set-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken, refreshToken }),
  });

  if (!res.ok) throw new Error('쿠키 세팅 실패');
  return res.json();
}

export function useSetTokenMutation() {
  return useMutation({
    mutationFn: setToken,
    onSuccess: data => {
      localStorage.setItem('accessToken', data.accessToken);
    },
  });
}
