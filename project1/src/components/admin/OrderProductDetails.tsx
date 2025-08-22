"use client";

import React from "react";
import { Order } from "@/types/Order";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

interface OrderProductDetailsProps {
  order: Order;
}

export default function OrderProductDetails({
  order,
}: OrderProductDetailsProps) {
  const calculateItemTotal = (item: Order["items"][0]) => {
    return Math.round(item.price * item.quantity);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Chi tiết sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 border rounded-lg bg-gray-50"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "/dataset/unavailable.JPG";
                }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {item.discount > 0 ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 line-through text-sm">
                          {formatCurrency(
                            item.price / (1 - item.discount / 100)
                          )}
                        </span>
                        <span className="text-red-600 font-bold text-lg">
                          {formatCurrency(item.price)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          -{item.discount}%
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-gray-900 font-bold text-lg">
                        {formatCurrency(item.price)}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Số lượng</div>
                    <div className="text-lg font-semibold">{item.quantity}</div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Thành tiền:</span>
                    <span className="text-blue-600 font-bold text-lg">
                      {formatCurrency(calculateItemTotal(item))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
