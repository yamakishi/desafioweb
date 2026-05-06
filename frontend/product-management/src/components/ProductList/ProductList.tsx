import React, { useState } from "react";
import type { Product } from "../../types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Package } from "lucide-react";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number, name: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products = [],
  loading,
  onEdit,
  onDelete,
}) => {
  const [productToDelete, setProductToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setProductToDelete({ id, name });
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id, productToDelete.name);
      setProductToDelete(null);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={!!productToDelete}
        productName={productToDelete?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const EmptyState: React.FC = () => (
  <div className="text-center py-12 bg-white rounded-lg shadow-md">
    <Package className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">
      Nenhum produto cadastrado
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      Clique em "Novo Produto" para começar.
    </p>
  </div>
);
