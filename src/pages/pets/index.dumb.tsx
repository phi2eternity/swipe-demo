import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import React from 'react';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import PetStatsCard from '@components/cards/pet-stats-card';


export interface PetsPageDumbProps {
  pets: PetDetailsEntity[];
  onClickPet?: (pet: PetDetailsEntity) => void;
  goBack?: () => void;
}

const PetsPageDumb = ({pets,onClickPet,goBack} : PetsPageDumbProps) => {

  const handleClick = (pet: PetDetailsEntity) => () => {
    onClickPet && onClickPet(pet);
  }

  return <div className={style.pets}>
    <div className={style.petsHeader}>
      <BiLeftArrow onClick={goBack}/>
      <h1>My Pets</h1>

    </div>
    <div className={style.petsBody}>
      {(pets.length === 0)? <p>No pets found</p> : pets.map((pet) => {
        return <PetStatsCard key={pet.id} pet={pet} onClick={handleClick(pet)}/>;
      })}
      <div style={{height:"64px"}}/>
    </div>

  </div>;
}

export default PetsPageDumb;
