import axios from "axios";
import { setCookie, getCookie, removeCookie, COOKIE_NAMES } from "@/utils/cookies";


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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { 
      email, 
      password
    });
    
    const { token, success} = response.data;
    
    if (token && success) {
      const cookieOptions = {
        expires: remember ? 7 : undefined, // 7 ngày nếu remember, session cookie nếu không
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const
      };
      
      // Lưu token vào cookie
      setCookie(COOKIE_NAMES.AUTH_TOKEN, token, cookieOptions);
      
    }
    
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const register = async (userData: RegisterData) => {
  const { confirmPassword, ...requestData } = userData
  
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, requestData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const logout = () => {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
  removeCookie(COOKIE_NAMES.USER_INFO);
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export const isAuthenticated = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN) !== null;
};


export const getAuthToken = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN);
};

