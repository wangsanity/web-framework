/**
 * position format: vertical-horizontal. e.g. top-left
 */
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import './popup-menu.scss';
import Link from 'next/link';

export interface PopupMenuItem {
  name: string;
  url?: string;
  click?: Function;
}

export interface PopupMenuProps {
  visible?: boolean;
  position?: string;
  children?: ReactNode;
  items?: PopupMenuItem[];
}

export const PopupMenu = ({
  children,
  visible,
  items,
  position,
}: PopupMenuProps) => {
  const [showPopup, setShowPopup] = useState(visible);
  const [styleObject, setStyleObject] = useState({});
  const [slotWrapperId, setSlotWrapperId] = useState('');

  useEffect(() => {
    setSlotWrapperId('popup-menu-slot-' + new Date().getTime());
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

  const menus = (items || []).map((item, index) => (
    <div
      className="list-item"
      key={index}
      onClick={(e) => item.click && item.click(e)}
    >
      {item.url ? (
        <Link href={item.url} className="list-item-text">
          {item.name}
        </Link>
      ) : (
        <span className="list-item-text">{item.name}</span>
      )}
    </div>
  ));

  return (
    <div className="ctr-popup-menu">
      <div
        id={slotWrapperId}
        className="slot-wrapper"
        onClick={() => onClickSlot()}
      >
        {children}
      </div>
      {showPopup ? (
        <div className="list-wrapper" style={styleObject}>
          {menus}
        </div>
      ) : null}
    </div>
  );
};
