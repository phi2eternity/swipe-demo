import { CustomerGetUpcomingAppointmentsUseCase } from '@domain/usecases/customer/upcoming-appointments';
import { CustomerRepository } from '@domain/repositories/customer';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { CustomerRepositoryImpl } from '@data/repositories/customer';
import mockAxios from 'jest-mock-axios';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';

describe('CustomerGetUpcomingAppointmentsUseCase', () => {
  let useCase: CustomerGetUpcomingAppointmentsUseCase;
  let repository: CustomerRepositoryImpl;
  let container: Container;
  const appointmentMockGenerator = new AppointmentMockGenerator();
  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(CustomerGetUpcomingAppointmentsUseCase);
    repository = container.get(CustomerRepository) as CustomerRepositoryImpl ;


  });
  it('should be defined.', () => {
    expect(useCase).toBeDefined();
  });
  it('should call correct endpoint', async () => {
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
    await useCase.call(request);
    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/appointments/upcoming', { params:request });

  });

});
