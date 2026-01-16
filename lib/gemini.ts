import { GoogleGenAI, Type } from '@google/genai';

const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;

if (!GEMINI_KEY) {
  throw new Error('NEXT_PUBLIC_GEMINI_KEY 환경변수 없음');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

/**
 * Google Gemini를 활용해 추가 조건에 대한 질문 배열을 생성하는 함수
 */
export const generateQualifierQuestions = async (
  conditions: string,
  simulateError: boolean = false,
): Promise<string[]> => {
  // 시뮬레이션이 동작 못하면 조건 그대로 반환
  if (simulateError) {
    return [conditions];
  }

  const prompt = `
    참가자 자격 조건: "${conditions}"

    위 조건을 바탕으로, 참가자가 자격이 있는지 확인하기 위한 '예/아니오' 질문을 최대 5개 생성해주세요.

    규칙:
    1. 조건이 5개 이상이면, 관련된 조건들을 합쳐서 하나의 질문으로 만들어주세요. (예: "성별이 남성이며 현재 자취중인가요?")
    2. 답변이 '예'일 때만 자격이 충족되는 질문이어야 합니다.
    3. "송파구 거주자"처럼 키워드만 있다면 "현재 서울시 송파구에 거주하고 계신가요?"와 같이 정중하고 완전한 문장으로 만드세요.
    4. 질문은 한국어로, 명확하고 간결하게 작성해주세요.
    5. 최종 결과는 질문 문자열만 포함된 JSON 배열 형식이어야 합니다.
    6. 말투는 "~이신가요?", "~하시나요?" 처럼 정중한 문체를 사용하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "참가 자격 확인을 위한 '예/아니오' 질문",
          },
        },
        temperature: 0.5,
      },
    });

    // response.text가 없으면 조건 그대로 반환
    if (!response.text) return [conditions];

    const responseText = response.text.trim();
    const parsedResponse = JSON.parse(responseText);

    if (Array.isArray(parsedResponse) && parsedResponse.every(item => typeof item === 'string')) {
      return parsedResponse;
    } else {
      console.warn('API 응답이 유효한 질문 배열이 아니어서 fallback을 반환합니다.');
      return [conditions];
    }
  } catch (error) {
    console.error('Gemini API 호출 중 오류 발생, fallback을 반환합니다:', error);
    return [conditions];
  }
};
