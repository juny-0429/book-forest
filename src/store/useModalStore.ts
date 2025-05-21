import { create } from 'zustand';

interface ModalState<TProps = unknown> {
  Component: React.ComponentType<TProps>;
  props?: Omit<TProps, 'onClose'>;
}

interface ModalStore {
  modals: ModalState<unknown>[];
  openModal: <TProps>(Component: React.ComponentType<TProps>, props?: Omit<TProps, 'onClose'>) => void;
  closeModal: (Component: React.ComponentType<unknown>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (Component, props) =>
    set((state) => ({
      modals: [...state.modals, { Component: Component as React.ComponentType<unknown>, props } as ModalState<unknown>],
    })),
  closeModal: (Component) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.Component !== Component),
    })),
}));
