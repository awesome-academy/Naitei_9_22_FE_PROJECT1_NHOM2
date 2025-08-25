import { Order } from "@/types/Order";

// Gán màu cho trạng thái đơn hàng
export const statusColorMap: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-orange-100 text-orange-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export const getStatusColor = (status: string) => {
  return statusColorMap[status] || "bg-gray-100 text-gray-800";
};

// Tên hiển thị trạng thái
export const statusTextMap: Record<string, string> = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipped: "Đã giao hàng",
  delivered: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const getStatusText = (status: string) => {
  return statusTextMap[status] || status;
};

// Logic trạng thái tiếp theo
export const getNextStatus = (currentStatus: string): string | null => {
  const statusFlow = {
    pending: "processing",
    processing: "shipped",
    shipped: "delivered",
    delivered: null, // Không có trạng thái tiếp theo
    cancelled: null, // Không thể thay đổi từ cancelled
  };
  return statusFlow[currentStatus as keyof typeof statusFlow] || null;
};

// Tính tổng số lượng sản phẩm trong đơn hàng
export const getTotalItems = (order: Order) => {
  return order.items.reduce((total: number, item) => total + item.quantity, 0);
};
