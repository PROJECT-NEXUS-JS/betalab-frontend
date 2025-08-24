import { cn } from '@/lib/utils';
import DropdownElement, { DropdownElementProps } from '../atoms/DropdownElement';

interface DropdownProps {
  elements: DropdownElementProps[];
  className?: string;
}

export default function Dropdown({ elements, className }: DropdownProps) {
  return (
    <div className={cn('flex flex-col rounded-[4px] cursor-pointer', className)}>
      {elements.map((element, index) => (
        <DropdownElement
          className={cn(
            'cursor-pointer',
            index === 0 && 'rounded-t-[4px]',
            index === elements.length - 1 && 'rounded-b-[4px]',
          )}
          key={index}
          onClick={element.onClick}
        >
          {element.children}
        </DropdownElement>
      ))}
    </div>
  );
}
