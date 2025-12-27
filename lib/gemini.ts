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
    다음은 이벤트나 연구에 참여할 참가자의 자격 조건입니다.
    이 조건을 바탕으로, 참가자가 자격이 있는지 확인하기 위한 '예/아니오' 질문을 최대 5개 생성해주세요.

    규칙:
    1. 질문은 최대 5개를 넘지 않아야 합니다.
    2. 조건이 5개 이상이면, 관련된 조건들을 합쳐서 하나의 질문으로 만들어주세요. (예: "성별이 남성이며 현재 자취중인가요?")
    3. 모든 질문은 '예'라고 대답했을 때 참가 자격 조건에 부합하도록 만들어야 합니다.
    4. 질문은 한국어로, 명확하고 간결하게 작성해주세요.
    5. 최종 결과는 질문 문자열만 포함된 JSON 배열 형식이어야 합니다.
    6. 말투는 "~이신가요?", "~하시나요?" 처럼 정중한 문체를 사용하세요.
    
    참가자 조건 리스트: "${conditions}"
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
