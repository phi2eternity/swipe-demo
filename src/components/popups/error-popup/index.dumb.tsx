import React from 'react';
import { useState, useEffect } from 'react';
import style from './index.module.scss';

export interface ErrorPopupDumbProps {
  message: string;
  divClass: string;
}

const ErrorPopupDumb: React.FC<ErrorPopupDumbProps> = ({
  message,
  divClass,
}) => {
  return (
    <div className={divClass}>
      <div className={style.errorPopUpMessage}>{message}</div>
    </div>
  );
};

export default ErrorPopupDumb;
