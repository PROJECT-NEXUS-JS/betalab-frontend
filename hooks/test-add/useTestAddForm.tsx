'use client';
import { useCallback, useEffect, useState } from 'react';
import type { TestAddState } from '@/types/test-add';

const STORAGE_KEY = 'testAddForm';

export function useTestAddForm(initial?: TestAddState) {
  const [form, setForm] = useState<TestAddState>(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw)
        try {
          return JSON.parse(raw) as TestAddState;
        } catch {}
    }
    return initial ?? {};
  });

  const update = useCallback((patch: TestAddState) => {
    setForm(prev => ({ ...prev, ...patch }));
  }, []);

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const reset = useCallback(() => {
    setForm({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  return { form, update, save, reset } as const;
}
