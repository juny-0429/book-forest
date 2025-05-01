import { create } from 'zustand';

interface FindIdState {
  foundUserName: string;
  foundUserEmail: string;
  setUserInfo: (info: { userName: string; userEmail: string }) => void;
  clearUserInfo: () => void;
}

export const useFindIdStore = create<FindIdState>((set) => ({
  foundUserName: '',
  foundUserEmail: '',
  setUserInfo: ({ userName, userEmail }) => set({ foundUserName: userName, foundUserEmail: userEmail }),
  clearUserInfo: () => set({ foundUserName: '', foundUserEmail: '' }),
}));
