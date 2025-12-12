interface BugOccurCardProps {
  location: string;
  problemType: string;
  reportCount: number;
}

const BugOccurCard = ({ location, problemType, reportCount }: BugOccurCardProps) => {
  return (
    <div className="flex justify-between bg-gray-50 rounded-sm p-[14px]">
      {/* 위치 정보 및 태그 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-Dark-Gray font-medium text-body-02">{location}</h3>
        <p className="w-fit bg-gray-100 px-1 rounded-sm text-gray-300 font-semibold text-caption-02">
          {problemType}
        </p>
      </div>

      {/* 카운트 */}
      <div className="flex flex-col items-center">
        <p className="text-Light-Gray font-semibold text-caption-02">신고횟수</p>
        <p className="text-Black font-semibold text-subtitle-01">{reportCount}건</p>
      </div>
    </div>
  );
};

export default BugOccurCard;
