import RewardCard from './reward-card';

interface RewardItem {
  label: string;
  count: number;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'black';
}

interface RewardListProps {
  items: RewardItem[];
}

export default function RewardList({ items }: RewardListProps) {
  return (
    <div className="w-253 inline-flex justify-start items-center gap-1">
      {items.map((item, index) => (
        <div key={index} className="flex-1">
          <RewardCard label={item.label} count={item.count} color={item.color} />
        </div>
      ))}
    </div>
  );
}
