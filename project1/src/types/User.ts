export interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  website: string;
  address?: string;
  password: string;
  role: string;
}
