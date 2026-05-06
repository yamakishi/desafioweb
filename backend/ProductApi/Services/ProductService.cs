using ProductApi.DTOs;
using ProductApi.Entities;
using ProductApi.Interfaces;
using ProductApi.Services.Validations;

namespace ProductApi.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repo;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IProductRepository repo, ILogger<ProductService> logger)
    {
        _repo = repo;
        _logger = logger;
    }

    public async Task<PagedResult<ProductResponseDto>> GetAll(int page, int pageSize)
    {
        var (products, total) = await _repo.GetAll(page, pageSize);

        return new PagedResult<ProductResponseDto>
        {
            Data = products.Select(MapToDto),
            Page = page,
            PageSize = pageSize,
            TotalCount = total
        };
    }

    public async Task<ProductResponseDto?> GetById(int id)
    {
        var product = await _repo.GetById(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductResponseDto> Create(CreateProductDto dto)
    {
        try
        {
            ProductValidator.Validate(dto);

            if (await _repo.GetBySku(dto.SKU) != null)
                throw new Exception("SKU já existe");

            var product = new Product
            {
                Name = dto.Name,
                SKU = dto.SKU,
                Price = dto.Price,
                Category = dto.Category,
                StockQuantity = dto.StockQuantity
            };

            await _repo.Add(product);
            await _repo.SaveChanges();

            _logger.LogInformation("Produto criado: {SKU}", product.SKU);

            return MapToDto(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar produto");
            throw;
        }
    }

    public async Task Update(int id, UpdateProductDto dto)
    {
        try
        {
            var product = await _repo.GetById(id)
                ?? throw new Exception("Produto não encontrado");

            ProductValidator.Validate(dto);

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.Category = dto.Category;
            product.StockQuantity = dto.StockQuantity;

            await _repo.Update(product);
            await _repo.SaveChanges();

            _logger.LogInformation("Produto atualizado: {Id}", id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao atualizar produto");
            throw;
        }
    }

    public async Task Delete(int id)
    {
        try
        {
            var product = await _repo.GetById(id)
                ?? throw new Exception("Produto não encontrado");

            await _repo.Delete(product);
            await _repo.SaveChanges();

            _logger.LogInformation("Produto deletado: {Id}", id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao deletar produto");
            throw;
        }
    }

    private ProductResponseDto MapToDto(Product p)
    {
        return new ProductResponseDto
        {
            Id = p.Id,
            Name = p.Name,
            SKU = p.SKU,
            Price = p.Price,
            Category = p.Category,
            StockQuantity = p.StockQuantity
        };
    }
}