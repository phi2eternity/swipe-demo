import React from 'react';
import { useInjection } from 'inversify-react';
import { CustomerGetAllAppointmentsUseCase } from '@domain/usecases/customer/all-appointments';
import { AppointmentEntity } from '@domain/types/common/appointment';


const useAllAppointments = () => {
  const getAllAppointments = useInjection(CustomerGetAllAppointmentsUseCase);

  const [appointments, setAppointments] = React.useState<AppointmentEntity[]>([]);

  React.useEffect(() => {
    getAllAppointments.call({
      limit:50,
      offset:0
    }).then((offsetResponse) => {
      const { results } = offsetResponse;
      setAppointments(results);
    });

    },[]);

  return appointments;
}

export default useAllAppointments;
