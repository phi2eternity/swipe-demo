import useAllAppointments from '@pages/appointments/index.hooks';
import UpcomingApptsDumb from '@features/upcoming-appts/index.dumb';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@quicker/route-names';


const UpcomingAppts = () => {
  const upcomingAppts = useAllAppointments();
  const navigate  = useNavigate();
  const handleGoTo = () => {
    navigate(RouteNames.APPOINTMENTS);
  }
  return <UpcomingApptsDumb appointments={upcomingAppts} goTo={handleGoTo}/>;

}

export default UpcomingAppts;
