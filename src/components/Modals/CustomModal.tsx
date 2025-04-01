import { BaseModalProps } from 'src/types/modal.type';
import ModalLayout from './ModalLayout/ModalLayout';
import LucideIcons from 'src/theme/lucideIcon';

export interface CustomModalProps extends BaseModalProps {
  children: React.ReactNode;
}

export default function CustomModal({ children, onClose }: CustomModalProps) {
  return (
    <ModalLayout onClose={onClose}>
      <div className='absolute top-3 right-3'>
        <button onClick={onClose}>
          <LucideIcons.X className='text-ui-text-title' />
        </button>
      </div>

      <div className='my-4'>{children}</div>
    </ModalLayout>
  );
}
