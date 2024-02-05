import { IndexedDbCache } from './indexed-db';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { PetDetailsEntity } from '@domain/types/common/pet-details';


describe('IndexedDbCache', () => {
  let cache: IndexedDbCache<PetDetailsEntity>;
  const generator = new PetDetailsMockGenerator();

  beforeEach(async () => {
    cache = new IndexedDbCache({
      dbName: 'test',
      storeName: 'pets',
    });
    await cache.purge();
  });

  it('upsert and get', async () => {
    const samplePet = generator.generateOne();

    await cache.upsert(samplePet);
    const pet = await cache.get(samplePet.id);
    expect(pet).toEqual(samplePet);
  });

  it('set and get', async () => {
    const samplePet = generator.generateOne();

    await cache.set(samplePet);
    const pet = await cache.get(samplePet.id);
    expect(pet).toEqual(samplePet);
  });

  it('purge', async () => {
    const samplePet = generator.generateOne();

    await cache.upsert(samplePet);
    await cache.purge();
    const pet = await cache.get(samplePet.id);
    expect(pet).toBeUndefined();
  });

  it('get non-existent', async () => {
    const pet = await cache.get(999);
    expect(pet).toBeUndefined();
  });

  it('upsert multiple, and upsert another with same id.', async () => {
    const samplePets = generator.generateMany(5);

    await Promise.all(samplePets.map((pet) => cache.upsert(pet)));
    const pets = await Promise.all(samplePets.map((pet) => cache.get(pet.id)));
    expect(pets).toEqual(samplePets);
    samplePets[0].number_of_groomings = 100;
    await cache.upsert(samplePets[0]);
    const pet = await cache.get(samplePets[0].id);
    expect(pet).toEqual(samplePets[0]);
  });

  it('partially upsert', async () => {
    const samplePet = generator.generateOne();
    await cache.upsert(samplePet);
    const pet = await cache.get(samplePet.id);
    expect(pet).toEqual(samplePet);
    samplePet.number_of_groomings = 100;
    await cache.upsert({ id: samplePet.id, number_of_groomings: samplePet.number_of_groomings });

  });

  it('bulkUpsert, bulkRemove, check if empty.', async () => {
    const samplePets = generator.generateMany(5);

    await cache.bulkUpsert(samplePets);
    const pets = await Promise.all(samplePets.map((pet) => cache.get(pet.id)));
    expect(pets).toEqual(samplePets);
    await cache.bulkRemove(samplePets.map((pet) => pet.id));
    const pet = await cache.get(samplePets[0].id);
    expect(pet).toBeUndefined();
  });
  it('find with single field. Check sorted with id.', async () => {
    const samplePets = generator.generateMany(40);

    await cache.bulkUpsert(samplePets);
    const result = await cache.find({ gender:"Male" });
    const malePets = samplePets.filter((pet) => pet.gender ==="Male");
    expect(result.length).toEqual(malePets.length);
    expect(
      malePets.sort((a, b) => a.id - b.id)
    ).toEqual(result);
  });
  it('find with multiple fields. Check sorted with id.', async () => {
    const samplePets = generator.generateMany(20);
    await cache.bulkUpsert(samplePets);

    await cache.bulkUpsert(samplePets);
    const result = await cache.find({ gender:"Male", fixed:true });
    const maleAndFixedPets = samplePets.filter((pet) => pet.gender ==="Male" && pet.fixed);
    expect(result.length).toEqual(maleAndFixedPets.length);
    expect(
      maleAndFixedPets.sort((a, b) => a.id - b.id)
    ).toEqual(result);

  });
  it('find get all. Check sorted with id.', async () => {
    const samplePets = generator.generateMany(20);
    await cache.bulkUpsert(samplePets);

    await cache.bulkUpsert(samplePets);
    const result = await cache.find({});
    expect(result.length).toEqual(samplePets.length);
    expect(
      samplePets.sort((a, b) => a.id - b.id)
    ).toEqual(result);
  });
});
