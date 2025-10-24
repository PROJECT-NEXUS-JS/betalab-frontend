import { X } from 'lucide-react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

interface BetalabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: React.ReactNode;
  rightLabel?: string;
  leftLabel?: string;
}

export default function BetaLabModal({
  isOpen,
  onClose,
  onConfirm,
  title = '로그아웃 하시겠어요?',
  rightLabel = '베타랩 더 둘러보기',
  leftLabel = '로그아웃 하기',
  description,
}: BetalabModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-10 flex flex-col gap-10">
        <div className="flex flex-row gap-[183px] items-center">
          <h2 className="text-subtitle-02 font-semibold text-Black">{title}</h2>
          <X className="size-5 text-Gray-300 cursor-pointer" onClick={onClose} />
        </div>
        {description && <p className="text-body-02 text-Dark-Gray font-medium whitespace-pre-wrap">{description}</p>}

        <div className="flex gap-4 justify-end">
          <Button
            State="Solid"
            Size="md"
            label={leftLabel}
            className="w-fit cursor-pointer"
            onClick={onConfirm}
          />
          <Button
            State="Primary"
            Size="md"
            label={rightLabel}
            className="w-fit cursor-pointer"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
