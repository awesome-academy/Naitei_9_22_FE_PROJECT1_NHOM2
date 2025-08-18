"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart } from "lucide-react";
import { getCurrentUser, logout } from "@/services/auth";
import { getOrderByUserId } from "@/services/OrderService";
import { updateUser } from "@/services/UserService";
import { Order } from "@/types/Order";
import { User as UserType } from "@/types/User";
import ProfileInfo from "@/components/ProfileInfo";
import OrderHistory from "@/components/OrderHistory";
import ProfileWishlist from "@/components/ProfileWishlist";
import { toast } from "react-toastify";
import { ProfileSkeleton } from "@/components/ui/skeletons";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const tabsConfig = [
  {
    value: "profile",
    label: "Thông tin cá nhân",
    icon: User,
  },
  {
    value: "orders", 
    label: "Lịch sử mua hàng",
    icon: ShoppingBag,
  },
  {
    value: "wishlist",
    label: "Yêu thích", 
    icon: Heart,
  },
];

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
        if (!currentUser) {
          setUser(null);
          return;
        }

        setUser(currentUser);

        const id = String(currentUser.id);
        const ordersData = await getOrderByUserId(id);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
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
      toast.success("Cập nhật thông tin thành công!");
    } catch {
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  const tabContentMap: Record<string, React.JSX.Element | null> = {
    profile: user ? (
      <ProfileInfo
        user={user}
        onLogout={handleLogout}
        onViewOrders={handleViewOrders}
        onUpdateProfile={handleUpdateProfile}
      />
    ) : null,
    orders: <OrderHistory orders={orders} />,
    wishlist: <ProfileWishlist />,
  };

  if (loading) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vui lòng đăng nhập
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để xem thông tin cá nhân
          </p>
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
          <h1 className="text-3xl font-bold text-emerald-500">
            Tài khoản của tôi
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin cá nhân và lịch sử mua hàng
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabsConfig.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-6">
              {tabContentMap[tab.value]}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

