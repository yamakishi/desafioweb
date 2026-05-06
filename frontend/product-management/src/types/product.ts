export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stockQuantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface ProductCreateRequest {
  sku: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stockQuantity: number;
}

export type ProductCategory =
  | "Eletrônicos"
  | "Eletrodomésticos"
  | "Móveis"
  | "Vestuário"
  | "Livros"
  | "Outros";
