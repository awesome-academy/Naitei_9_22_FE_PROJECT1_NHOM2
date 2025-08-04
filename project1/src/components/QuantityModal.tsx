"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { Product, formatCurrentPrice, getCurrentPrice } from "../types/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function QuantityModal({
  isOpen,
  onClose,
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}: QuantityModalProps) {
  const { name, images } = product;

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      onQuantityChange(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn số lượng</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center gap-4 py-4">
          <Image
            src={images[0]}
            alt={name}
            width={80}
            height={80}
            className="rounded object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-sm">{name}</p>
            <p className="text-red-600 font-semibold">
              {formatCurrentPrice(product)} đ
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <FaMinus className="h-4 w-4" />
          </Button>
          
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-20 text-center"
          />
          
          <Button
            variant="outline"
            size="icon"
            onClick={increaseQuantity}
          >
            <FaPlus className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center py-2">
          <p className="text-lg font-semibold">
            Tổng: {(getCurrentPrice(product) * quantity).toLocaleString()} đ
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={onAddToCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

