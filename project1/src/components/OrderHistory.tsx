"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, MapPin, Phone, Mail, Calendar, Package, Truck, CheckCircle } from "lucide-react";
import { Order } from "@/types/Order";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  const router = useRouter();
  const orderStatusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: <Package className="w-4 h-4" />
    },
    processing: {
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: <Package className="w-4 h-4" />
    },
    shipped: {
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: <Truck className="w-4 h-4" />
    },
    delivered: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: <CheckCircle className="w-4 h-4" />
    },
    cancelled: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: <Package className="w-4 h-4" />
    }
  };

  const getOrderStatusColor = (status: string) => {
    return orderStatusConfig[status.toLowerCase() as keyof typeof orderStatusConfig]?.color || 
           'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getOrderStatusIcon = (status: string) => {
    return orderStatusConfig[status.toLowerCase() as keyof typeof orderStatusConfig]?.icon || 
           <Package className="w-4 h-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Lịch sử mua hàng
        </CardTitle>
        <CardDescription>
          Xem tất cả đơn hàng của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-500 mb-6">Bạn chưa có đơn hàng nào trong lịch sử</p>
            <Button 
            onClick={() => router.push('/products')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Mua sắm ngay
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id} className="border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Đơn hàng #{order._id}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Chưa có ngày'}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getOrderStatusColor(order.status)} flex items-center gap-1`}
                    >
                      {getOrderStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{order.shippingAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{order.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{order.email}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Sản phẩm đã mua:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Image src={item.image_url} alt={item.name} width={48} height={48} />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.price.toLocaleString('vi-VN')} Đ</p>
                          <p className="text-sm text-gray-500">
                            {item.discount > 0 && `-${item.discount}%`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Phương thức thanh toán: {order.paymentMethod}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tổng cộng:</p>
                      <p className="text-xl font-bold text-emerald-600">
                        {order.total.toLocaleString('vi-VN')} Đ
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

