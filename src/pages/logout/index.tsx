import { useEffect } from 'react';
import { useLogout } from '@hooks/use-logout';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@quicker/route-names';


export const LogoutPage = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate(RouteNames.LOGIN);
  }, [logout]);
  return null;
}
