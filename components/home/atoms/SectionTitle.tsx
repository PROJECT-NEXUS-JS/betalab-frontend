import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}
export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <h2 className={cn("text-subtitle-02 font-semibold text-Black", className)}>
      {children}
    </h2>
  );
}
