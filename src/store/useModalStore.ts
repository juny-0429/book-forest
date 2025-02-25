import { create } from 'zustand';

interface ModalState<TProps> {
  Component: React.ComponentType<TProps>;
  props?: Omit<TProps, 'onClose'>;
}

interface ModalStore {
  modals: ModalState<any>[];
  openModal: <TProps>(Component: React.ComponentType<TProps>, props?: Omit<TProps, 'onClose'>) => void;
  closeModal: (Component: React.ComponentType<any>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (Component, props) =>
    set((state) => ({
      modals: [...state.modals, { Component, props }],
    })),
  closeModal: (Component) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.Component !== Component),
    })),
}));
