import { create } from 'zustand';

interface BaseModalProps {
  onClose: () => void;
  onCancel?: (e: React.BaseSyntheticEvent) => void;
  onConfirm?: (e: React.BaseSyntheticEvent) => void;
}

interface ModalState<TProps extends BaseModalProps> {
  Component: React.ComponentType<TProps>;
  props?: Omit<TProps, 'onClose'>;
}

interface ModalStore {
  modals: ModalState<BaseModalProps>[];
  openModal: <TProps extends BaseModalProps>(Component: React.ComponentType<TProps>, props?: Omit<TProps, 'onClose'>) => void;
  closeModal: (Component: React.ComponentType<BaseModalProps>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (Component, props) =>
    set((state) => ({
      modals: [...state.modals, { Component: Component as React.ComponentType<BaseModalProps>, props } as ModalState<BaseModalProps>],
    })),
  closeModal: (Component) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.Component !== Component),
    })),
}));
