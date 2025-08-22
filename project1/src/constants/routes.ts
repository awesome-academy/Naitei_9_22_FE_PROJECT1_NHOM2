export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  COMPLETE_PROFILE: "/complete-profile",
  FORGOT_PASSWORD: "/forgot-password",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDER_HISTORY: "/profile/orders",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  CATEGORY: "/products/category/:category",
  // Protected routes
  ADMIN: "/admin",
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = typeof ROUTES[RouteKeys]; 


