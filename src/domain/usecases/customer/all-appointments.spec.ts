import { CustomerGetAllAppointmentsUseCase } from '@domain/usecases/customer/all-appointments';
import { getTestContainer } from '@utils/inversion-container-test';
import { Container } from 'inversify';
import mockAxios from 'jest-mock-axios';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';

const appointmentMockGenerator = new AppointmentMockGenerator();

describe('CustomerGetAllAppointmentsUseCase', () => {
  let customerGetAllAppointmentsUseCase: CustomerGetAllAppointmentsUseCase;
  let container : Container;

  beforeAll(() => {
    container = getTestContainer();
    customerGetAllAppointmentsUseCase = container.get<CustomerGetAllAppointmentsUseCase>(CustomerGetAllAppointmentsUseCase);

  });

  it('should be defined.',() => {
    expect(CustomerGetAllAppointmentsUseCase).toBeDefined();
  });

  it('should get all appointments.', async () => {
    expect(customerGetAllAppointmentsUseCase).toBeDefined();
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

    const response = await customerGetAllAppointmentsUseCase.call(request);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/customer/appointments/all', { params:request });

    expect(response.next).toEqual(null);
    expect(response.previous).toEqual(null);
    expect(response.results).toHaveLength(data.length);
  });

});
