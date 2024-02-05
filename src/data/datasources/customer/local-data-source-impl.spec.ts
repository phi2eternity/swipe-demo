import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { getTestContainer } from '@utils/inversion-container-test';
import { Container } from 'inversify';
import { CustomerLocalDataSourceImpl } from '@data/datasources/customer/local-data-source-impl';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { CacheProvider } from '@quicker/common/cache-provider';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { AppointmentCacheProvider, PetDetailsCacheProvider } from '@domain/types/TYPES';
import { CustomerLocalDataSource } from '@data/datasources/customer/local-data-source';
import '@quicker/__mocks__/storage';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';


describe('CustomerLocalDataSourceImpl', () => {
  const petDetailsGenerator = new PetDetailsMockGenerator();
  const petDetails = petDetailsGenerator.generateMany(10);
  const appointmentGenerator = new AppointmentMockGenerator();
  const appointments = appointmentGenerator.generateMany(10);

  let container: Container;
  let customerLocalDataSourceImpl: CustomerLocalDataSourceImpl;
  let appointmentCacheProvider: CacheProvider<AppointmentEntity>;
  let petDetailsCacheProvider: CacheProvider<PetDetailsEntity>;


  beforeAll(() => {
    container = getTestContainer();
    customerLocalDataSourceImpl = container.get<CustomerLocalDataSource>(CustomerLocalDataSource) as CustomerLocalDataSourceImpl;
    appointmentCacheProvider = container.get<CacheProvider<AppointmentEntity>>(AppointmentCacheProvider);
    petDetailsCacheProvider = container.get<CacheProvider<PetDetailsEntity>>(PetDetailsCacheProvider);
  });

  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {

    jest.restoreAllMocks();
  });

  it('should be defined.', () => {
    expect(customerLocalDataSourceImpl).toBeDefined();
    expect(appointmentCacheProvider).toBeDefined();
    expect(petDetailsCacheProvider).toBeDefined();
  });

  it('should return all appointments', async () => {
    jest.spyOn(appointmentCacheProvider, 'find').mockResolvedValue(appointments);
    const response = await customerLocalDataSourceImpl.allAppointments({ offset: 0, limit: 10 });
    expect(response.count).toEqual(10);
    expect(response.results).toEqual(appointments.sort((a, b) => a.id - b.id));
    expect(appointmentCacheProvider.find).toBeCalledWith({});
  });
  it('should return empty array if offset is greater than appointments length', async () => {
    jest.spyOn(appointmentCacheProvider, 'find').mockResolvedValue(appointments);
    const response = await customerLocalDataSourceImpl.allAppointments({ offset: 100, limit: 10 });
    expect(response.count).toEqual(0);
    expect(response.results).toEqual([]);
    expect(appointmentCacheProvider.find).toBeCalledWith({});

  });
  it('should return slice of appointments if limit is provided', async () => {
    jest.spyOn(appointmentCacheProvider, 'find').mockResolvedValue(appointments);
    const response = await customerLocalDataSourceImpl.allAppointments({ offset: 0, limit: 5 });
    expect(response.count).toEqual(5);
    expect(response.results).toEqual(appointments.slice(0, 5));
    expect(appointmentCacheProvider.find).toBeCalledWith({});

  });
  it('should return all pet details', async () => {
    jest.spyOn(petDetailsCacheProvider, 'find').mockResolvedValue(petDetails);
    const response = await customerLocalDataSourceImpl.allPets();
    expect(response.length).toEqual(10);
    expect(response).toEqual(petDetails.sort((a, b) => a.id - b.id));
    expect(petDetailsCacheProvider.find).toBeCalledWith({});
  });
  it('should add pet details', async () => {
    const pet = petDetailsGenerator.generateOne();
    jest.spyOn(petDetailsCacheProvider, 'upsert');
    await customerLocalDataSourceImpl.createPet(pet);
    expect(petDetailsCacheProvider.upsert).toBeCalledWith(pet);
  });
  it('should return all upcoming appointments', async () => {
    jest.spyOn(appointmentCacheProvider, 'find').mockResolvedValue(appointments);
    const upcomingAppointments = appointments.filter(appointment => new Date(appointment.start).getTime() > new Date().getTime());
    const response = await customerLocalDataSourceImpl.upcomingAppointments({ offset: 0, limit: 10 });
    expect(response.count).toEqual(upcomingAppointments.length);
    expect(response.results).toEqual(upcomingAppointments.sort((a, b) => a.id - b.id));
    expect(appointmentCacheProvider.find).toBeCalledWith({});

  });
  it('should return all past appointments', async () => {
    jest.spyOn(appointmentCacheProvider, 'find').mockResolvedValue(appointments);
    const pastAppointments = appointments.filter(appointment => new Date(appointment.start).getTime() < new Date().getTime());
    const response = await customerLocalDataSourceImpl.pastAppointments({ offset: 0, limit: 10 });
    expect(response.count).toEqual(pastAppointments.length);
    expect(response.results).toEqual(pastAppointments.sort((a, b) => a.id - b.id));
    expect(appointmentCacheProvider.find).toBeCalledWith({});

  });
  it('should add multiple appointments and bulkUpsert called.', async () => {
    const appointments = appointmentGenerator.generateMany(10);
    jest.spyOn(appointmentCacheProvider, 'bulkUpsert');
    await customerLocalDataSourceImpl.addAppointments(appointments);
    expect(appointmentCacheProvider.bulkUpsert).toBeCalledWith(appointments);
  });
  it('should add multiple pet details and bulkUpsert called.', async () => {
    const petDetails = petDetailsGenerator.generateMany(10);
    jest.spyOn(petDetailsCacheProvider, 'bulkUpsert');
    await customerLocalDataSourceImpl.addPets(petDetails);
    expect(petDetailsCacheProvider.bulkUpsert).toBeCalledWith(petDetails);
  });
  it('should set me if me is called with MeResponse',async ()=>{
    const me = new MeMockGenerator().generateOne();
    const response = await customerLocalDataSourceImpl.me(me);
    expect(response).toEqual(me);
    expect(localStorage.setItem).toBeCalledWith("me",JSON.stringify(me));
  })
  it('when me is called with argument it should call localStorage.setItem.',async ()=>{
    const me = new MeMockGenerator().generateOne();
    const response = await customerLocalDataSourceImpl.me();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(response).toEqual(null);
    await customerLocalDataSourceImpl.me(me);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toBeCalledWith("me",JSON.stringify(me))


  });

});
