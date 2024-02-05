import { Container } from 'inversify';
import { AppointmentRepositoryImpl } from '@data/repositories/appointment';
import { CancelAppointmentUseCase } from '@domain/usecases/appointment/cancel-appointment';
import { getTestContainer } from '@utils/inversion-container-test';
import { AppointmentRepository } from '@domain/repositories/appointment';

describe('CancelAppointmentUseCase', () => {
  let useCase: CancelAppointmentUseCase;
  let repository: AppointmentRepositoryImpl;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(CancelAppointmentUseCase);
    repository = container.get(AppointmentRepository) as AppointmentRepositoryImpl;
  });
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should call cancelAppointment on the repository', async () => {
    const spy = jest.spyOn(repository, 'cancelAppointment');
    spy.mockResolvedValue(true);
    await useCase.call(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
