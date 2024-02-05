export interface MeResponse {
  id: number;
  lifetime_tips: number;
  lifetime_product_sales: number;
  lifetime_service_sales: number;
  created_at: string;
  updated_at: string;
  name: string;
  uid?: string;
  email: string;
  phone: string;
  address?: string;
  role?: number;
  user?: number;
}
