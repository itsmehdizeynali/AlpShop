export type CommentType = {
  content: string;
  createdAt: string;
  id: string;
  parentId: null | string;
  postId?: string;
  user: {
    id: string;
    name: string;
    avatar: null | string;
  };
  userId: string;
  rating?: null | number;
  productId?: string;
} & {
  replies: CommentType[];
};

export interface ArticleType {
  author: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: null | string;
    backgroundColor: string;
    textColor: string;
  };
  categoryId: string;
  content: string;
  createdAt: string;
  excerpt: string;
  id: string;
  image: string;
  readTime: number;
  slug: string;
  tags: { id: string; name: string }[];
  title: string;
  updatedAt: string;
  _count: { comments: number };
}

export interface ArticleDetailsType {
  author: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: null | string;
    backgroundColor: string;
    textColor: string;
  };
  comments: CommentType[] | [];
  categoryId: string;
  content: string;
  createdAt: string;
  excerpt: string;
  id: string;
  image: string;
  readTime: number;
  slug: string;
  tags: { id: string; name: string; slug: string }[] | "";
  title: string;
  updatedAt: string;
}

export interface ProductType {
  brand: { id: string; name: string; slug: string; logo: null | string };
  cartQuantity: number;
  brandId: string;
  category: {
    backgroundColor: string;
    id: string;
    image: null | string;
    name: string;
    parentId: null | string;
    slug: string;
    textColor: string;
  };
  categoryId: string;
  createdAt: string;
  description: string;
  discount: number;
  id: string;
  images: {
    altText: string;
    id: string;
    position: number;
    productId: string;
    url: string;
  }[];
  isActive: boolean;
  isFeatured: boolean;
  isInCart: boolean;
  isWishlisted: boolean;
  name: string;
  price: number;
  realPrice: number;
  rate: { rate: number; users: number };
  slug: string;
  stock: number;
  updatedAt: string;
}

export interface ProductDetailType {
  brand: {
    id: string;
    name: string;
    slug: string;
    logo: null;
  };
  brandId: string;
  cartQuantity: number;
  category: {
    backgroundColor: string;
    id: string;
    image: null | string;
    name: string;
    parentId: null | string;
    slug: string;
    textColor: string;
  };
  categoryId: string;
  createdAt: "2026-09-28T10:16:45.532Z";
  description: string;
  discount: number;
  id: string;
  images: {
    altText: string;
    id: string;
    position: number;
    productId: string;
    url: string;
  }[];
  isActive: boolean;
  isFeatured: boolean;
  isInCart: boolean;
  isWishlisted: boolean;
  name: string;
  price: number;
  rate: { rate: number; users: number };
  realPrice: number;
  reviews:
    | {
        id: string;
        productId: string;
        userId: string;
        rating: number;
        comment: string;
        createdAt: string;
        user: {
          id: string;
          name: string;
          avatar: null | string;
        };
      }[]
    | [];
  slug: string;
  specs: {
    id: string;
    label: string;
    position: number;
    productId: string;
    value: string;
  }[];
  stock: number;
  updatedAt: string;
  variantGroups: {
    items: string[] & { name: string; hex: string }[];
    title: string;
  }[];
  variants: {
    color: null | string;
    id: string;
    priceDiff: 0;
    productId: string;
    size: null | string;
    stock: number;
  }[];
  tags:
    | {
        id: string;
        name: string;
        slug: string;
      }[]
    | [];
  comments: [];
}

export interface PaginationType {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ProductsDataType {
  products: ProductType[];
  pagination: PaginationType;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface CategoryItemType {
  id: string;
  image: null | string;
  name: string;
  parentId: null | string;
  slug: string;
  _count: { products: number };
  children?: {
    id: string;
    image: null | string;
    name: string;
    parentId: null | string;
    slug: string;
    _count: { products: number };
    href: string;
  }[];
}

export interface BlogCategoryItemType {
  backgroundColor: string;
  icon: null | string;
  id: string;
  name: string;
  slug: string;
  textColor: string;
  _count: { posts: number };
}

export interface BrandType {
  id: string;
  logo: null | string;
  name: string;
  slug: string;
}

export interface statsDataType {
  returnRequests: number;
  totalOrders: number;
  totalSpent: number;
  wishlistItems: number;
}

export interface orderType {
  addressId: string;
  createdAt: string;
  discount: number;
  id: string;
  items: {
    id: string;
    orderId: string;
    price: number;
    product: ProductType;
    productId: string;
    quantity: number;
    variantId: null | string;
  }[];
  orderNumber: string;
  shippingCost: number;
  status: "DELIVERED";
  subtotal: number;
  total: number;
  updatedAt: string;
  userId: string;
};
