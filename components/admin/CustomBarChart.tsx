export function CustomBarChart({
  chartData,
}: {
  chartData: { category: string; value: number }[];
}) {
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="w-full space-y-10 p-12 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
      {' '}
      {chartData.map(item => (
        <div key={item.category} className="flex items-center gap-4">
          <span className="w-[46px] text-base font-bold text-Black text-right">
            {item.category}
          </span>
          <div className="flex-1 bg-white rounded-full h-6">
            <div
              className="bg-Primary-500 h-6 rounded-sm text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            >
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
