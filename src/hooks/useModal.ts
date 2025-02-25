import AlertModal, { AlertModalProps } from 'src/components/Modals/AlertModal';
import ConfirmModal, { ConfirmModalProps } from 'src/components/Modals/ConfirmModal';
import BaseModal, { CustomModalProps } from 'src/components/Modals/CustomModal';
import { useModalStore } from 'src/store/useModalStore';

export function useAlertModal() {
  const { openModal, closeModal } = useModalStore();

  const openAlertModal = (props: Omit<AlertModalProps, 'onClose'>) => {
    openModal(AlertModal, props);
  };

  const closeAlertModal = () => {
    closeModal(AlertModal);
  };

  return { openAlertModal, closeAlertModal };
}

export function useConfirmModal() {
  const { openModal, closeModal } = useModalStore();

  const openConfirmModal = (props: Omit<ConfirmModalProps, 'onClose'>) => {
    openModal(ConfirmModal, props);
  };

  const closeConfirmModal = () => {
    closeModal(ConfirmModal);
  };

  return { openConfirmModal, closeConfirmModal };
}

export function useCustomModal() {
  const { openModal, closeModal } = useModalStore();

  const openCustomModal = (props: Omit<CustomModalProps, 'onClose'>) => {
    openModal(BaseModal, props);
  };

  const closeCustomModal = () => {
    closeModal(BaseModal);
  };

  return { openCustomModal, closeCustomModal };
}
