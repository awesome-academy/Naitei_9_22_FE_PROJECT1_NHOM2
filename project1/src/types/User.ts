export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
  website?: string;
}
