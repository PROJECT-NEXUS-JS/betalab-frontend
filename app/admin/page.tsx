'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    alert('잘못된 접근입니다.');
    redirect(`/`);
  }, []);
}
