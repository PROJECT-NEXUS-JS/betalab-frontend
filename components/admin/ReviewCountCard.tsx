interface ReviewCountCardProps {
  title: string;
  count: number;
}

export default function ReviewCountCard({ title, count }: ReviewCountCardProps) {
  return (
    <div className="flex flex-col gap-3 p-[14px] w-[226px] items-start bg-White rounded-sm shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
      <h3 className="text-body-02 font-medium text-Gray-300">{title}</h3>
      <p className="text-head font-bold text-Black">{count}</p>
    </div>
  );
}
