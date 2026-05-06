using Microsoft.AspNetCore.Mvc;
using ProductApi.DTOs;
using ProductApi.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await _service.GetAll(page, pageSize);
        return Ok(ApiResponse<PagedResult<ProductResponseDto>>.Ok(result));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _service.GetById(id);

        if (product == null)
            return NotFound(ApiResponse<string>.Fail("Produto não encontrado"));

        return Ok(ApiResponse<ProductResponseDto>.Ok(product));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDto dto)
    {
        var result = await _service.Create(dto);
        return Ok(ApiResponse<ProductResponseDto>.Ok(result, "Produto criado com sucesso"));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProductDto dto)
    {
        await _service.Update(id, dto);
        return Ok(ApiResponse<string>.Ok("Produto atualizado com sucesso"));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.Delete(id);
        return Ok(ApiResponse<string>.Ok("Produto removido com sucesso"));
    }
}