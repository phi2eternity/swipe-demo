import React from 'react';
import { useInjection } from 'inversify-react';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { CustomerGetUpcomingAppointmentsUseCase } from '@domain/usecases/customer/upcoming-appointments';

const useUpcomingAppts = () => {
  const [upcomingAppts, setUpcomingAppts] = React.useState<AppointmentEntity[]>([]);
  const getUpcomingAppts = useInjection(CustomerGetUpcomingAppointmentsUseCase);
  React.useEffect(() => {
    getUpcomingAppts.call({
      limit: 50, offset: 0,
    }).then((offsetResponse) => {
      const { results } = offsetResponse;
      setUpcomingAppts(results);
    });

  }, []);

  return upcomingAppts;
};

export default useUpcomingAppts;
