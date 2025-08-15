export interface OrderItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  image: string;
}

export interface Order {
  _id: string;
  userId: number;
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

