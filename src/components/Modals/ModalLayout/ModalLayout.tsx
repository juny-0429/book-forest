import React from 'react';

interface ModalLayoutProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalLayout({ children, onClose }: ModalLayoutProps) {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50' onClick={handleOverlayClick}>
      <div className='relative min-w-[450px] p-6 shadow-lg bg-white rounded-[10px]'>{children}</div>
    </div>
  );
}
