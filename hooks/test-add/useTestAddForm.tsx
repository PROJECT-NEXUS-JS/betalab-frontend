'use client';
import { useCallback, useRef, useState } from 'react';
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

  const formRef = useRef(form);
  formRef.current = form;

  const update = useCallback((patch: TestAddState) => {
    setForm(prev => {
      const next = { ...prev, ...patch };
      formRef.current = next;
      // update와 동시에 localStorage에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const save = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formRef.current));
    }
  }, []);

  const reset = useCallback(() => {
    setForm({});
    formRef.current = {};
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getForm = useCallback(() => formRef.current, []);

  return { form, update, save, reset, getForm } as const;
}
