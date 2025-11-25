interface RewardCardProps {
  label: string;
  count: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'black';
}

const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-lime-700',
  red: 'text-red-600',
  yellow: 'text-yellow-600',
  black: 'text-gray-600',
};

export default function RewardCard({ label, count, color = 'blue' }: RewardCardProps) {
  return (
    <div className="w-full p-3.5 bg-white rounded shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)] hover:shadow-[0px_0px_10px_0px_rgba(14,98,255,0.30)] inline-flex flex-col justify-start items-start transition-shadow cursor-pointer">
      <div className="flex flex-col justify-start items-start gap-1">
        <div className="justify-start text-gray-600 text-sm font-medium leading-5">{label}</div>
        <div
          className={`max-w-28 justify-start ${colorClasses[color]} text-2xl font-bold leading-9 line-clamp-1`}
        >
          {count}명
        </div>
      </div>
    </div>
  );
}
