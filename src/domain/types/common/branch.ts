export interface BranchEntity {
  id: number;
  name:string,
  description: string;
  address: string;
  phone?: string;
  email?: string | null;
  updatedAt?: string;
  createdAt?: string;
}
