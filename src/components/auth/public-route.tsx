import React, { useEffect } from 'react';
import { useInjection } from 'inversify-react';
import { useNavigate } from 'react-router-dom';
import { HttpClient } from '@common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { RouteNames } from '@quicker/route-names';

export interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children}: PublicRouteProps) => {
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();
  useEffect(() => {
    if(!client.isTokenExpired()) {
      navigate(RouteNames.HOME);
    }
  },[]);
  if(!client.isTokenExpired()) {
    return null;
  }
  return <>{children}</>;
};

