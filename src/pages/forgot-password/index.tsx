import React from 'react';
import ForgotPasswordPageDumb, {
  ForgotPasswordPageDumbProps,
} from './index.dumb';
import { useInjection } from 'inversify-react';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';

const ForgotPasswordPage: React.FC = () => {
  const [emailValue, setEmailValue] = React.useState<string>('');
  const client = useInjection<HttpClient>(HttpClientSymbol);

  const props: ForgotPasswordPageDumbProps = {
    emailValue,
    setEmailValue,
    onForgotPassword: () => {
      ///TODO client.post('/api/auth/forgot-password', { email: emailValue });
    },
  };

  return <ForgotPasswordPageDumb {...props} />;
};

export default ForgotPasswordPage;
