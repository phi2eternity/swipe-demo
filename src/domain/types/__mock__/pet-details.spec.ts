import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';

describe('PetDetailsMockGenerator', () => {
  let petDetailsMockGenerator: PetDetailsMockGenerator;
  beforeAll(() => {
    petDetailsMockGenerator = new PetDetailsMockGenerator();
  });
  it('should be defined', () => {
    const petDetailsMockGenerator = new PetDetailsMockGenerator();
    expect(petDetailsMockGenerator).toBeDefined();
  });
  it('should generate one pet details', () => {
    const petDetails = petDetailsMockGenerator.generateOne();
    expect(petDetails).toBeDefined();
    expect(petDetails.number_of_groomings).toBeDefined();
    expect(petDetails.number_of_wewashes).toBeDefined();
    expect(petDetails.total_grooming_cost).toBeDefined();
    expect(petDetails.total_wewash_cost).toBeDefined();

  });
  it('should generate many pet details', () => {
    const petDetails = petDetailsMockGenerator.generateMany(5);
    expect(petDetails).toBeDefined();
    expect(petDetails.length).toBe(5);
  petDetails.forEach((petDetail) => {
    expect(petDetail.number_of_groomings).toBeDefined();
    expect(petDetail.number_of_wewashes).toBeDefined();
    expect(petDetail.total_grooming_cost).toBeDefined();
    expect(petDetail.total_wewash_cost).toBeDefined();
  });

  });

});
