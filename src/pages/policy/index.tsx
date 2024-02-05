import React from 'react';
import BookingJourney from '@components/journeys/booking-journey';
import PolicyDumb from '@pages/policy/index.dumb';
import { useNavigate } from 'react-router-dom';


const PolicyPage = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/payment');
  }

  return <BookingJourney selectable={false}>
    <PolicyDumb onClick={handleClick} />
  </BookingJourney>;
};

export default PolicyPage;
