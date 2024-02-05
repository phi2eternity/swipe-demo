import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';

describe('PetMockGenerator', () => {
  it('should be defined.',()=>{
    expect(PetMockGenerator).toBeDefined();
  });
  it('should be able to generate a single pet.',()=>{
    const petMockGenerator = new PetMockGenerator();
    const pet = petMockGenerator.generateOne();
    expect(pet).toBeDefined();
  });

  it('should be able to generate many pets.',()=>{
    const petMockGenerator = new PetMockGenerator();
    const pets = petMockGenerator.generateMany(5);
    expect(pets).toBeDefined();
    expect(pets.length).toBe(5);
  });
});
