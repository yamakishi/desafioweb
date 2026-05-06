using ProductApi.DTOs;

namespace ProductApi.Services.Validations;

public static class ProductValidator
{
    public static void Validate(CreateProductDto dto)
    {
        if (dto.StockQuantity < 0)
            throw new Exception("Estoque não pode ser negativo");

        if (dto.Category == "Eletrônicos" && dto.Price < 50)
            throw new Exception("Eletrônicos devem custar no mínimo 50");
    }
}