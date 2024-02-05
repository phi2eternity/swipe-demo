import { PetDetailsEntity } from '@domain/types/common/pet-details';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import React from 'react';
import { ListItemCard } from '@components/cards/list-item-card';
import StatsCard from '@components/cards/stats-card';

export interface PetDetailsPageDumbProps {
  pet: PetDetailsEntity;
  goBack?: () => void;
}

const PetDetailsPageDumb = ({pet,goBack}:PetDetailsPageDumbProps) => {
  console.log("pet",pet)
  return <div className={style.petDetails}>
    <div className={style.petDetailsHeader}>
      <BiLeftArrow onClick={goBack}/>
      <h1>{pet.name}</h1>

    </div>
    <div className={style.petDetailsBody}>
      <ListItemCard label={"Breed"} value={pet.breed ?? ""}/>
      <ListItemCard label={"Age"} value={pet.age?.toString() ?? ""}/>
      <ListItemCard label={"Gender"} value={pet.gender ?? ""}/>
      <ListItemCard label={"Weight"} value={pet.weight?.toString() ?? ""}/>
      <ListItemCard label={"Fixed"} value={pet.fixed?.toString() ?? ""}/>

      <div className={style.petDetailsButtonGroup}>
        <StatsCard caption={"Grooming"} value={pet.number_of_groomings.toString()}/>
        <StatsCard caption={"WeWash"} value={pet.number_of_wewashes.toString()}/>
      </div>
    </div>

  </div>;

}
export default PetDetailsPageDumb;
