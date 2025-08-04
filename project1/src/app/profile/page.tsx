"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag } from "lucide-react";
import { getCurrentUser, logout } from "@/services/auth";
import { getOrders } from "@/services/OrderService";
import { updateUser } from "@/services/UserService";
import { Order } from "@/types/Order";
import { User as UserType } from "@/types/User";
import ProfileInfo from "@/components/ProfileInfo";
import OrderHistory from "@/components/OrderHistory";
import { toast } from "react-toastify";
import { ProfileSkeleton } from "@/components/ui/skeletons";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        // Fetch orders
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const handleViewOrders = () => {
    setActiveTab("orders");
  };

  const handleUpdateProfile = async (updatedUser: Partial<UserType>) => {
    try {
      if (!user) return;
      
      const updatedUserData = await updateUser(user.id.toString(), updatedUser);
      
      setUser(updatedUserData);
      toast.success('Cập nhật thông tin thành công!');
      
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại');
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
          <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem thông tin cá nhân</p>
          <Button 
          onClick={() => router.push(ROUTES.LOGIN)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-500">Tài khoản của tôi</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và lịch sử mua hàng</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Lịch sử mua hàng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileInfo 
              user={user} 
              onLogout={handleLogout} 
              onViewOrders={handleViewOrders}
              onUpdateProfile={handleUpdateProfile}
            />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderHistory orders={orders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 


