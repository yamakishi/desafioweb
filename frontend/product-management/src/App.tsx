import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import { ProductList } from "./components/ProductList/ProductList";
import { ProductFormModal } from "./components/ProductFormModal/ProductFormModal";
import { Pagination } from "./components/Pagination/Pagination";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types/product";

function App() {
  const {
    products = [],
    loading = false,
    page = 1,
    pageSize = 10,
    totalPages = 1,
    totalItems = 0,
    deleteProduct,
    changePage,
    changePageSize,
    refreshProducts,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    refreshProducts();
  };

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                📦 Gestão de Produtos
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie seu inventário de forma eficiente
              </p>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Produto
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ProductList
            products={safeProducts}
            loading={loading}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />
        </div>

        {!loading && safeProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={changePage}
              onPageSizeChange={changePageSize}
            />
          </div>
        )}
      </div>

      <ProductFormModal
        isOpen={isFormOpen}
        product={editingProduct}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}

export default App;
