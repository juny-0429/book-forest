export interface BaseModalProps {
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export type OpenModalHandler<T> = (props: Omit<T, 'onClose'>) => void;
export type OpenModalHandlerOptional<T> = (props?: Omit<T, 'onClose'>) => void;
