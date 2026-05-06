import React from "react";
import { Edit, Trash2, Package } from "lucide-react";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number, name: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { color: "bg-red-100 text-red-800", text: "Esgotado" };
    if (quantity < 5)
      return { color: "bg-yellow-100 text-yellow-800", text: "Baixo estoque" };
    return {
      color: "bg-green-100 text-green-800",
      text: `${quantity} unidades`,
    };
  };

  const stockStatus = getStockStatus(product.stockQuantity);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-gray-500" />
            <span className="text-xs font-mono text-gray-500">
              {product.sku}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {product.category}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}
            >
              {stockStatus.text}
            </span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(product.id, product.name)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
