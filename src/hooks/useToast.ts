import { Toast, useToastStore } from 'src/store/useToastStore';

const toast = ({ title, content, type, icon }: Omit<Toast, 'id' | 'isVisible'>) => {
  const { addToast } = useToastStore.getState();
  addToast({ title, content, type, icon, isVisible: true });
};

export { toast };
