import { create } from 'zustand';

export interface Toast {
  id: string;
  title: string;
  content?: string;
  icon?: React.ReactNode;
  type: 'default' | 'success' | 'informative' | 'error' | 'warning';
  isVisible: boolean;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, ...toast, isVisible: true }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((t) => (t.id === id ? { ...t, isVisible: false } : t)),
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, 600);
    }, 3000);
  },
}));
