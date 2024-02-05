import { useInjection } from 'inversify-react';
import { HttpClientSymbol } from '@domain/types/TYPES';
import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { HttpClient } from '@common/http-client';
import { useLogout } from '@hooks/use-logout';
import { RouteNames } from '@quicker/route-names';

export interface PrivateRouteProps {
  children: React.ReactNode;

}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }:PrivateRouteProps) => {
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();
  const logout = useLogout();
  useEffect(() => {
    if (client.isTokenExpired()) {
      navigate(RouteNames.LOGIN);
      logout();
    }
  }, []);

  if(client.isTokenExpired()) {
    return null;
  }
  return <>{children}</>

};
