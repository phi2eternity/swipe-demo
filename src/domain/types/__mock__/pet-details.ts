import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { faker } from '@faker-js/faker';


class PetDetailsMockGenerator extends PetMockGenerator {
  generateOne(): PetDetailsEntity {
    const pet = super.generateOne();
    return {
      ...pet,
      number_of_groomings: faker.datatype.number({ min: 0, max: 100 }),
      number_of_wewashes: faker.datatype.number({ min: 0, max: 100 }),
      total_grooming_cost: faker.datatype.number({ min: 0, max: 5000 }),
      total_wewash_cost: faker.datatype.number({ min: 0, max: 5000 }),
    };
  }

  generateMany(count: number): PetDetailsEntity[] {
    const pets: PetDetailsEntity[] = [];
    for (let i = 0; i < count; i++) {
      pets.push(this.generateOne());
    }
    return pets;
  }

}

export { PetDetailsMockGenerator };
