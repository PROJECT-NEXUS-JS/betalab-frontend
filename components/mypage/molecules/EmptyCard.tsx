import { cn } from '@/lib/utils';
import Button from '@/components/common/atoms/Button';

interface EmptyCardProps {
  className?: string;
  title: React.ReactNode;
  buttonLabel: string;
  onClick: () => void;
}

export default function EmptyCard({ className, title, buttonLabel, onClick }: EmptyCardProps) {
  return (
    <div
      className={cn(
        'w-full h-32 border-1 border-dashed border-Gray-200 rounded-lg flex items-center justify-center custom-dashed bg-Gray-50',
        className,
      )}
    >
      <div className="flex flex-col gap-5 items-center">
        <h3 className="text-subtitle-02 font-semibold text-Light-Gray text-center">{title}</h3>
        <Button
          State="Default"
          Size="md"
          label={buttonLabel}
          onClick={onClick}
          className="w-fit cursor-pointer"
        />
      </div>
    </div>
  );
}
