import type { TestAddState } from '@/types/test-add';

type NextConfig = {
  select: () => TestAddState;
  validate?: () => string | null;
  next: string | ((merged: TestAddState) => string);
};

export function makeHandleNext(
  form: TestAddState,
  update: (p: TestAddState) => void,
  save: () => void,
  push: (path: string) => void,
  cfg: NextConfig,
) {
  return () => {
    const error = cfg.validate?.() ?? null;
    if (error) {
      alert(error);
      return;
    }
    const patch = cfg.select();
    const merged = { ...form, ...patch };
    update(patch);
    save();

    const nextPath = typeof cfg.next === 'string' ? cfg.next : cfg.next(merged);
    push(nextPath);
  };
}
