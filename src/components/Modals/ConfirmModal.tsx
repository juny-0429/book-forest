import { BaseModalProps } from 'src/types/modal.type';
import ModalLayout from './ModalLayout/ModalLayout';
import Button from '../Button/Button';
import LineButton from '../Button/LineButton';

export interface ConfirmModalProps extends BaseModalProps {
  title?: string;
  content?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({ title, content, confirmButtonText = '확인', cancelButtonText = '최소', onClose, onConfirm }: ConfirmModalProps) {
  const confirm = () => {
    if (onConfirm) return onConfirm();
    onClose();
  };

  return (
    <ModalLayout onClose={onClose}>
      <h2 className='text-title-24b text-ui-text-title mb-4'>{title}</h2>

      <p className='text-body-16r text-ui-text-title mb-6'>{content}</p>

      <div className='flex justify-end items-center gap-2'>
        <LineButton height={40} onClick={confirm} className='w-fit'>
          {cancelButtonText}
        </LineButton>
        <Button height={40} onClick={onClose} className='w-fit'>
          {confirmButtonText}
        </Button>
      </div>
    </ModalLayout>
  );
}
