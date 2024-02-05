import React, { useState, useEffect } from 'react';
import { HttpClientCachedSymbol, HttpClientSymbol } from '@domain/types/TYPES';
import { HttpClient } from '@quicker/common/http-client';
import { useInjection } from 'inversify-react';
import SpinnerOverlay from '@components/loading/spinner-overlay';
import { useNavigate } from 'react-router';

interface AutoLoginProps {
  children: React.ReactNode;
}

const AutoLogin = ({ children }: AutoLoginProps) => {
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(true);

    client
      .verify()
      .then((res) => {
        if (!res) {
          navigate('/login');
        }
        setIsLoggedIn(true);
      })
      .catch((err) => {
        navigate('/login');
      });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <SpinnerOverlay />;
  } else {
    return <>{children}</>;
  }
};

export default AutoLogin;
