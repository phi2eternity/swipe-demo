import { Container } from 'inversify';
import { AppointmentLocalDataSourceImpl } from '@data/datasources/appointment/index.local-impl';
import { AppointmentCacheProvider } from '@domain/types/TYPES';
import { getTestContainer } from '@utils/inversion-container-test';
import { AppointmentLocalDataSource } from '@data/datasources/appointment/index.local';
import { CacheProvider } from '@quicker/common/cache-provider';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';

describe('AppointmentLocalDataSourceImpl', () => {

  const appointmentGenerator = new AppointmentMockGenerator();


  let container : Container;
  let appointmentLocalDataSourceImpl: AppointmentLocalDataSourceImpl;
  let appointmentCacheProvider: CacheProvider<AppointmentEntity>;

  beforeAll(() => {
    container = getTestContainer();
    appointmentCacheProvider = container.get<CacheProvider<AppointmentEntity>>(AppointmentCacheProvider);
    appointmentLocalDataSourceImpl = container.get<AppointmentLocalDataSource>(AppointmentLocalDataSource) as AppointmentLocalDataSourceImpl;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should cancel appointment', async () => {
    jest.spyOn(appointmentCacheProvider, 'upsert');
    await appointmentLocalDataSourceImpl.cancelAppointment(1);
    expect(appointmentCacheProvider.upsert).toBeCalledWith({id: 1, status: "Cancelled"});
  });
  it('should create appointment', async () => {
    const appointment = appointmentGenerator.generateOne();
    jest.spyOn(appointmentCacheProvider, 'upsert');
    await appointmentLocalDataSourceImpl.createAppointment(appointment);
    expect(appointmentCacheProvider.upsert).toBeCalledWith(appointment);
  });
});
