import ServiceHeader from '@features/service-header/service-header';
import style from '@components/journeys/booking-journey/index.module.scss';
import PageCard from '@components/cards/page-card/page-card';
import {journey} from '@components/journeys/booking-journey/index.journey';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface BookingJourneyProps {
  children: React.ReactNode;
  selectable: boolean;
}

const BookingJourney: React.FC<BookingJourneyProps> = ({
  children,
selectable = false
}: BookingJourneyProps) => {

  const navigate = useNavigate();

  const getPageStep = () => {
    const currentPath = window.location.pathname;
    const step = journey.find((path) => path === currentPath);
    return journey.indexOf(step as string);;
  }

  const {currentStep} = useSelector((state: any) => {
    return {
      currentStep: state.order.step
    };
  });


  const getPrevious = () => {
    const currentPath = window.location.pathname;
    const step = journey.find((path) => path === currentPath);
    const index = journey.indexOf(step as string);
    if(index == 0) {
      return "/";
    }
    return journey[index - 1];
  }

  return <PageCard>
    <ServiceHeader previous={getPrevious()} selectable={selectable}/>
    <div className={style.bookingJourney}>
      {children}
    </div>

  </PageCard>
}

export default BookingJourney;
