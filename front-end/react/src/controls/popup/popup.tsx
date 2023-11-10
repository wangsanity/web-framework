/**
 * position format: vertical-horizontal. e.g. top-left
 */

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import './popup.scss';

export interface PopupProps {
  visible?: boolean;
  position?: string;
  children?: ReactNode;
  popupContent?: ReactNode;
}

export const Popup = ({
  children,
  visible,
  position,
  popupContent,
}: PopupProps) => {
  const [styleObject, setStyleObject] = useState({});
  const [showPopup, setShowPopup] = useState(visible);
  const [slotWrapperId, setSlotWrapperId] = useState('');

  useEffect(() => {
    setSlotWrapperId('popup-slot-' + new Date().getTime());
  }, []);

  const updatePosition = useCallback(() => {
    setTimeout(() => {
      const slot = document.getElementById(slotWrapperId);
      const popupPosition = (position || getAutoPosition()).split('-');
      setStyleObject({
        [popupPosition[0] || 'top']: (slot ? slot.offsetHeight : 0) + 3 + 'px',
        [popupPosition[1] || 'left']: 0,
      });
    });
  }, [position, slotWrapperId]);

  useEffect(() => {
    updatePosition();

    const onClickBody = () => {
      setShowPopup(false);
    };

    window.addEventListener('click', onClickBody);

    return () => {
      window.removeEventListener('click', onClickBody);
    };
  }, [updatePosition]);

  // TODO: calculate the best position
  const getAutoPosition = () => {
    return 'top-left';
  };

  const onClickSlot = () => {
    // execute after body click propagation
    if (!showPopup) {
      setTimeout(() => {
        setShowPopup(true);
      });
    }
  };

  return (
    <div className="ctr-popup-menu" data-testid="popup">
      <div
        id={slotWrapperId}
        className="slot-wrapper"
        onClick={() => onClickSlot()}
      >
        {children}
      </div>
      {showPopup ? (
        <div
          className="popup-content"
          style={styleObject}
          data-testid="popup-content"
        >
          {popupContent}
        </div>
      ) : null}
    </div>
  );
};
