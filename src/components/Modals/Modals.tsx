'use client';

import { useModalStore } from 'src/store/useModalStore';

// interface BaseModalProps {
//   onClose: () => void;
//   onCancel?: () => void;
//   onConfirm?: () => void;
// }

// interface ModalState<TProps extends BaseModalProps> {
//   Component: React.ComponentType<TProps>;
//   props?: Omit<TProps, 'onClose'>;
// }

const Modals = () => {
  const { modals, closeModal } = useModalStore();

  return (
    <>
      {modals.map((modal, index) => {
        const { Component, props = {} } = modal;
        const { onConfirm, onCancel, ...restProps } = props as {
          onConfirm?: () => void;
          onCancel?: () => void;
        };

        const onClose = () => closeModal(Component);
        const handleCancel = () => {
          if (onCancel) onCancel();
          onClose();
        };
        const handleConfirm = () => {
          if (onConfirm) onConfirm();
          onClose();
        };

        return <Component key={index} {...restProps} onClose={onClose} onCancel={handleCancel} onConfirm={handleConfirm} />;
      })}
    </>
  );
};

export default Modals;
