export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

