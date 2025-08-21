import AxiosCustom from "./AxiosCustom";
import { setCookie, getCookie, removeCookie, COOKIE_NAMES } from "@/utils/cookies";
import { getUserById } from "./UserService";


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
    const response = await AxiosCustom.post('/auth/login', { 
      email, 
      password
    });
    
    const { token, success, userId } = response.data;
    
    if (token && success) {
      const cookieOptions = {
        expires: remember ? 7 : undefined, // 7 ngày nếu remember, session cookie nếu không
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const
      };
      
      // Lưu token vào cookie
      setCookie(COOKIE_NAMES.AUTH_TOKEN, token, cookieOptions);
      localStorage.setItem('userId', userId);
    }
    
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const register = async (userData: RegisterData) => {
  const { confirmPassword, ...requestData } = userData
  
  try {
    const response = await AxiosCustom.post('/auth/register', requestData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const logout = () => {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
  localStorage.removeItem('userId');
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

export const isAuthenticated = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN) !== null;
};


export const getAuthToken = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN);
};

export const getCurrentUser = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return null;
  const user = await getUserById(userId);
  return user;
};


export const loginWithGoogle = async (auth_token: string) => {
  try{
    const response = await AxiosCustom.post('/auth/google', { auth_token });
    const { token, success, userId } = response.data;
    if (token && success) {
      const cookieOptions = {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const
      };
      setCookie(COOKIE_NAMES.AUTH_TOKEN, token, cookieOptions);
      localStorage.setItem('userId', userId);
      }
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const loginWithFacebook = async (auth_token: string) => {
  try{
    const response = await AxiosCustom.post('/auth/facebook', { auth_token });
    const { token, success, userId } = response.data;
    if (token && success) {
      const cookieOptions = {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const
      };
      setCookie(COOKIE_NAMES.AUTH_TOKEN, token, cookieOptions);
      localStorage.setItem('userId', userId);
      }
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
