import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

describe('CreateAppointmentRequest', () => {
  it('should create an instance with employee.', () => {
    const request = {
      pet: 1, start: '2021-01-01T00:00:00.000Z', branch: 1, employee: 1, customer_notes: 'test',

    } as CreateAppointmentRequest;
    expect(request).toBeTruthy();
  });
  it('should create an instance without employee.', () => {
    const request = {
      pet: 1, start: '2021-01-01T00:00:00.000Z', branch: 1, customer_notes: 'test',

    } as CreateAppointmentRequest;
    expect(request).toBeTruthy();
  });
});
