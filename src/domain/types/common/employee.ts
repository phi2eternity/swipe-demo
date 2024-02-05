export interface EmployeeEntity {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  role: string;

}

export interface EmployeeFilter {
  role?: string;
}
