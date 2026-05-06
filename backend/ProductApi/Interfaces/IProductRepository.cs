using ProductApi.Entities;

namespace ProductApi.Interfaces;

public interface IProductRepository
{
    Task<(IEnumerable<Product>, int)> GetAll(int page, int pageSize);
    Task<Product?> GetById(int id);
    Task<Product?> GetBySku(string sku);
    Task Add(Product product);
    Task Update(Product product);
    Task Delete(Product product);
    Task SaveChanges();
}