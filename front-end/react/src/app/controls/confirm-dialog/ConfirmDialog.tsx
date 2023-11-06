import React from 'react';
import { Dialog } from '..';
import { TextService } from '@/app/utils';

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
  okButtonText = TextService.controls.confirm,
  cancelButtonText = TextService.controls.cancel,
  onOk,
  onCancel,
  onClose,
  isLoading,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      visible={visible}
      title={title}
      isLoading={isLoading}
      showOkButton={showOkButton}
      showCancelButton={showCancelButton}
      okButtonText={okButtonText}
      cancelButtonText={cancelButtonText}
      onOk={onOk}
      onCancel={onCancel}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};
