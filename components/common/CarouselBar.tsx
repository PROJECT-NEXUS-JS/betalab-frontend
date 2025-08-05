import DotUnit from './DotUnit';

const ROWS = 10;
const COLS = 10;

export default function CarouselBar() {
  return (
    <div className="inline-grid grid-cols-10 gap-0 p-4 border border-dashed border-violet-400 rounded-2xl">
      {Array.from({ length: ROWS }).map((_, rowIndex) =>
        Array.from({ length: COLS }).map((_, colIndex) => {
          const isActive = rowIndex === colIndex;
          return <DotUnit key={`${rowIndex}-${colIndex}`} isActive={isActive} />;
        })
      )}
    </div>
  );
}
