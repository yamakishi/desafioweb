import { useState, useCallback, useEffect } from "react";
import { productService } from "../services/productService";
import type { Product } from "../types/product";
import toast from "react-hot-toast";
import { usePagination } from "./usePagination";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const { page, pageSize, totalPages, changePage, changePageSize } =
    usePagination({ totalItems });

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts(page, pageSize);
      setProducts(data?.items || []);
      setTotalItems(data?.totalItems || 0);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const deleteProduct = useCallback(
    async (id: number, name: string) => {
      try {
        await productService.deleteProduct(id);
        toast.success(`✅ "${name}" removido com sucesso!`);
        await loadProducts();
        return true;
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Erro ao deletar produto";
        toast.error(`❌ ${message}`);
        return false;
      }
    },
    [loadProducts],
  );

  return {
    products,
    loading,
    page,
    pageSize,
    totalPages: totalPages || 1,
    totalItems: totalItems || 0,
    deleteProduct,
    changePage,
    changePageSize,
    refreshProducts: loadProducts,
  };
}
