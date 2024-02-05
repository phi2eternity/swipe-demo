import React, { useState } from 'react';
import style from './index.module.scss';

export interface ShakingModalProps{
  show: boolean;
  children?: React.ReactNode;
  shaking?: boolean;
}

const ShakingModal = ({ show, children } : ShakingModalProps) => {
  const [shaking, setShaking] = useState(false);

  const handleClose = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 820);
  };

  if (!show) {
    return null;
  }

  return (
    <div className={style.shakingModal} onClick={handleClose}>
      <div
        className={`${style.shakingModalContent} ${shaking ? style.shake : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {
          children
        }
      </div>
    </div>
  );
};

export default ShakingModal;
