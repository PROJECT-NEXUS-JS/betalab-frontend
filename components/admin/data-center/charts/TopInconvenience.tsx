import EmptyData from "./EmptyData";

interface TopInconvenienceProps {
  topInconvenientElements: Record<string, number> | undefined;
}

const TopInconvenience = ({ topInconvenientElements }: TopInconvenienceProps) => {
  const sortedData = Object.entries(topInconvenientElements ?? {}).sort(([, a], [, b]) => b - a);

  const [first, second, third] = sortedData;

  return (
    <div className="w-[275px] h-[263px] shadow-card relative bg-white rounded-sm p-[14px] flex flex-col gap-y-2.5">
      <h3 className="text-Dark-Gray text-body-01 font-semibold">불편요소 top3</h3>

      {/* 데이터가 하나도 없을 때의 처리 */}
      {!first && (
        <EmptyData />
      )}

      {/* 1위 (가장 큰 원) */}
      {first && (
        <div className="absolute top-11 right-5 w-35 h-35 bg-Error rounded-full flex flex-col items-center justify-center text-white px-3">
          <p className="text-body-01 font-semibold text-center break-keep">{first[0]}</p>
        </div>
      )}

      {/* 2위 */}
      {second && (
        <div className="absolute top-28 left-5 w-22 h-22 bg-Red-bg text-Error rounded-full flex flex-col items-center justify-center px-2">
          <p className="text-caption-01 font-semibold text-center break-keep">{second[0]}</p>
        </div>
      )}

      {/* 3위 */}
      {third && (
        <div className="absolute bottom-3 left-23 w-15 h-15 bg-Gray-100 text-Gray-300 rounded-full flex flex-col items-center justify-center px-1">
          <p className="text-caption-01 font-semibold text-center break-all">{third[0]}</p>
        </div>
      )}
    </div>
  );
};

export default TopInconvenience;
