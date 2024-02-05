export interface CreatePetRequest {
  name: string;
  breed: string;
  weight: number;
  age?: number;
  gender: string;
  birth_date: string;
  special_handling?: string;
  rabies_vaccination?: string;
}
