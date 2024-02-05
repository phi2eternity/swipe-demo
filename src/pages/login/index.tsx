import { useInjection } from 'inversify-react';
import LoginPageDumb from './index.dumb';
import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ErrorPopup from '@components/popups/error-popup';
import { Helmet } from 'react-helmet';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';
import { CustomerLoginUseCase } from '@domain/usecases/customer/login';
import { RouteNames } from '@quicker/route-names';

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {

  const [error, setError] = React.useState('');
  const login = useInjection<CustomerLoginUseCase>(CustomerLoginUseCase);
  const navigate = useNavigate();
  const [_,setLoading] = useLoadingOverlay();

  const onLogin = async (email: string, password: string) => {
    setLoading(true);
    const loginParams ={
      email,
      password
    };
    login.call(loginParams).then(() => {
      navigate(RouteNames.HOME);
    }).catch((err) => {
      setError('Login failed');
    }).finally(()=>{
      setLoading(false);
    });

  };
  const onLoginWithApple = () => {};
  const onLoginWithGoogle = () => {};
  const color = '#faca86';

  return (
    <Fragment>
      <Helmet>
        <meta name="theme-color" content={color}/>
        <title>Login</title>
      </Helmet>
      <ErrorPopup message={error} setMessage={setError} />
      <LoginPageDumb
        {...props}
        onLogin={onLogin}
        onLoginWithApple={onLoginWithApple}
        onLoginWithGoogle={onLoginWithGoogle}
      />
    </Fragment>
  );
};

export default LoginPage;
