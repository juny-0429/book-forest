import { BaseModalProps } from 'src/types/modal.type';
import ModalLayout from './ModalLayout/ModalLayout';
import Button from '../Button/Button';

export interface AlertModalProps extends BaseModalProps {
  title?: string;
  content?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
}

export default function AlertModal({ confirmButtonText = '확인', title, content, onClose, onConfirm }: AlertModalProps) {
  const confirm = () => {
    if (onConfirm) return onConfirm();
    onClose();
  };

  return (
    <ModalLayout onClose={onClose}>
      <h2 className='text-title-24b text-ui-text-title mb-4'>{title}</h2>

      <p className='text-body-16r text-ui-text-title mb-6'>{content}</p>

      <div className='flex justify-end'>
        <Button height={40} onClick={confirm} className='w-fit'>
          {confirmButtonText}
        </Button>
      </div>
    </ModalLayout>
  );
}
