import { Order } from "@/types/Order";
import AxiosCustom from "./AxiosCustom";

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await AxiosCustom.get("/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (orderId: string): Promise<Order> => {
  try {
    const response = await AxiosCustom.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData: Order): Promise<Order> => {
  try {
    const response = await AxiosCustom.post("orders/newOrder", orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await AxiosCustom.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<Order> => {
  try {
    const response = await AxiosCustom.patch(`/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

