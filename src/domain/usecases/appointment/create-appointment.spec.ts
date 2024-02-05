import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { CreateAppointmentUseCase } from '@domain/usecases/appointment/create-appointment';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { AppointmentRepositoryImpl } from '@data/repositories/appointment';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

const appointmentGenerator = new AppointmentMockGenerator();
const appointment = appointmentGenerator.generateOne();

describe('CreateAppointmentUseCase', () => {
  let useCase: CreateAppointmentUseCase;
  let repository: AppointmentRepositoryImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(CreateAppointmentUseCase);
    repository = container.get(AppointmentRepository) as AppointmentRepositoryImpl;
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should call createAppointment on the repository', async () => {
    // Spy on the repository method
    const params = {
      pet: 1, start: '2021-01-01T00:00:00.000Z', branch: 1, employee: 1, customer_notes: 'test',
    } as CreateAppointmentRequest;
    const spy = jest.spyOn(repository, 'createAppointment');
    spy.mockResolvedValue(appointment);
    await useCase.call(params);
    expect(spy).toHaveBeenCalledWith(params);

  });
});
