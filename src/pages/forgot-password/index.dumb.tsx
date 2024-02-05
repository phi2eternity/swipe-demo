import React from 'react';
import TextInputFormFieldControlled, {
  TextInputFormFieldControlledProps,
} from '@components/inputs/text-input-form-field-controlled';

import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import style from './index.module.scss';
import { Link } from 'react-router-dom';

export interface ForgotPasswordPageDumbProps {
  emailValue?: string;
  setEmailValue?: (value: string) => void;
  onForgotPassword?: () => void;
}

const ForgotPasswordPageDumb: React.FC<ForgotPasswordPageDumbProps> = ({
  emailValue,
  setEmailValue,
  onForgotPassword,
}) => {
  return (
    <div className={style.forgotPasswordPage}>
      <div className={style.forgotTitleWrapper}>
        <h1 className={style.forgotTitle}>Forgot password?</h1>
      </div>
      <div className={style.forgotPasswordPageInner}>
        <p className={style.forgotPasswordPageInnerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod
          tempor
        </p>
        <div className={style.forgotInputWrapper}>
          <TextInputFormFieldControlled
            label="Email"
            value={emailValue}
            setValue={setEmailValue}
          />
          <CtaPrimary
            content="Forgot Password"
            onClick={() => {
              onForgotPassword && onForgotPassword();
            }}
          />
        </div>
        <p className={style.loginPageInnerText} style={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          fugit maiores magni{' '}
        </p>
        <div className={style.loginBtnWrapper}>
          <Link to="/login" className={style.loginBtn}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPageDumb;
