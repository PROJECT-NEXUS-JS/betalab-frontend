import { IconName, ToastKind } from '@/components/common/toast/ToastHost';

type ToastConfig = {
  type: ToastKind;
  iconName: IconName;
  message: string;
};

export const TOAST_MESSAGES: Record<string, ToastConfig> = {
  // 테스트 모집 요청 생성
  POST_CREATED: {
    type: 'alert',
    iconName: 'check',
    message: '테스트 모집이 등록되었어요',
  },
  // 테스터 신청 요청
  APPLICATION_CREATED: {
    type: 'alert',
    iconName: 'check',
    message: '신청이 완료되었어요',
  },
  // 피드백 작성
  FEEDBACK_CREATED: {
    type: 'alert',
    iconName: 'check',
    message: '피드백이 등록되었어요',
  },
  // 리뷰 작성
  REVIEW_CREATED: {
    type: 'alert',
    iconName: 'check',
    message: '리뷰가 등록되었어요',
  },
  // 임시 저장
  DRAFT_SAVED: {
    type: 'alert',
    iconName: 'check',
    message: '임시 저장되었어요',
  },
  COMMON201: {
    type: 'alert',
    iconName: 'check',
    message: '정보가 성공적으로 생성됐어요',
  },
  COMMON202: {
    type: 'alert',
    iconName: 'check',
    message: '요청이 정상적으로 접수 됐어요',
  },
  COMMON203: {
    type: 'alert',
    iconName: 'blue',
    message: '반환할 데이터가 없습니다',
  },

  // 400 에러
  BAD_REQUEST: {
    type: 'error',
    iconName: 'red',
    message: '로그인에 실패했어요\n다시 시도해 주세요',
  },
  VALIDATION_FAILED: {
    type: 'error',
    iconName: 'red',
    message: '입력정보를 다시 확인해주세요',
  },
  TYPE_MISMATCH: {
    type: 'error',
    iconName: 'red',
    message: '입력정보를 다시 확인해주세요',
  },
  MISSING_PARAMETER: {
    type: 'error',
    iconName: 'red',
    message: '누락된 정보가 있어요',
  },
  UNSUPPORTED_MEDIA_TYPE: {
    type: 'error',
    iconName: 'red',
    message: '지원되지 않는 형식이에요',
  },
  UNPROCESSABLE_ENTITY: {
    type: 'error',
    iconName: 'red',
    message: '요청을 처리할 수 없어요\n잠시 후 다시 시도해 주세요',
  },

  // 401 에러
  UNAUTHORIZE: {
    type: 'alert',
    iconName: 'siren',
    message: '로그인 후 이용이 가능해요!',
  },
  INVALID_CREDENTIALS: {
    type: 'error',
    iconName: 'red',
    message: '올바르지 않은 정보에요',
  },
  INVALID_TOKEN: {
    type: 'alert',
    iconName: 'blue',
    message: '토큰이 유효하지 않아요\n다시 로그인 해주세요',
  },
  EXPIRED_TOKEN: {
    type: 'alert',
    iconName: 'timer',
    message: '세션이 만료되었어요\n다시 로그인해 주세요',
  },

  // 405 에러
  METHOD_NOT_ALLOWED: {
    type: 'error',
    iconName: 'red',
    message: '요청이 정상적으로 처리되지 않았어요\n잠시 후 다시 시도해 주세요',
  },

  // 409 에러
  DUPLICATE_RESOURCE: {
    type: 'error',
    iconName: 'red',
    message: '이미 등록된 정보에요',
  },
  VERSION_CONFLICT: {
    type: 'error',
    iconName: 'red',
    message: '입력정보를 다시 확인해주세요',
  },

  // 429 에러
  TOO_MANY_REQUESTS: {
    type: 'error',
    iconName: 'red',
    message: '요청이 너무 많아요\n잠시 후 다시 시도해 주세요',
  },
  RATE_LIMIT_EXCEEDED: {
    type: 'error',
    iconName: 'red',
    message: '잠깐! 요청이 너무 빠르게 들어왔어요',
  },

  // 500 에러
  INTERNAL_SERVER_ERROR: {
    type: 'error',
    iconName: 'red',
    message: '문제가 생겼어요\n잠시 후 다시 시도해 주세요',
  },
  BAD_GATEWAY: {
    type: 'error',
    iconName: 'red',
    message: '서버가 응답하지 않아요\n잠시 후 다시 시도해 주세요',
  },
  SERVICE_UNAVAILABLE: {
    type: 'error',
    iconName: 'red',
    message: '요청을 처리하는 데 문제가 있어요',
  },
};

export const DEFAULT_TOAST_BY_STATUS: Record<number, ToastConfig> = {
  201: {
    type: 'alert',
    iconName: 'check',
    message: '정보가 성공적으로 생성됐어요',
  },
  202: {
    type: 'alert',
    iconName: 'check',
    message: '요청이 정상적으로 접수 됐어요',
  },
  203: {
    type: 'alert',
    iconName: 'blue',
    message: '반환할 데이터가 없습니다',
  },
  400: {
    type: 'error',
    iconName: 'red',
    message: '로그인에 실패했어요\n다시 시도해 주세요',
  },
  401: {
    type: 'alert',
    iconName: 'siren',
    message: '로그인 후 이용이 가능해요!',
  },
  405: {
    type: 'error',
    iconName: 'red',
    message: '요청이 정상적으로 처리되지 않았어요\n잠시 후 다시 시도해 주세요',
  },
  415: {
    type: 'error',
    iconName: 'red',
    message: '지원되지 않는 형식이에요',
  },
  422: {
    type: 'error',
    iconName: 'red',
    message: '요청을 처리할 수 없어요\n잠시 후 다시 시도해 주세요',
  },
  429: {
    type: 'error',
    iconName: 'red',
    message: '요청이 너무 많아요\n잠시 후 다시 시도해 주세요',
  },
  500: {
    type: 'error',
    iconName: 'red',
    message: '문제가 생겼어요\n잠시 후 다시 시도해 주세요',
  },
  502: {
    type: 'error',
    iconName: 'red',
    message: '서버가 응답하지 않아요\n잠시 후 다시 시도해 주세요',
  },
  503: {
    type: 'error',
    iconName: 'red',
    message: '요청을 처리하는 데 문제가 있어요',
  },
};

export function getToastConfig(
  code?: string,
  status?: number,
  message?: string,
): ToastConfig | null {
  if (code && TOAST_MESSAGES[code]) {
    return TOAST_MESSAGES[code];
  }
  if (status && DEFAULT_TOAST_BY_STATUS[status]) {
    return DEFAULT_TOAST_BY_STATUS[status];
  }

  return null;
}
