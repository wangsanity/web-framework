import { Button } from '..';
import React, { useEffect, useState } from 'react';
import { TextService } from '@/utils';
import { IControls } from '@/constants/texts/controls.i';
import './dialog.scss';

export interface DialogProps {
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

export const Dialog = ({
  visible,
  children,
  title,
  showOkButton = false,
  showCancelButton = false,
  okButtonText,
  cancelButtonText,
  onOk,
  onCancel,
  isLoading,
  onClose,
}: DialogProps) => {
  const [controlsText, setControlsText] = useState<IControls>({} as IControls);

  useEffect(() => {
    setControlsText(TextService.controls);
  }, []);

  const clickBg = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClose && onClose();
    event.stopPropagation();
  };

  return visible ? (
    <div className="ctr-dialog">
      <div onClick={clickBg} className="dialog-bg"></div>
      <div className="dialog-body">
        <span
          onClick={() => onClose && onClose()}
          className="fa fa-close"
          title={controlsText.close}
        ></span>
        {title && (
          <div className="dialog-title" v-if="title">
            {title}
          </div>
        )}
        <div
          className={['dialog-content', !title ? 'no-title-body' : ''].join(
            ' '
          )}
        >
          {children}
        </div>
        {(showOkButton || showCancelButton) && (
          <div className="dialog-footer">
            <Button onClick={() => onOk && onOk()} isLoading={isLoading}>
              {okButtonText || controlsText.ok}
            </Button>
            <Button
              onClick={() => onCancel && onCancel()}
              role="secondary"
              isLoading={isLoading}
            >
              {cancelButtonText || controlsText.cancel}
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
