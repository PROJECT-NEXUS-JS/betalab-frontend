interface DotUnitProps {
  isActive: boolean;
}

export default function DotUnit({ isActive }: DotUnitProps) {
  return isActive ? (
    <div className="w-6 h-3 rounded-full bg-[color:var(--color-Primary-500)]" />
  ) : (
    <div className="w-3 h-3 rounded-full bg-[color:var(--color-Gray-200)]" />
  );
}
