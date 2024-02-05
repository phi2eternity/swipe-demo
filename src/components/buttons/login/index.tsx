import { AiOutlineApple, AiOutlineGoogle } from 'react-icons/ai';
import React from 'react';
import style from './index.module.scss';

export interface LoginWithButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
}

const LoginWith = ({onClick,icon,text} : LoginWithButtonProps) => {
  return <div data-testid={"login-with-button"} onClick={onClick} className={style.loginWithButton}>
    {icon}
    <h2>{text}</h2>
  </div>
}

export interface LoginWithGoogleProps {
  onClick?: () => void;
}

const LoginWithGoogle = ({onClick} : LoginWithGoogleProps) => {
  return <LoginWith text={"Login with Google"} onClick={onClick} icon={<AiOutlineGoogle
    size={'25px'}
    data-testid="google-icon"/>}/>
}


const LoginWithApple = ({onClick} : LoginWithGoogleProps) => {
  return <LoginWith text={"Login with Apple"} onClick={onClick} icon={<AiOutlineApple
    size={'25px'}
    data-testid="apple-icon"/>}/>
}


export {LoginWithGoogle,LoginWithApple,LoginWith}
