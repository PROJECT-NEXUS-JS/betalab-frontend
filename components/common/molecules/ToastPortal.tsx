'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Toast, { ToastProps } from '../atoms/Toast';

interface ToastPortalProps extends ToastProps {
  visible: boolean; // 외부에서 표시 여부 제어
  duration?: number; // 자동 사라짐 (기본 2초)
  onClose?: () => void; // 닫힘 시 콜백
}

export default function ToastPortal({
  visible,
  duration = 2000,
  onClose,
  ...props
}: ToastPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, duration, onClose, mounted]);

  if (!mounted || !show) return null;

  return createPortal(
    <div className="fixed bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[9999]">
      <Toast {...props} />
    </div>,
    document.body,
  );
}
