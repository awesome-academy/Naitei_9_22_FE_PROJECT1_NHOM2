export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDER_HISTORY: "/profile/orders",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  CATEGORY: "/products/category/:category",
  // Protected routes
 
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = typeof ROUTES[RouteKeys]; 


