import { AppointmentEntity } from '@domain/types/common/appointment';
import style from './index.module.scss';
import NoApptCard from '@components/cards/no-appt-card';
import ApptCardFactory, { ApptCardFactoryFromAppointment } from '@components/cards/appt-card/factory';
import AllApptsButton from '@components/buttons/all-appts-button';

export interface UpcomingApptsDumbProps {
  appointments: AppointmentEntity[];
  onClick?: (appt: AppointmentEntity) => void;
  goTo?: () => void;
}

const UpcomingApptsDumb = ({
                             appointments, onClick, goTo,
                           }: UpcomingApptsDumbProps) => {

  const noAppointments = appointments.length === 0;
  const lestThanThreeAppointments = appointments.length < 3;
  const other = appointments.length >= 3;

  const handleClick = (appt: AppointmentEntity) => () => {
    onClick && onClick(appt);
  }

  return <div data-testid={'upcoming-appts'} className={style.upcomingAppts}>
    <h4>Upcoming Appointments</h4>
    {noAppointments && <NoApptCard />}
    {lestThanThreeAppointments && appointments.map((appointment) => {
      return <ApptCardFactoryFromAppointment key={appointment.id} onClick={handleClick(appointment)} appointment={appointment} />;
    })}
    {other && appointments.slice(0, 2).map((appointment) => {
      return <ApptCardFactoryFromAppointment key={appointment.id} onClick={handleClick(appointment)} appointment={appointment} />;
    })}
    {other && <AllApptsButton onClick={goTo} />}
  </div>;
};

export default UpcomingApptsDumb;
