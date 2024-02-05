import ErrorPopupDumb, { ErrorPopupDumbProps } from './index.dumb';
import React, { Fragment, useEffect } from 'react';
import style from './index.module.scss';

export interface ErrorPopupProps {
  message: string;
  setMessage: (message: string) => void;
  timing?: number;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  message,
  setMessage,
  timing = 3000,
}) => {
  const [divClass, setDivClass] = React.useState(style.errorPopUp);
  useEffect(() => {
    if (!message) return;
    setDivClass(style.errorPopUpActive);
    setTimeout(() => {
      setDivClass(style.errorPopUp);
      setMessage('');
    }, timing);
  }, [message]);

  return <ErrorPopupDumb message={message} divClass={divClass} />;
};

export default ErrorPopup;
