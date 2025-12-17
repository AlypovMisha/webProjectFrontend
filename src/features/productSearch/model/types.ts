// features/productSearch/types.ts

/** Параметры поиска товаров */
export interface ProductSearchParams {
  search?: string;
  category_id?: number;
  shop_id?: number;
  min_price?: number;
  max_price?: number;
  order_by?: 'name' | 'price' | 'created_at';
  order_direction?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/** Товар, который приходит с бэка */
export interface ProductSearchItem {
  product_id: number;
  category_id: number;
  shop_id: number;
  name: string;
  description: string;
  photos: string; // JSON-строка
  price: string;
  created_at: string;
  category_name: string;
  shop_name: string;
}

/** Пагинация */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/** Ответ поиска */
export interface ProductSearchResponse {
  products: ProductSearchItem[];
  pagination: Pagination;
}
