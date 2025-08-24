import Button from '@/components/common/atoms/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  btnLabel1: string;
  btnLabel2: string;
  btnOnClick1: () => void;
  btnOnClick2: () => void;
}

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  btnLabel1,
  btnLabel2,
  btnOnClick1,
  btnOnClick2,
}: ModalProps) {
  const handleSomeAction = () => {
    console.log('어떤 작업 완료! 이제 모달을 엽니다.');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-10 !rounded-sm !gap-10">
        <DialogHeader>
          <DialogTitle className="text-xl text-Black font-bold">{title}</DialogTitle>
        </DialogHeader>
        <p className=" text-Dark-Gray text-base font-bold whitespace-pre">{description}</p>
        <DialogFooter>
          <Button State="Solid" Size="lg" label={btnLabel1} onClick={btnOnClick1} />
          <Button State="Primary" Size="lg" label={btnLabel2} onClick={btnOnClick2} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
