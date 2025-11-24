import { format } from 'date-fns';

/**
 * ISO 날짜 문자열을 'yy.MM.dd' (예: 25.11.26) 형식으로 변환
 */
export function formatDate(dateString: string | Date | null | undefined) {
  if (!dateString) return ''; // 데이터가 없을 경우 빈 문자열 반환

  const date = new Date(dateString);

  // 유효하지 않은 날짜인 경우 빈 문자열 반환
  if (isNaN(date.getTime())) return '';

  return format(date, 'yy.MM.dd');
}
