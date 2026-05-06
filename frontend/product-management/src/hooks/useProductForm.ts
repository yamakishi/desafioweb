import { useState, useEffect, useCallback } from "react";
import type { Product, ProductCreateRequest } from "../types/product";
import { productService } from "../services/productService";
import toast from "react-hot-toast";

interface UseProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
}

export function useProductForm({ product, onSuccess }: UseProductFormProps) {
  const [formData, setFormData] = useState<ProductCreateRequest>({
    sku: "",
    name: "",
    description: "",
    category: "Outros",
    price: 0,
    stockQuantity: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        name: product.name,
        description: product.description || "",
        category: product.category as any,
        price: product.price,
        stockQuantity: product.stockQuantity,
      });
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setFormData({
      sku: "",
      name: "",
      description: "",
      category: "Outros",
      price: 0,
      stockQuantity: 0,
    });
    setErrors({});
  };

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.sku.trim()) newErrors.sku = "SKU é obrigatório";
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (formData.price <= 0) newErrors.price = "Preço deve ser maior que zero";

    if (formData.category === "Eletrônicos" && formData.price < 50) {
      newErrors.price = "Eletrônicos devem ter preço mínimo de R$ 50,00";
    }

    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = "Estoque não pode ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return false;

    setIsSaving(true);
    try {
      if (product?.id) {
        await productService.updateProduct(product.id, formData);
        toast.success("✅ Produto atualizado com sucesso!");
      } else {
        await productService.createProduct(formData);
        toast.success("✅ Produto criado com sucesso!");
      }
      onSuccess();
      resetForm();
      return true;
    } catch (error: any) {
      const apiError = error.response?.data;
      if (apiError?.errors) {
        setErrors(apiError.errors);
      } else if (apiError?.message) {
        setErrors({ general: apiError.message });
      } else {
        toast.error("❌ Erro ao salvar produto");
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [formData, product, validateForm, onSuccess]);

  const updateField = useCallback(
    <K extends keyof ProductCreateRequest>(
      field: K,
      value: ProductCreateRequest[K],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors],
  );

  return {
    formData,
    errors,
    isSaving,
    updateField,
    handleSubmit,
    resetForm,
  };
}
