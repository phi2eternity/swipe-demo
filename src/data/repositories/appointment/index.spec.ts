import { AppointmentRepositoryImpl } from '@data/repositories/appointment/index';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { AppointmentRemoteDataSourceImpl } from '@data/datasources/appointment/index.remote-impl';
import { AppointmentLocalDataSourceImpl } from '@data/datasources/appointment/index.local-impl';
import { AppointmentLocalDataSource } from '@data/datasources/appointment/index.local';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';


const appointmentGenerator = new AppointmentMockGenerator();

describe('AppointmentRepositoryImpl', () => {
  let appointmentRepositoryImpl: AppointmentRepositoryImpl;
  let appointmentRemoteDataSource: AppointmentRemoteDataSourceImpl;
  let appointmentLocalDataSource: AppointmentLocalDataSourceImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    appointmentRepositoryImpl = container.get(AppointmentRepository) as AppointmentRepositoryImpl;
    appointmentRemoteDataSource = container.get(AppointmentRemoteDataSource) as AppointmentRemoteDataSourceImpl;
    appointmentLocalDataSource = container.get(AppointmentLocalDataSource) as AppointmentLocalDataSourceImpl;
  });


  it('should be defined', () => {
    expect(appointmentRepositoryImpl).toBeDefined();
  });
  it('should call createAppointment for data sources.', async () => {
    const appointment = appointmentGenerator.generateOne();
    jest.spyOn(appointmentRemoteDataSource, 'createAppointment').mockResolvedValue(appointment);
    jest.spyOn(appointmentLocalDataSource, 'createAppointment');

    const request = {
      pet: 1,
      start: "2021-01-01T00:00:00.000Z",
      branch: 1,
      employee: 1,
      customer_notes: "test",
      products: [1],
      service: "test"
    } as CreateAppointmentRequest;

    const result = await appointmentRepositoryImpl.createAppointment( request );
    expect(result).toEqual(appointment);

    expect(appointmentRemoteDataSource.createAppointment).toBeCalled();
    expect(appointmentRemoteDataSource.createAppointment).toHaveBeenCalledWith(request);
    expect(appointmentLocalDataSource.createAppointment).toBeCalled();
    expect(appointmentLocalDataSource.createAppointment).toHaveBeenCalledWith(appointment);
  });

  it('should call cancelAppointment for data sources.', async () => {
    jest.spyOn(appointmentRemoteDataSource, 'cancelAppointment').mockResolvedValue(true);
    jest.spyOn(appointmentLocalDataSource, 'cancelAppointment');

    const result = await appointmentRepositoryImpl.cancelAppointment(1);
    expect(result).toEqual(true);

    expect(appointmentRemoteDataSource.cancelAppointment).toBeCalled();
    expect(appointmentRemoteDataSource.cancelAppointment).toHaveBeenCalledWith(1);
    expect(appointmentLocalDataSource.cancelAppointment).toBeCalled();
    expect(appointmentLocalDataSource.cancelAppointment).toHaveBeenCalledWith(1);
  });


});
