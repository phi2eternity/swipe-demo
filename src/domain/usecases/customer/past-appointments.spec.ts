import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { CustomerGetPastAppointmentsUseCase } from '@domain/usecases/customer/past-appointments';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import mockAxios from 'jest-mock-axios';

describe('CustomerGetPastAppointmentsUseCase', () => {
  let useCase: CustomerGetPastAppointmentsUseCase;
  let container: Container;
  const appointmentMockGenerator = new AppointmentMockGenerator();
  beforeAll(()=>{
    container = getTestContainer();
    useCase = container.get(CustomerGetPastAppointmentsUseCase);
  })
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
    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/appointments/past', { params:request });

  });
});
