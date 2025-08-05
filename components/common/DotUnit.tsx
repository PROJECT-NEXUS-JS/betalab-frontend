interface DotUnitProps {
    isActive: boolean;
  }
  
  export default function DotUnit({ isActive }: DotUnitProps) {
    return (
      <div className="flex flex-col items-center justify-center w-12 h-12">
        {isActive ? (
          <div className="w-8 h-3 rounded-full bg-[color:var(--color-Primary-500)] mb-1" />
        ) : (
          <div className="w-8 h-3 mb-1" />
        )}
        <div className="w-3 h-3 rounded-full bg-[color:var(--color-Gray-200)]" />
      </div>
    );
  }
  