import api from "./api";
import type {
  Product,
  ProductCreateRequest,
  ApiResponse,
  PaginatedData,
} from "../types/product";

export const productService = {
  async getProducts(page: number = 1, pageSize: number = 10) {
    const response = await api.get<ApiResponse<PaginatedData<Product>>>(
      "/Products",
      {
        params: { page, pageSize },
      },
    );

    const paginatedData = response.data.data;
    return {
      items: paginatedData.data,
      totalItems: paginatedData.totalCount,
      page: paginatedData.page,
      pageSize: paginatedData.pageSize,
      totalPages: Math.ceil(paginatedData.totalCount / paginatedData.pageSize),
    };
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/Products/${id}`);
    return response.data.data;
  },

  async createProduct(product: ProductCreateRequest): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>("/Products", product);
    return response.data.data;
  },

  async updateProduct(
    id: number,
    product: ProductCreateRequest,
  ): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(
      `/Products/${id}`,
      product,
    );
    return response.data.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/Products/${id}`);
  },
};
