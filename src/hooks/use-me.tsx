import { GetMeUseCase } from '@domain/usecases/customer/get-me';
import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import { MeResponse } from '@domain/types/responses/me-response';

const useMe = () => {
  const getMe = useInjection(GetMeUseCase);

  const [me, setMe] = React.useState<MeResponse | null>(null);
  useEffect(() => {
    getMe.call().then((meResponse) => {
      setMe(meResponse);
    });
  }, []);

  return me;
};
export default useMe;
