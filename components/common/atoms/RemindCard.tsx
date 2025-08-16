import Image from 'next/image';
import Warning from '@/public/icons/card-icon/warning.svg';

export default function RemindCard() {
  return (
    <div className="flex flex-col items-start gap-2 p-3 self-stretch rounded-sm bg-Primary-100">
      <div className="flex items-center gap-2">
        <div className='flex w-6 h-6 items-center justify-center'>
          <Image src={Warning} alt="경고 아이콘" width={20} height={20} />
        </div>
        <span className="text-sm text-Primary-500 font-bold">테스트 신청전 , 확인해주세요 !</span>
      </div>
      <ol className="list-decimal list-inside text-sm text-Dark-Gray pl-1 space-y-2">
        {REMIND_TEXT.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ol>
    </div>
  )
}

const REMIND_TEXT = [
  "신청 후에는 취소할 수 없어요.",
  "개인정보 수집 및 이용 동의를 꼭 확인해주세요.",
  "참여 조건을 정확히 확인해주세요.",
  "테스트 내용과 일정을 충분히 확인해주세요.",
  "신청 조건에 맞지 않으면 선정되지 않을 수 있어요."
]