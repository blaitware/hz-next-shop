import { QueryKey } from 'react-query';

export type CategoriesQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type?: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  shop_id?: number;
};

export type ShopsQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  is_active?: number;
};
export type OrdersQueryOptionsType = {
  tracking_number?: string;
  orderBy?: string;
  sortedBy?: string;
  customer_id?: number;
  shop_id?: number;
  first?: number;
  page?: number;
  userId?: string;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
  userId?: string;
};
export type Banner = {
  title: string;
  description: string;
  image: string;
};
export declare type Type = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  banners: Banner[];
  promotional_sliders: any[];
  settings: {
    isHome: boolean;
    layoutType: string;
    productCard: string;
  };
  // products?: Maybe<ProductPaginator>;
  createdAt: Date;
  updatedAt: Date;
};
export declare type Coupon = {
  _id: string;
  code: string;
  description: string;
  // orders: Order[];
  type: string;
  image: string;
  amount: number;
  active_from: Date;
  expire_at: Date;
  createdAt: Date;
  updatedAt: Date;
};
export declare type Category = {
  _id: string;
  name: string;
  slug: string;
  parent?: number;
  children: Category[];
  details?: string;
  image?: string;
  icon?: string;
  type: Type;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
};
export declare type Attachment = {
  _id?: string;
  thumbnail?: string;
  original?: string;
};
export declare type AttributeValue = {
  _id: string;
};
export declare type Variation = {
  _id: string;
  options?: any;
};
export declare type Product = {
  _id?: string;
  name?: string;
  slug?: string;
  type?: Type;
  categories?: Category[];
  variations: AttributeValue[];
  variation_options: Variation[];
  // pivot?: OrderProductPivot
  // orders: Order[]
  shop?: any;
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: string[];
  image?: string;
  // status?: ProductStatus
  height?: string;
  length?: string;
  width?: string;
  price?: number;
  min_price?: number;
  max_price?: number;
  related_products?: Product[];
  quantity?: number;
  unit?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export declare type UserAddress = {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export declare type Order = {
  _id: string;
  tracking_number: string;
  customer_id: string;
  // customer?: Maybe<User>;
  // status: OrderStatus;
  amount: number;
  children: Order[];
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  billing_address?: UserAddress;
  shipping_address?: UserAddress;
};

export type SettingsType = {
  _id: string;
  options: SettingsOptions;
};

export type SettingsOptions = {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  logo?: Attachment;
  taxClass?: string;
  shippingClass?: string;
  contactDetails?: any;
};

export type Shop = {
  [key: string]: any;
};

export type Address = {
  [key: string]: any;
};
