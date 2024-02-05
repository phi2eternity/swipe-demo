import { CustomerRepositoryImpl } from '@data/repositories/customer/index';
import { interfaces } from 'inversify';
import Container = interfaces.Container;
import { CustomerRemoteDataSource } from '@data/datasources/customer/remote-data-source';
import { CustomerLocalDataSource } from '@data/datasources/customer/local-data-source';
import { getTestContainer } from '@utils/inversion-container-test';
import { CustomerRepository } from '@domain/repositories/customer';
import { CustomerRemoteDataSourceImpl } from '@data/datasources/customer/remote-data-source-impl';
import { CustomerLocalDataSourceImpl } from '@data/datasources/customer/local-data-source-impl';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';
import { LoginRequest } from '@domain/types/requests/login';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import { SignupRequest } from '@domain/types/requests/signup';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { PetDetailsEntity } from '@domain/types/common/pet-details';

describe('CustomerRepositoryImpl', () => {
  let container: Container;
  let customerRepository: CustomerRepositoryImpl;
  let customerRemoteDataSource: CustomerRemoteDataSourceImpl;
  let customerLocalDataSource: CustomerLocalDataSourceImpl;

  const meGenerator = new MeMockGenerator();
  const authenticationResponseGenerator = new AuthenticationResponseMockGenerator();
  const appointmentGenerator = new AppointmentMockGenerator();
  const petGenerator = new PetMockGenerator();
  const petDetailsGenerator = new PetDetailsMockGenerator();

  beforeAll(() => {
    container = getTestContainer();
    customerRemoteDataSource = container.get<CustomerRemoteDataSource>(CustomerRemoteDataSource) as CustomerRemoteDataSourceImpl;
    customerLocalDataSource = container.get<CustomerLocalDataSource>(CustomerLocalDataSource) as CustomerLocalDataSourceImpl;
    customerRepository = container.get<CustomerRepository>(CustomerRepository) as CustomerRepositoryImpl;
  });

  it('should be defined', () => {
    expect(customerRepository).toBeDefined();
    expect(customerRemoteDataSource).toBeDefined();
    expect(customerLocalDataSource).toBeDefined();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('when me is called and local data is present, it should return local data', async () => {
    const me = meGenerator.generateOne();
    jest.spyOn(customerLocalDataSource, 'me').mockResolvedValue(me);
    const response = await customerRepository.getMe();
    expect(response).toEqual(me);
    expect(customerLocalDataSource.me).toBeCalledTimes(1);
  });
  it('when local data is not present, it should call remote data source and return response. me is called with response value.', async () => {
    const me = meGenerator.generateOne();
    jest.spyOn(customerLocalDataSource, 'me').mockResolvedValue(null);
    jest.spyOn(customerRemoteDataSource, 'getMe').mockResolvedValue(me);
    const response = await customerRepository.getMe();
    expect(response).toEqual(me);
    expect(customerLocalDataSource.me).toBeCalledTimes(2);
    expect(customerRemoteDataSource.getMe).toBeCalledTimes(1);
    expect(customerLocalDataSource.me).toBeCalledWith(me);
  });
  it('when login is called, it should call remote data source and return response', async () => {
    const authResponse = authenticationResponseGenerator.generateOne();
    const request = {
      email: 'a@a.com', password: 'test',
    } as LoginRequest;
    jest.spyOn(customerRemoteDataSource, 'login').mockResolvedValue(authResponse);
    jest.spyOn(customerLocalDataSource, 'me').mockResolvedValue(null);
    const response = await customerRepository.login(request);
    expect(response).toEqual(authResponse);
    expect(customerRemoteDataSource.login).toBeCalledTimes(1);
    expect(customerRemoteDataSource.login).toBeCalledWith(request);
    expect(customerLocalDataSource.me).toBeCalledTimes(1);
    expect(customerLocalDataSource.me).toBeCalledWith(authResponse.profile);
  });
  it('when signup is called, it should call remote data source and return response', async () => {
    const authResponse = authenticationResponseGenerator.generateOne();
    const request = {
      email: 'a@a.com', password: 'test', first_name: 'test', last_name: 'testLast',
    } as SignupRequest;
    jest.spyOn(customerRemoteDataSource, 'signup').mockResolvedValue(authResponse);
    const response = await customerRepository.signup(request);
    expect(response).toEqual(authResponse);
    expect(customerRemoteDataSource.signup).toBeCalledTimes(1);
    expect(customerRemoteDataSource.signup).toBeCalledWith(request);
    expect(customerLocalDataSource.me).toBeCalledTimes(1);
    expect(customerLocalDataSource.me).toBeCalledWith(authResponse.profile);
  });
  it('when upcomingAppointments is called, it should call local data source and remote data source. If local data is not empty array, it should return local data.Then call localDataRepository with remote data', async () => {
    const request = {
      offset: 0, limit: 10,
    };
    const localAppointments = appointmentGenerator.generateMany(5);
    const localResponse = {
      next: null, previous: null, count: 5, results:localAppointments.sort((a, b) => a.id - b.id)
    };
    const remoteAppointments = appointmentGenerator.generateMany(5);
    const remoteResponse = {
      next: null, previous: null, count: 5, results:remoteAppointments,
    };
    jest.spyOn(customerLocalDataSource, 'upcomingAppointments').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'upcomingAppointments').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addAppointments');

    const response = await customerRepository.upcomingAppointments(request);
    expect(response).toEqual(localResponse);
    expect(customerLocalDataSource.upcomingAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.upcomingAppointments).toBeCalledWith(request);
    expect(customerRemoteDataSource.upcomingAppointments).toBeCalledTimes(1);
    expect(customerRemoteDataSource.upcomingAppointments).toBeCalledWith(request);
    expect(customerLocalDataSource.addAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.addAppointments).toBeCalledWith(remoteAppointments);
  });
  it('when upcomingAppointments is called, it should call local data source and remote data source. If local data is empty array, it should return remote data', async () => {
    const request = {
      offset: 0, limit: 10,
    };
    const localResponse = {
      next: null, previous: null, count: 0, results:[],
    };
    const remoteAppointments = appointmentGenerator.generateMany(5);
    const remoteResponse = {
      next: null, previous: null, count: 5, results:remoteAppointments,
    };
    jest.spyOn(customerLocalDataSource, 'upcomingAppointments').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'upcomingAppointments').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addAppointments');

    const response = await customerRepository.upcomingAppointments(request);
    expect(response).toEqual(remoteResponse);
    expect(customerLocalDataSource.upcomingAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.upcomingAppointments).toBeCalledWith(request);
    expect(customerRemoteDataSource.upcomingAppointments).toBeCalledTimes(1);
    expect(customerRemoteDataSource.upcomingAppointments).toBeCalledWith(request);
    expect(customerLocalDataSource.addAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.addAppointments).toBeCalledWith(remoteAppointments);
  });
  it('when pastAppointments is called, it should call local data source and remote data source. If local data is not empty array, it should return local data.Then call localDataRepository with remote data', async () => {
    const request = {
      offset: 0, limit: 10,
    };
    const localAppointments = appointmentGenerator.generateMany(5);
    const localResponse = {
      next: null, previous: null, count: 5, results:localAppointments.sort((a, b) => a.id - b.id)
    };
    const remoteAppointments = appointmentGenerator.generateMany(5);
    const remoteResponse = {
      next: null, previous: null, count: 5, results:remoteAppointments,
    };
    jest.spyOn(customerLocalDataSource, 'pastAppointments').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'pastAppointments').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addAppointments');

    const response = await customerRepository.pastAppointments(request);
    expect(response).toEqual(localResponse);
    expect(customerLocalDataSource.pastAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.pastAppointments).toBeCalledWith(request);
    expect(customerRemoteDataSource.pastAppointments).toBeCalledTimes(1);
    expect(customerRemoteDataSource.pastAppointments).toBeCalledWith(request);
    expect(customerLocalDataSource.addAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.addAppointments).toBeCalledWith(remoteAppointments);
  });
  it('when pastAppointments is called, it should call local data source and remote data source. If local data is empty array, it should return remote data', async () => {
    const request = {
      offset: 0, limit: 10,
    };
    const localResponse = {
      next: null, previous: null, count: 0, results:[],
    };
    const remoteAppointments = appointmentGenerator.generateMany(5);
    const remoteResponse = {
      next: null, previous: null, count: 5, results:remoteAppointments,
    };
    jest.spyOn(customerLocalDataSource, 'pastAppointments').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'pastAppointments').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addAppointments');

    const response = await customerRepository.pastAppointments(request);
    expect(response).toEqual(remoteResponse);
    expect(customerLocalDataSource.pastAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.pastAppointments).toBeCalledWith(request);
    expect(customerRemoteDataSource.pastAppointments).toBeCalledTimes(1);
    expect(customerRemoteDataSource.pastAppointments).toBeCalledWith(request);
    expect(customerLocalDataSource.addAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.addAppointments).toBeCalledWith(remoteAppointments);
  });
  it('when allAppointments is called, it should call local data source and remote data source. If local data is not empty array, it should return local data.Then call localDataRepository with remote data', async () => {
    const request = {
      offset: 0, limit: 10,
    };
    const localAppointments = appointmentGenerator.generateMany(5);
    const localResponse = {
      next: null, previous: null, count: 5, results:localAppointments.sort((a, b) => a.id - b.id)
    };
    const remoteAppointments = appointmentGenerator.generateMany(5);
    const remoteResponse = {
      next: null, previous: null, count: 5, results:remoteAppointments,
    };
    jest.spyOn(customerLocalDataSource, 'allAppointments').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'allAppointments').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addAppointments');

    const response = await customerRepository.allAppointments(request);
    expect(response).toEqual(localResponse);
    expect(customerLocalDataSource.allAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.allAppointments).toBeCalledWith(request);
    expect(customerRemoteDataSource.allAppointments).toBeCalledTimes(1);
    expect(customerRemoteDataSource.allAppointments).toBeCalledWith(request);
    expect(customerLocalDataSource.addAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.addAppointments).toBeCalledWith(remoteAppointments);
  });
  it('when allAppointments is called, it should call local data source and remote data source. If local data is empty array, it should return remote data', async () => {
    const request = {
      offset: 0, limit: 10,
    };
    const localResponse = {
      next: null, previous: null, count: 0, results:[],
    };
    const remoteAppointments = appointmentGenerator.generateMany(5);
    const remoteResponse = {
      next: null, previous: null, count: 5, results:remoteAppointments,
    };
    jest.spyOn(customerLocalDataSource, 'allAppointments').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'allAppointments').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addAppointments');

    const response = await customerRepository.allAppointments(request);
    expect(response).toEqual(remoteResponse);
    expect(customerLocalDataSource.allAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.allAppointments).toBeCalledWith(request);
    expect(customerRemoteDataSource.allAppointments).toBeCalledTimes(1);
    expect(customerRemoteDataSource.allAppointments).toBeCalledWith(request);
    expect(customerLocalDataSource.addAppointments).toBeCalledTimes(1);
    expect(customerLocalDataSource.addAppointments).toBeCalledWith(remoteAppointments);
  });
  it('when createPet is called, it should call remote data source with create pet request and call local remote data source with pet entity response.', async () => {
    const request = {
      name: 'name',
      weight:16,
      age:5,
      breed: 'breed',
      gender:"Male",

    } as CreatePetRequest;
    const pet = petDetailsGenerator.generateOne();
    jest.spyOn(customerRemoteDataSource, 'createPet').mockResolvedValue(pet);
    jest.spyOn(customerLocalDataSource, 'createPet');
    await customerRepository.createPet(request);
    expect(customerRemoteDataSource.createPet).toBeCalledTimes(1);
    expect(customerRemoteDataSource.createPet).toBeCalledWith(request);
    expect(customerLocalDataSource.createPet).toBeCalledTimes(1);
    expect(customerLocalDataSource.createPet).toBeCalledWith(pet);
  });
  it('when allPets is called, it should call local data source and remote data source. If local data is not empty array, it should return local data.Then call localDataRepository with remote data', async () => {
    const localResponse = petDetailsGenerator.generateMany(5);
    const remoteResponse = petDetailsGenerator.generateMany(5);
    jest.spyOn(customerLocalDataSource, 'allPets').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'allPets').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addPets');

    const response = await customerRepository.allPets();
    expect(response).toEqual(localResponse);
    expect(customerLocalDataSource.allPets).toBeCalledTimes(1);
    expect(customerRemoteDataSource.allPets).toBeCalledTimes(1);
    expect(customerLocalDataSource.addPets).toBeCalledTimes(1);
    expect(customerLocalDataSource.addPets).toBeCalledWith(remoteResponse);
    expect(response).toEqual(localResponse.sort((a, b) => a.id - b.id));
  });
  it('when allPets is called, it should call local data source and remote data source. If local data is empty array, it should return remote data', async () => {
    const localResponse = [] as PetDetailsEntity[];
    const remoteResponse = petDetailsGenerator.generateMany(5);
    jest.spyOn(customerLocalDataSource, 'allPets').mockResolvedValue(localResponse);
    jest.spyOn(customerRemoteDataSource, 'allPets').mockResolvedValue(remoteResponse);
    jest.spyOn(customerLocalDataSource, 'addPets');

    const response = await customerRepository.allPets();
    expect(response).toEqual(remoteResponse);
    expect(customerLocalDataSource.allPets).toBeCalledTimes(1);
    expect(customerRemoteDataSource.allPets).toBeCalledTimes(1);
    expect(customerLocalDataSource.addPets).toBeCalledTimes(1);
    expect(customerLocalDataSource.addPets).toBeCalledWith(remoteResponse);
    expect(response).toEqual(remoteResponse.sort((a, b) => a.id - b.id));

  });


});
