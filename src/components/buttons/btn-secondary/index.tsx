import style from './index.module.scss';
import React from 'react';

export interface BtnSecondaryProps {
  onClick?: () => void;
  text: string;
  src: string;
  backgroundColor: string;
}

const BtnSecondary: React.FC<BtnSecondaryProps> = ({
  backgroundColor,
  src,
  text,
  onClick,
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
      }}
      data-testid={'btn-secondary'}
      onClick={onClick}
      className={style.btnSecondary}
    >
      <img src={src} className={style.btnSecondary__icon} />
      <div className={style.btnSecondary__text}>{text}</div>
    </div>
  );
};

export default BtnSecondary;
