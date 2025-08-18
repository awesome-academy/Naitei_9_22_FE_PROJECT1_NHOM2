"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/zustand/Zustand"; // import zustand store
import { useRouter } from "next/navigation";

interface CartActionsProps {
  onCancel?: () => void;
  onContinue?: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({ onCancel, onContinue }) => {
  const { clearCart } = useCartStore(); // lấy action từ zustand
  const router = useRouter();

  const handleCancel = () => {
    // Clear localStorage
    localStorage.removeItem("cart-storage");

    // Clear Zustand store cart state
    clearCart();
    router.push("/");

    // Call the original onCancel function if provided
    if (onCancel) {
      onCancel();
    }
  };

  const handleContinue = () => {
    // Navigate to home page
    router.push("/");

    // Call the original onContinue function if provided
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="flex gap-4 justify-end pt-8">
      <Button
        variant="outline"
        className="text-green-600 border-green-600 hover:bg-green-100"
        onClick={handleCancel}
      >
        HỦY ĐƠN HÀNG
      </Button>
      <Button
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={handleContinue}
      >
        TIẾP TỤC MUA
      </Button>
    </div>
  );
};

export default CartActions;

