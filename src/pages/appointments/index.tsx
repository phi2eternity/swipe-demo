import React from 'react';
import useAllAppointments from '@pages/appointments/index.hooks';
import AppointmentsPageDumb from '@pages/appointments/index.dumb';
import useMe from '@hooks/use-me';
import PageCard from '@components/cards/page-card/page-card';
import ShakingModal from '@components/layouts/shaking-modal';
import { AppointmentEntity } from '@domain/types/common/appointment';
import ApptCancelJourney from '@components/journeys/appt-cancel';
import { useInjection } from 'inversify-react';
import { CancelAppointmentUseCase } from '@domain/usecases/appointment/cancel-appointment';
import useAllPets from '@hooks/use-all-pets';


const AppointmentsPage = () => {
  const appointments = useAllAppointments();
  const [appointment, setAppointment] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const cancelAppt = useInjection<CancelAppointmentUseCase>(CancelAppointmentUseCase);

  const { pets } = useAllPets();

  const goBack = () => {
    window.history.back();
  }

  const handleApptClicked = (appt:AppointmentEntity) => {
    setAppointment(appt);
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleCancel = (appointment: AppointmentEntity) => {
    cancelAppt.call(appointment.id);
  }

  return <PageCard>
    <AppointmentsPageDumb onApptClicked={handleApptClicked} appointments={appointments} pets={pets} goBack={goBack}/>
    <ApptCancelJourney cancel={handleCancel} open={open} close={handleClose } appointment={appointment} />
  </PageCard>

}

export default AppointmentsPage;
