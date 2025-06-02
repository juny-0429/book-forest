import { create } from 'zustand';

interface FindEmailState {
  foundUserEmail: string;
  setUserEmail: (email: string) => void;
  clearUserEmail: () => void;
}

export const useFindIdStore = create<FindEmailState>((set) => ({
  foundUserEmail: '',
  setUserEmail: (email) => set({ foundUserEmail: email }),
  clearUserEmail: () => set({ foundUserEmail: '' }),
}));
