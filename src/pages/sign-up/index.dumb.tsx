import React from 'react';
import style from './index.module.scss';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { Link } from 'react-router-dom';
import TextInputFormField from '@components/inputs/text-input-form-field';
import '../../App.css';
import { emailValidator } from '@domain/types/validators/email';
import { passwordValidator } from '@domain/types/validators/password';
import { nameValidator } from '@domain/types/validators/name';

export interface SignUpPageDumbProps {
  onSignUp: (email:string,password:string,first_name:string,last_name:string) => void;
  onSignUpWithGoogle?: () => void;
  onSignUpWithApple?: () => void;

}

const text =
  'We understand that your furry friends deserve the best care, ' +
  "and we're here to provide it with our top-notch grooming and washing services.";


const SignUpPageDumb: React.FC<SignUpPageDumbProps> = ({

  onSignUp,
}) => {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');
  const [passwordError, setPasswordError] = React.useState<string|undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string|undefined>(undefined);
  const [emailError, setEmailError] = React.useState<string|undefined>(undefined);
  const [firstNameError, setFirstNameError] = React.useState<string|undefined>(undefined);
  const [lastNameError, setLastNameError] = React.useState<string|undefined>(undefined);


  const handleSignUp = () => {
    const emailValid = emailValidator(emailValue);
    const passwordValid = passwordValidator(passwordValue);
    const confirmPasswordValid = passwordValidator(confirmPasswordValue);
    const passwordMatch = passwordValue === confirmPasswordValue;
    const firstNameValid = nameValidator(firstName);
    const lastNameValid = nameValidator(lastName);
    if(emailValid.valid && passwordValid.valid && confirmPasswordValid.valid && passwordMatch && firstNameValid.valid && lastNameValid.valid){
      onSignUp(emailValue, passwordValue, firstName, lastName);
    }else{
      setEmailError(emailValid.errorMessage);
      setPasswordError(passwordValid.errorMessage);
      if(!passwordMatch){
        setConfirmPasswordError("Passwords do not match");
      }
      setFirstNameError(firstNameValid.errorMessage);
      setLastNameError(lastNameValid.errorMessage);

    }
  }

  const handleFirstNameChange = (value:string) => {
    setFirstName(value);
    setFirstNameError(undefined);
  }
  const handleLastNameChange = (value:string) => {
    setLastName(value);
    setLastNameError(undefined);
  }
  const handleEmailChange = (value:string) => {
    setEmailValue(value);
    setEmailError(undefined);
  }
  const handlePasswordChange = (value:string) => {
    setPasswordValue(value);
    setPasswordError(undefined);
  }
  const handleConfirmPasswordChange = (value:string) => {
    setConfirmPasswordValue(value);
    setConfirmPasswordError(undefined);
  }


  return (
    <div className={style.signupPage}>
      <div className={style.signupTitleWrapper}>
        <h1 className={style.signupTitle}>Sign Up</h1>
      </div>
      <div className={style.signupPageInner}>
        <p className={style.signupPageInnerText}>{text}</p>
        <div className={style.signupInputWrapper}>

          <TextInputFormField
            capitalized={true}
            label="First name"
            onChanged={handleFirstNameChange}
            errorMessage={firstNameError}
          />
          <TextInputFormField
            capitalized={true}
            label={'Last name'}
            onChanged={handleLastNameChange}
            errorMessage={lastNameError}
            />
          <TextInputFormField
            label="Email"
            lower={true}
            onChanged={handleEmailChange}
            errorMessage={emailError}
          />
          <TextInputFormField
            label="Password"
            type={'password'}
            onChanged={handlePasswordChange}
            errorMessage={passwordError}
          />
          <TextInputFormField
            label="Confirm password"
            type={'password'}
            onChanged={handleConfirmPasswordChange}
            errorMessage={confirmPasswordError}

          />
          <CtaPrimary
            content="Sign Up"
            onClick={handleSignUp}
          />
        </div>

        <div className={style.signupBtnWrapper}>
          <Link to="/login" className={style.signupBtn}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPageDumb;
