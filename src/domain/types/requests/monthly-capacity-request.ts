export interface MonthlyCapacityRequest {
  employees?: number[];
  branches?: number[];
  service: string;
  date: string;
}
