using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Entities;
using ProductApi.Interfaces;

namespace ProductApi.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Product>, int)> GetAll(int page, int pageSize)
    {
        var total = await _context.Products.CountAsync();

        var data = await _context.Products
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (data, total);
    }

    public async Task<Product?> GetById(int id)
        => await _context.Products.FindAsync(id);

    public async Task<Product?> GetBySku(string sku)
        => await _context.Products.FirstOrDefaultAsync(p => p.SKU == sku);

    public async Task Add(Product product)
        => await _context.Products.AddAsync(product);

    public Task Update(Product product)
    {
        _context.Products.Update(product);
        return Task.CompletedTask;
    }

    public Task Delete(Product product)
    {
        _context.Products.Remove(product);
        return Task.CompletedTask;
    }

    public async Task SaveChanges()
        => await _context.SaveChangesAsync();
}