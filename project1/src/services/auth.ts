import AxiosCustom from "./AxiosCustom";
import { setCookie, getCookie, removeCookie, COOKIE_NAMES } from "@/utils/cookies";
import { getUserById } from "./UserService";
import { User } from "@/types/User";

export interface RegisterData {
  fullName: string;
  phone: string;
  email: string;
  website: string;
  password: string;
  confirmPassword: string;
  receiveEmail: boolean;
}

export const login = async (email: string, password: string, remember: boolean = false) => {
  try {
    // Gọi API để lấy user theo email
    const response = await AxiosCustom.get<User[]>(`/users?email=${email}`);
    const users = response.data;

    // Kiểm tra user có tồn tại không
    if (!users || users.length === 0) {
      return {
        success: false,
        message: "Email không tồn tại"
      };
    }

    const user = users[0];

    // Kiểm tra password có khớp không
    if (user.password !== password) {
      return {
        success: false,
        message: "Mật khẩu không đúng"
      };
    }

    // Login thành công
    const cookieOptions = {
      expires: remember ? 7 : undefined, // 7 ngày nếu remember, session cookie nếu không
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const
    };
    
    // Tạo token đơn giản (trong thực tế nên sử dụng JWT)
    const token = `token_${user.id}_${Date.now()}`;
    
    // Lưu token và user info vào cookie
    setCookie(COOKIE_NAMES.AUTH_TOKEN, token, cookieOptions);
    
    // Lưu user info (không có password) vào cookie
    const { password: _, ...userWithoutPassword } = user;
    setCookie(COOKIE_NAMES.USER_INFO, JSON.stringify(userWithoutPassword), cookieOptions);
    
    // Lưu userId vào localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', user.id.toString());
    }

    return {
      success: true,
      token: token,
      userId: user.id,
      user: userWithoutPassword,
      message: "Đăng nhập thành công"
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      message: "Lỗi kết nối máy chủ"
    };
  }
};

export const register = async (userData: RegisterData) => {
  const { confirmPassword, ...requestData } = userData;
  
  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUsers = await AxiosCustom.get<User[]>(`/users?email=${requestData.email}`);
    
    if (existingUsers.data.length > 0) {
      return {
        success: false,
        message: "Email đã được sử dụng"
      };
    }

    // Tạo user mới
    const newUser: Omit<User, 'id'> = {
      ...requestData,
      image: "/images/default-avatar.jpg" // Default avatar
    };

    const response = await AxiosCustom.post<User>('/users', newUser);
    
    // Loại bỏ password khỏi response
    const { password: _, ...userWithoutPassword } = response.data;
    
    return {
      success: true,
      message: "Đăng ký thành công",
      data: userWithoutPassword
    };
  } catch (error: any) {
    console.error('Register error:', error);
    return {
      success: false,
      message: "Lỗi đăng ký tài khoản"
    };
  }
};

export const logout = () => {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
  removeCookie(COOKIE_NAMES.USER_INFO);
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  }
};

export const isAuthenticated = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN) !== null;
};

export const getAuthToken = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN);
};

export const getCurrentUser = async () => {
  try {
    // Thử lấy từ cookie trước
    const userInfo = getCookie(COOKIE_NAMES.USER_INFO);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    
    // Fallback: lấy từ API nếu có userId
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const user = await getUserById(userId);
        return user;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Kiểm tra user có quyền admin không
export const isAdmin = async () => {
  const user = await getCurrentUser();
  return user?.role === 'admin' || false;
};

// Cập nhật thông tin user
export const updateUserProfile = async (userId: number, userData: Partial<User>) => {
  try {
    const response = await AxiosCustom.patch<User>(`/users/${userId}`, userData);
    
    // Cập nhật cookie với thông tin mới
    const { password: _, ...userWithoutPassword } = response.data;
    setCookie(COOKIE_NAMES.USER_INFO, JSON.stringify(userWithoutPassword), {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const
    });
    
    return {
      success: true,
      message: "Cập nhật thông tin thành công",
      data: userWithoutPassword
    };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: "Lỗi cập nhật thông tin"
    };
  }
};

