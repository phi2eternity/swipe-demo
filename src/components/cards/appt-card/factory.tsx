import ApptCard, { ApptCardProps } from '@components/cards/appt-card/index';
import React from 'react';
import ApptCardCompleted from '@components/cards/appt-card/completed';
import ApptCardCancelled from '@components/cards/appt-card/cancelled';
import { AppointmentEntity } from '@domain/types/common/appointment';

export interface ApptCardFactoryProps extends ApptCardProps {

  status?: string;
}

const ApptCardFactory: React.FC<ApptCardFactoryProps> =  (props: ApptCardFactoryProps) => {
  const {status = ""} = props;
  if (status == 'Completed') {
    return <ApptCardCompleted {...props} />;
  }else if(status == 'Cancelled') {
    return <ApptCardCancelled {...props} />;
  }else{
    return <ApptCard {...props} />;
  }
}

export interface ApptCardFactoryFromAppointmentProps {
  appointment: AppointmentEntity;
  onClick?: (appt:AppointmentEntity) => void;
}

export const ApptCardFactoryFromAppointment = ({appointment,onClick}:ApptCardFactoryFromAppointmentProps) => {
  const {status = ""} = appointment;
  const props = {
    date: appointment.start,
    employee: appointment.employee,
    service: appointment.appointment_type,
    branch: appointment.branch,
    onClick
  } as ApptCardProps;
  if (status == 'Completed') {
    return <ApptCardCompleted {...props}  />;
  }else if(status == 'Cancelled') {
    return <ApptCardCancelled {...props} />;
  }else{
    return <ApptCard {...props} />;
  }
}

export default ApptCardFactory;
