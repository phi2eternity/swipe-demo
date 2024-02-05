import mockAxios from "jest-mock-axios";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {getTestContainer} from "@utils/inversion-container-test";
import {Container} from "inversify";
import {CustomerRemoteDataSourceImpl} from "@data/datasources/customer/remote-data-source-impl";
import { LoginRequest } from '@domain/types/requests/login';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import { SignupRequest } from '@domain/types/requests/signup';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';

describe('CustomerRemoteDataSourceImpl', () => {
  let customerRemoteDataSource: CustomerRemoteDataSource;
  let container: Container;

  const meGenerator = new MeMockGenerator();
  const authGenerator = new AuthenticationResponseMockGenerator();
  const appointmentMockGenerator = new AppointmentMockGenerator();
  const petDetailsMockGenerator = new PetDetailsMockGenerator();

  beforeAll(() => {
    container = getTestContainer();
    customerRemoteDataSource = container.get(CustomerRemoteDataSource);

  });

  beforeEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it('should fetch customers successfully', async () => {
    const data = meGenerator.generateOne() ;
    mockAxios.get.mockResolvedValue({data });

    const response = await customerRemoteDataSource.getMe();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/me', undefined);

    expect(response).toEqual(data);
  });

  it('should login successfully', async () => {
    const request = {
      email:"a@a.com",
      password:"123456",
    } as LoginRequest;

    const me = authGenerator.generateOne();
    mockAxios.post.mockResolvedValue({data: me });
    const response = await customerRemoteDataSource.login(request);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/customer/login', request, undefined);
    expect(response).toEqual(me);


  });

  it('should signup successfully', async () => {
    const request = {
      first_name:"a",
      last_name:"a",
      email:"a@a.com",
      password:"123456",
    } as SignupRequest;
    const me = authGenerator.generateOne();
    mockAxios.post.mockResolvedValue({data: me });
    const response = await customerRemoteDataSource.signup(request);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/customer/register', request, undefined);
    expect(response).toEqual(me);
  });

  it('should fetch upcoming appointments successfully', async () => {
    const data = appointmentMockGenerator.generateMany(20) ;
    const request = {
      offset:0,
      limit:20,
    };
    mockAxios.get.mockResolvedValue({data:{
      previous:null,
      next:null,
      results:data,
        count:20
      } });

    const response = await customerRemoteDataSource.upcomingAppointments(request);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/appointments/upcoming', { params:request });

    expect(response.next).toEqual(null);
    expect(response.previous).toEqual(null);
    expect(response.results).toHaveLength(data.length);
  });

  it('should fetch past appointments successfully', async () => {
    const data = appointmentMockGenerator.generateMany(20) ;
    const request = {
      offset:0,
      limit:20,
    };
    mockAxios.get.mockResolvedValue({data:{
        previous:null,
        next:null,
        results:data,
        count:20
      }});

    const response = await customerRemoteDataSource.pastAppointments(request);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/appointments/past', { params:request });

    expect(response.next).toEqual(null);
    expect(response.previous).toEqual(null);
    expect(response.results).toHaveLength(data.length);

  });

  it('should fetch all appointments successfully', async () => {
    const data = appointmentMockGenerator.generateMany(20) ;
    const request = {
      offset:0,
      limit:20,
    };
    mockAxios.get.mockResolvedValue({data:{
        previous:null,
        next:null,
        results:data,
        count:20,
      }});

    const response = await customerRemoteDataSource.allAppointments(request);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/appointments/all', { params:request });

    expect(response.next).toEqual(null);
    expect(response.previous).toEqual(null);
    expect(response.results).toHaveLength(data.length);
  });

  it('should fetch all dogs successfully.', async () => {
    const data = petDetailsMockGenerator.generateMany(20) ;
    mockAxios.get.mockResolvedValue({data });
    const response = await customerRemoteDataSource.allPets();
    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/pets/all', undefined);
    expect(response).toHaveLength(data.length);

  });

  it('should create dog successfully.', async () => {
    const data = petDetailsMockGenerator.generateOne();
    const request = {
      name:"a",
      breed:"a",
      gender:"Male",
      age:1,
      weight:1,
    } as CreatePetRequest;
    mockAxios.post.mockResolvedValue({data });
    const response = await customerRemoteDataSource.createPet(request);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/customer/pet/create', request, undefined);
    expect(response).toEqual(data);
  });

});
