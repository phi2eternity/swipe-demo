import React from 'react';
import style from './index.module.scss';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { BiRightArrow } from 'react-icons/bi';
import StatsCard from '@components/cards/stats-card';

export interface PetStatsCardProps {
  pet: PetDetailsEntity;
  onClick?: () => void;
}

const PetStatsCard = ({pet,onClick}:PetStatsCardProps) => {
  return <div onClick={onClick} data-testid={'pet-stats-card'} className={style.petStatsCard}>
    <div className={style.petStatsCardHeader}>
      <div className={style.petStatsCardHeaderLeft}>
        <h4>{pet.name}</h4>
        {pet.age && <p>{pet.age.toString() + " years old"}</p>}

      </div>
      <BiRightArrow/>
    </div>
    <div className={style.petStatsCardContent}>
    <StatsCard caption={"Grooming"} value={pet.number_of_groomings.toString()}/>
    <StatsCard caption={"WeWash"} value={pet.number_of_wewashes.toString()}/>
    </div>
  </div>
}

export default PetStatsCard;
