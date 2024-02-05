import React, { useEffect } from 'react';
import '../../App.css';
import PromotionCard from '@components/cards/promotion-card/promotion-card';
import CarouselSlider from '@components/carousel-slider/carousel-slider';
import ProfileCard from '@components/cards/profile-card/profile-card';
import ServiceCard from '@components/cards/service-card/service-card';
import svgSrc from '../../assets/grooming.svg';
import './index.scss';
import AppointmentCard from '@components/cards/appointment-card/appointment-card';
import imageSrc from '../../assets/mockPhoto.png';
import logoSrc from '../../assets/logo.png';
import { PetEntity } from '@domain/types/common/pet';
import { AppointmentEntity } from '@domain/types/common/appointment';
import UpcomingApptsDumb from '@features/upcoming-appts/index.dumb';
import { PetDetailsEntity } from '@domain/types/common/pet-details';

export interface HomePageDumbProps {
  appointments: AppointmentEntity[];
  pets: PetDetailsEntity[];
  onServiceCardClick?: (serviceName: string) => boolean;
  onAppointmentClick?: (appt: AppointmentEntity) => void;
  goTo?: () => void;
}

const HomePageDumb = ({ appointments, onAppointmentClick, pets, onServiceCardClick, goTo }: HomePageDumbProps) => {


  return (<div className='home-page page'>
      <img alt='scrubbers logo' className={'logo'} src={logoSrc}></img>
      <ProfileCard pets={pets} />
      {/* <RewardsCard rewardCount={100} /> */}
      <div className='service-row'>
        <div className='header-row'>
          <h1>Book Appointment</h1>
        </div>
        <div className='service-row-flex'>
          <ServiceCard
            onClick={onServiceCardClick}
            title='Grooming'
            subtitle='well-brushed, and clipped'
          />
          <ServiceCard
            onClick={onServiceCardClick}
            title='We Wash'
            subtitle='bath to clean up your pet'
          />
        </div>
      </div>
      <div className='appointments-row'>
        <UpcomingApptsDumb onClick={onAppointmentClick} appointments={appointments} goTo={goTo} />
      </div>

    </div>);
};

export default HomePageDumb;
