import MyAccountDumb from '@pages/my-account/index.dumb';
import { useNavigate } from 'react-router-dom';
import useMe from '@hooks/use-me';
import PageCard from '@components/cards/page-card/page-card';
import { HttpClient } from '@quicker/common/http-client';
import { useInjection } from 'inversify-react';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { OrderActions } from '@quicker/store/order-slice';
import { useDispatch } from 'react-redux';
import { RouteNames } from '@quicker/route-names';

const MyAccountPage = () => {

  const navigate = useNavigate();
  const me = useMe();
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const dispatch = useDispatch();

  const gotoAppointments = () => {
    navigate(RouteNames.APPOINTMENTS);
  }

  const gotoPets = () => {
    navigate(RouteNames.PETS);
  }

  const goBack = () => {
    navigate(RouteNames.HOME);
  }

  const handleLogout = () => {
    client.logout();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(OrderActions.resetOrder());
    indexedDB.databases().then(function(databases) {
      databases.forEach(function(database) {
        if(!database.name ) return;
        if(window.indexedDB.deleteDatabase(database.name)) return;
      });
    });
    navigate(RouteNames.LOGIN);
  }
  const gotoPaymentMethods = () => {
    navigate(RouteNames.PAYMENT_METHODS);
  }

  return <PageCard><MyAccountDumb
    goBack={goBack}
    onClickAppointments={gotoAppointments}
    onClickMyPets={gotoPets}
    onClickPaymentMethods={gotoPaymentMethods}
    onClickLogout={handleLogout}
    name={me?.name ?? ""}
    email={me?.email ?? ""}
  /></PageCard>
}

export default MyAccountPage;
