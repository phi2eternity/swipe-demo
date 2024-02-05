import { injectable } from 'inversify';
import { CapacityLocalDataSource } from '@data/datasources/capacity/local-data-source';
import { CapacityDetails } from '@domain/types/common/capacity-details';

@injectable()
export class CapacityLocalDataSourceImpl implements CapacityLocalDataSource{
  getMonthlyCapacity(monthKey: string): CapacityDetails[] | null {
    const result = sessionStorage.getItem("capacity__"+monthKey);
    if (result && result.length > 0) {
      return JSON.parse(result) as CapacityDetails[];
    } else {
      return null;
    }
  }
  setMonthlyCapacity(monthKey: string, monthlyCapacity: CapacityDetails[]): void {
    const result = JSON.stringify(monthlyCapacity)
    sessionStorage.setItem("capacity__"+monthKey, result);
  }
}
