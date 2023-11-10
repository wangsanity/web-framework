import React, { useEffect, useState } from 'react';
import { Dialog } from '..';
import { TextService } from '@/utils';
import { IControls } from '@/constants/texts/controls.i';

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
  const [controlsText, setControlsText] = useState<IControls>({} as IControls);

  useEffect(() => {
    setControlsText(TextService.controls);
  }, []);


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
