import { OrderActions } from '@quicker/store/order-slice';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { HttpClient } from '@common/http-client';
import { useInjection } from 'inversify-react';
import { useDispatch } from 'react-redux';

export const useLogout = () => {
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const dispatch = useDispatch();
  const logout  = () => {
    client.purgeAuthToken();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(OrderActions.resetOrder());
    indexedDB.databases().then(function(databases) {
      databases.forEach(function(database) {
        if (!database.name) return;
        if (window.indexedDB.deleteDatabase(database.name)) return;
      });
    });
  };
  return logout;
}
