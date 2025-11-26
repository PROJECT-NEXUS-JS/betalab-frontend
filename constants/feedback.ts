import { BugType, MostInconvenientType } from '@/hooks/feedback/dto/feedback';

export const BUG_TYPE_LABELS: Record<BugType, string> = {
  UI_UX_ERROR: 'UI 오류',
  FUNCTIONAL_ERROR: '기능 작동 오류',
  NOTIFICATION_ISSUE: '알림 문제',
  DATA_INPUT_ERROR: '데이터 입력 오류',
  CRASH: '충돌 또는 강제 종료',
  TYPO: '텍스트 오타',
  OTHER: '기타',
};

export const INCONVENIENT_LABELS: Record<MostInconvenientType, string> = {
  UI_UX: 'UI/UX',
  SPEED: '속도',
  FUNCTION: '기능오류',
  TEXT: '텍스트',
  GUIDE: '가이드',
  OTHER: '기타',
};

export const HAS_BUGS_OPTIONS = [
  { value: true, label: '네, 있었어요' },
  { value: false, label: '아니오, 없었어요' },
] as const;
