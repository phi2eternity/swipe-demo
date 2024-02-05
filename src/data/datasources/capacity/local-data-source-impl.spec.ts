import { CapacityLocalDataSourceImpl } from '@data/datasources/capacity/local-data-source-impl';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { CapacityDetails } from '@domain/types/common/capacity-details';
import { CapacityLocalDataSource } from '@data/datasources/capacity/local-data-source';

describe('CapacityLocalDataSourceImpl', () => {

  let container: Container;
  let capacityLocalDataSource: CapacityLocalDataSourceImpl;

  beforeAll(() => {
    container = getTestContainer();
    capacityLocalDataSource = container.get(CapacityLocalDataSource) as CapacityLocalDataSourceImpl;
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be defined', () => {
    expect(CapacityLocalDataSourceImpl).toBeDefined();
  });

  it('should be initialized', () => {
    expect(capacityLocalDataSource).toBeDefined();
  });

  it('should get null when storage is empty.', () => {
    expect(capacityLocalDataSource.getMonthlyCapacity('2021-01')).toBeNull();
  });

  it('should be able to set and get capacity', () => {
    const capacity = [
      {
        morning_capacity: 1,
        afternoon_capacity:1,
        date: '2021-01-01',
      },
      {
        morning_capacity: 1,
        afternoon_capacity:1,
        date: '2021-01-02',
      },
    ] as CapacityDetails[];
    capacityLocalDataSource.setMonthlyCapacity('2021-01', capacity);
    expect(capacityLocalDataSource.getMonthlyCapacity('2021-01')).toEqual(capacity);

    expect(capacityLocalDataSource.getMonthlyCapacity('2021-02')).toBeNull();
  });
});
