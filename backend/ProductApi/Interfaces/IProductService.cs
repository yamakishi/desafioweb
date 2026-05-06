using ProductApi.DTOs;

namespace ProductApi.Interfaces;

public interface IProductService
{
    Task<PagedResult<ProductResponseDto>> GetAll(int page, int pageSize);
    Task<ProductResponseDto?> GetById(int id);
    Task<ProductResponseDto> Create(CreateProductDto dto);
    Task Update(int id, UpdateProductDto dto);
    Task Delete(int id);
}