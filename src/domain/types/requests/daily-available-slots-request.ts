export interface DailyAvailableSlotsRequest {
  employees?: number[];
  branches?: number[];
  service: string;
  date: string;
  duration?: number;
}
