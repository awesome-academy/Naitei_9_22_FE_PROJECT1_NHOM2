export interface OrderItem {
  product_id: number;
  name: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  discount: number;
  image: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  shipping_address: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

