import { X } from 'lucide-react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-10 flex flex-col gap-10">
        <div className="flex flex-row gap-[183px] items-center">
          <h2 className="text-subtitle-02 font-semibold text-Black">로그아웃 하시겠어요?</h2>
          <X className="size-5 text-Gray-300 cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            State="Solid"
            Size="md"
            label="베타랩 더 둘러보기"
            className="w-fit cursor-pointer"
            onClick={onClose}
          />
          <Button
            State="Primary"
            Size="md"
            label="로그아웃 하기"
            className="w-fit cursor-pointer"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
