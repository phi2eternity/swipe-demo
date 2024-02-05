import {injectable} from "inversify";
import {LocalDataSource} from "@data/datasources/local-data-source";
import { CapacityDetails } from '@domain/types/common/capacity-details';

@injectable()
export abstract class CapacityLocalDataSource extends LocalDataSource {
  // monthKey is YYYY-MM
  abstract getMonthlyCapacity(monthKey : string): CapacityDetails[] | null;

  abstract setMonthlyCapacity(monthKey: string, monthlyCapacity: CapacityDetails[]): void;
}

