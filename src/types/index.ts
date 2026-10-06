export type ProductCategory = 
  | 'POTTERY_CERAMICS' 
  | 'WOVEN_TEXTILES' 
  | 'LEATHER_BAGS' 
  | 'VINTAGE_UKAY' 
  | 'JEWELRY_ACCESSORIES' 
  | 'CANDLES_HOME' 
  | 'WOOD_RATTAN' 
  | 'PANTRY_COFFEE';

export type ProductCondition = 'BRAND_NEW_HANDMADE' | 'CURATED_VINTAGE' | 'GENTLY_LOVED_PRELOVED' | 'RESTORED_HEIRLOOM';

export interface ShopReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface SellerShop {
  id: string;
  name: string;
  handle: string;
  ownerName: string;
  avatar: string;
  bannerImage: string;
  location: string;
  region: string;
  bio: string;
  badge?: 'STAR_SELLER' | 'TOP_ARTISAN' | 'LOCAL_TREASURE';
  rating: number;
  reviewCount: number;
  salesCount: number;
  yearEstablished: number;
  processingTime: string;
  isFollowing?: boolean;
  previewProducts?: { id: string; image: string; title: string; price: number }[];
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  condition: ProductCondition;
  originLocation: string;
  shop: SellerShop;
  images: string[];
  description: string;
  materials: string[];
  dimensions?: string;
  processingDays: string;
  favoritesCount: number;
  isBestseller?: boolean;
  isEditorsPick?: boolean;
  freeShipping?: boolean;
  stock: number;
  tags: string[];
  reviews: ShopReview[];
  createdAt: string;
}

export interface CuratedCollection {
  id: string;
  title: string;
  subtitle: string;
  curator: string;
  coverImage: string;
  itemCount: number;
  tags: string[];
}

export interface YardSale {
  id: string;
  title: string;
  hostShop: string;
  location: string;
  city: string;
  dateString: string;
  itemCount: number;
  image: string;
  highlights: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  shippingOption: 'standard' | 'express' | 'pickup';
}

export type PageView = 'HOME' | 'EXPLORE' | 'TRENDING' | 'DEALS' | 'LOCAL' | 'COLLECTIONS' | 'STUDIO';
