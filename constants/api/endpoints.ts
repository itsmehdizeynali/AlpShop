const API_ENDPOINTS = {
  LAYOUT: "/layout",
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  PROFILE: "/profile",
  PRODUCTS: {
    BASE: "/products",
    SEARCH: "/products/search",
    DETAIL: (slug: string) => `/products/${slug}`,
    REVIEWS: (slug: string) => `/products/${slug}/reviews`,
    VARIANT: (slug: string) => `/products/${slug}/variant`,
  },
  CATEGORIES: "/categories",
  BRANDS: "/brands",
  CART: {
    BASE: "/cart",
    ITEM: (itemId: string) => `/cart/${itemId}`,
  },
  WISHLIST: {
    BASE: "/wishlist",
    ITEM: (productId: string) => `/wishlist/${productId}`,
  },
  ADDRESSES: {
    BASE: "/addresses",
    DETAIL: (id: string) => `/addresses/${id}`,
  },
  ORDERS: {
    BASE: "/orders",
    DETAIL: (id: string) => `/orders/${id}`,
    RETURN: (id: string) => `/orders/${id}/return`,
  },
  BLOG: {
    BASE: "/blog",
    CATEGORIES: "/blog/categories",
    DETAIL: (slug: string) => `/blog/${slug}`,
  },
  CONTACT: "/contact",
  SETTINGS: (key: string) => `/settings/${key}`,
};


export default API_ENDPOINTS;