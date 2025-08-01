"use client";

import { JSX, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { createOrder } from "@/services/OrderService";
import StepProcess from "./StepProcess";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

interface CartSummaryProps {
  cart: CartItem[];
}

const TAX_RATE = 0.1;

const steps = ["Thông tin giỏ hàng", "Thông tin thanh toán", "Xác nhận"];

// Component render row trong bảng
const SummaryRow = ({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) => (
  <TableRow
    className={isTotal ? "bg-green-600 text-white hover:bg-green-600" : ""}
  >
    <TableCell
      className={`border-e border-b font-bold text-left uppercase ${
        isTotal ? "text-lg md:text-xl" : "text-green-600"
      }`}
    >
      {label}
    </TableCell>
    <TableCell
      className={`border-b font-bold text-right uppercase ${
        isTotal ? "text-lg md:text-xl" : "text-green-600"
      }`}
    >
      {value}
    </TableCell>
  </TableRow>
);

// Component render bảng tổng tiền
const SummaryTable = ({
  totalBeforeTax,
  tax,
  totalAfterTax,
}: {
  totalBeforeTax: number;
  tax: number;
  totalAfterTax: number;
}) => (
  <Table className="w-full border border-gray-300">
    <TableBody>
      <SummaryRow
        label="Tổng tiền (Chưa thuế)"
        value={formatCurrency(totalBeforeTax)}
      />
      <SummaryRow label="Thuế (VAT 10%)" value={formatCurrency(tax)} />
      <SummaryRow
        label="Tổng thanh toán"
        value={formatCurrency(totalAfterTax)}
        isTotal
      />
    </TableBody>
  </Table>
);

const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [step, setStep] = useState<number>(-1);

  const totalBeforeTax = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const tax = useMemo(() => totalBeforeTax * TAX_RATE, [totalBeforeTax]);
  const totalAfterTax = useMemo(
    () => totalBeforeTax + tax,
    [totalBeforeTax, tax]
  );

  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const validatePaymentInfo = () => {
    if (!paymentInfo.name.trim()) return "Vui lòng nhập họ tên.";
    if (!paymentInfo.address.trim()) return "Vui lòng nhập địa chỉ.";
    if (!paymentInfo.phone.trim()) return "Vui lòng nhập số điện thoại.";
    if (!/^\d{9,11}$/.test(paymentInfo.phone.trim()))
      return "Số điện thoại không hợp lệ.";
    return null;
  };

  const handleBack = () => setStep(step === 2 ? 1 : -1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const handleCheckout = () => {
    if (step === -1) {
      setStep(1);
      setPaymentError(null);
    } else if (step === 1) {
      const error = validatePaymentInfo();
      if (error) {
        setPaymentError(error);
        return;
      }
      setPaymentError(null);
      setStep(2);
    } else if (step === 2) {
      // Đảm bảo đúng tên thuộc tính 'payMentInfo' theo type Order
      const paidOrder = {
        cart,
        payMentInfo: paymentInfo,
        total: totalAfterTax,
        paidAt: new Date().toISOString(),
      };
      createOrder(paidOrder);

      // Xóa giỏ hàng trong localStorage và Redux store
      localStorage.removeItem("cart");
      dispatch(clearCart());

      // Hiển thị toast success và chuyển về trang chủ
      toast.success("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
      router.push('/');
    }
  };

  const renderInputField = (
    label: string,
    name: keyof typeof paymentInfo,
    placeholder: string
  ) => (
    <div>
      <Label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </Label>
      <Input
        type="text"
        id={name}
        name={name}
        value={paymentInfo[name]}
        onChange={handleInputChange}
        className="w-full"
        placeholder={placeholder}
      />
    </div>
  );

  const inputFields = [
    { label: "Họ tên", name: "name", placeholder: "Nhập họ tên" },
    { label: "Địa chỉ", name: "address", placeholder: "Nhập địa chỉ giao hàng" },
    { label: "Số điện thoại", name: "phone", placeholder: "Nhập số điện thoại" },
  ];

  const confirmationFields = [
    { label: "Họ tên", value: paymentInfo.name },
    { label: "Địa chỉ", value: paymentInfo.address },
    { label: "Số điện thoại", value: paymentInfo.phone },
    { label: "Tổng thanh toán", value: formatCurrency(totalAfterTax) },
  ];

  const renderStepContent = () => {
    const stepContent: Record<number, JSX.Element> = {
      0: (
        <SummaryTable
          totalBeforeTax={totalBeforeTax}
          tax={tax}
          totalAfterTax={totalAfterTax}
        />
      ),
      1: (
        <div className="space-y-4">
          {paymentError && (
            <div className="text-red-600 text-sm font-medium">
              {paymentError}
            </div>
          )}
          {inputFields.map((field) =>
            renderInputField(
              field.label,
              field.name as keyof typeof paymentInfo,
              field.placeholder
            )
          )}
        </div>
      ),
      2: (
        <div className="space-y-4">
          <div className="text-green-700 font-semibold text-lg">
            Xác nhận đơn hàng
          </div>
          {confirmationFields.map((item) => (
            <div key={item.label}>
              <span className="font-medium">{item.label}:</span> {item.value}
            </div>
          ))}
        </div>
      ),
    };
    return stepContent[step] ?? null;
  };

  return (
    <div className="mt-6 flex justify-end w-full overflow-visible">
      <div className="w-[350px] md:w-[420px]">
        {step === -1 ? (
          <>
            <SummaryTable
              totalBeforeTax={totalBeforeTax}
              tax={tax}
              totalAfterTax={totalAfterTax}
            />
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleCheckout}
                className="w-45 h-12 rounded-3xl bg-green-600 hover:bg-green-700"
              >
                THANH TOÁN
              </Button>
            </div>
          </>
        ) : (
          <>
            <StepProcess steps={steps} step={step} />
            <div className="mb-4">{renderStepContent()}</div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={handleBack}
                className="w-28 h-12 rounded-3xl bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Quay lại
              </Button>
              <Button
                onClick={handleCheckout}
                className="w-45 h-12 rounded-3xl bg-green-600 hover:bg-green-700"
              >
                {step === steps.length - 1 ? "XÁC NHẬN" : "TIẾP TỤC"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;

