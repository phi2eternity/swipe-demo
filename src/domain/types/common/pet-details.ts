import { PetEntity } from '@domain/types/common/pet';

export interface PetDetailsEntity extends PetEntity {
  number_of_groomings: number;
  number_of_wewashes: number;
  total_grooming_cost: number;
  total_wewash_cost: number;
}
