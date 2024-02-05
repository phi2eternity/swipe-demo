export interface CreateAppointmentRequest {
  pet: number;
  start: string;
  branch: number;
  employee?: number;
  customer_notes?: string;
  products: number[];
  service: string;
}
