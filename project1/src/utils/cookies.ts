export interface CookieOptions {
  expires?: number; 
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

export const setCookie = (
  name: string, 
  value: string, 
  options: CookieOptions = {}
): void => {
  const {
    expires = 7, 
    httpOnly = false,
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'lax',
    path = '/'
  } = options;

  let cookieString = `${name}=${value}; path=${path}; SameSite=${sameSite}`;

  if (expires && expires > 0) {
    const date = new Date();
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }
  // Nếu không có expires, cookie sẽ là session cookie (tự động xóa khi đóng browser)

  if (secure) {
    cookieString += '; Secure';
  }

  document.cookie = cookieString;
};


export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
};


export const removeCookie = (name: string, path: string = '/'): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
};


export const isAuthenticated = (): boolean => {
  return getCookie('auth_token') !== null;
};


export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info'
} as const; 


