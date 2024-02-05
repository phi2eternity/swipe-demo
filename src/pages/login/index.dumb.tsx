import React from 'react';
import style from './index.module.scss';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { Link } from 'react-router-dom';
import { AiOutlineGoogle, AiFillApple } from 'react-icons/ai';
import TextInputFormFieldControlled from '@components/inputs/text-input-form-field-controlled';
import TextInputFormField from '@components/inputs/text-input-form-field';
import { emailValidator } from '@domain/types/validators/email';
import { passwordValidator } from '@domain/types/validators/password';

export interface LoginPageDumbProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword?: () => void;
  onLoginWithGoogle?: () => void;
  onLoginWithApple?: () => void;
}

const text =
  'We understand that your furry friends deserve the best care, ' +
  "and we're here to provide it with our top-notch grooming and washing services.";



const LoginPageDumb: React.FC<LoginPageDumbProps> = ({
  onLoginWithApple,
  onLoginWithGoogle,
  onLogin,
}) => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [emailError, setEmailError] = React.useState<string|undefined>(undefined);
  const [passwordError, setPasswordError] = React.useState<string|undefined>(undefined);

  const handleEmailChange = (value:string) => {
    setEmailValue(value);
    setEmailError(undefined);
  }
  const handlePasswordChange = (value:string) => {
    setPasswordValue(value);
    setPasswordError(undefined);
  }

  const handleLogin = () => {
    const emailValid = emailValidator(emailValue);
    const passwordValid = passwordValidator(passwordValue);
    if(emailValid.valid && passwordValid.valid){
      onLogin(emailValue, passwordValue);
    }else{
      setEmailError(emailValid.errorMessage);
      setPasswordError(passwordValid.errorMessage);
    }
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginTitleWrapper}>
        <h1 className={style.loginTitle}>Login</h1>
      </div>
      <div className={style.loginPageInner}>
        <p className={style.loginPageInnerText}>{text}</p>
        <div className={style.loginInputWrapper}>
          <TextInputFormField
            label="Email"
            onChanged={handleEmailChange}
            lower={true}
            errorMessage={emailError}
          />
          <TextInputFormField
            onChanged={handlePasswordChange}
            label="Password"
            type={'password'}
            errorMessage={passwordError}
          />
          <CtaPrimary
            content="Login"
            onClick={handleLogin}
          />
          <Link to={'/forgotpassword'} className={style.forgotPassBtn}>
            Forgot password
          </Link>
        </div>
        <div className={style.signupBtnWrapper}>
          <Link to="/signup" className={style.signupBtn}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPageDumb;
