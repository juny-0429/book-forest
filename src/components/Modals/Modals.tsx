'use client';

import { useModalStore } from 'src/store/useModalStore';

const Modals = () => {
  const { modals, closeModal } = useModalStore();

  return (
    <>
      {modals.map((modal, index) => {
        const { Component, props = {} } = modal;
        const { onConfirm, onCancel, ...restProps } = props;

        const onClose = () => closeModal(Component);
        const handleCancel = (e: React.BaseSyntheticEvent) => {
          if (onCancel) onCancel(e);
          onClose();
        };
        const handleConfirm = (e: React.BaseSyntheticEvent) => {
          if (onConfirm) onConfirm(e);
          onClose();
        };

        return <Component key={index} {...restProps} onClose={onClose} onCancel={handleCancel} onConfirm={handleConfirm} />;
      })}
    </>
  );
};

export default Modals;
