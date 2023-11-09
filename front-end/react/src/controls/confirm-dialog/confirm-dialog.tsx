import React from 'react';
import { Dialog } from '..';
import { useAppState } from '@/contexts/app-context';

export interface ConfirmDialogProps {
  visible?: boolean;
  title?: string;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  okButtonText?: string;
  cancelButtonText?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
}

export const ConfirmDialog = ({
  visible,
  children,
  title,
  showOkButton = true,
  showCancelButton = true,
  okButtonText,
  cancelButtonText,
  onOk,
  onCancel,
  onClose,
  isLoading,
}: ConfirmDialogProps) => {
  const { controlsText } = useAppState();

  return (
    <Dialog
      visible={visible}
      title={title}
      isLoading={isLoading}
      showOkButton={showOkButton}
      showCancelButton={showCancelButton}
      okButtonText={okButtonText || controlsText.confirm}
      cancelButtonText={cancelButtonText || controlsText.cancel}
      onOk={onOk}
      onCancel={onCancel}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};
