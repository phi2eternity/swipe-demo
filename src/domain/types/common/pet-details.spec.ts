
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import { PetDetailsEntity } from '@domain/types/common/pet-details';

const petGenerator = new PetMockGenerator();


describe('PetDetailsEntity', () => {
  it('should be defined', () => {
    const pet = petGenerator.generateOne();
    const petDetailsEntity: PetDetailsEntity = {
        ...pet,
        number_of_groomings: 5,
        number_of_wewashes: 5,
        total_grooming_cost: 5,
        total_wewash_cost: 5,

    }
    expect(petDetailsEntity).toBeDefined();
  });
});
