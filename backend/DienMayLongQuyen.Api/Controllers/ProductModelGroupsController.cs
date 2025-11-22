using DienMayLongQuyen.Api.Data;
using DienMayLongQuyen.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DienMayLongQuyen.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductModelGroupsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductModelGroupsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductModelGroups
        // Hỗ trợ phân trang: ?page=1&pageSize=20
        [HttpGet]
        public async Task<IActionResult> GetAll(
            int page = 1,
            int pageSize = 20,
            int? brandId = null,
            int? categoryId = null
            )
        {
            if (page <= 0) page = 1;
            if (pageSize <= 0) pageSize = 20;

            var query = _context.ProductModelGroups
                                .Include(x => x.Brand)
                                // .Include(x => x.Category)
                                .AsNoTracking()
                                .AsQueryable();

            // Lọc brandId
            if (brandId.HasValue && brandId > 0)
            {
                query = query.Where(x => x.BrandId == brandId.Value);
            }

            // Lọc categoryId
            // if (categoryId.HasValue && categoryId > 0)
            // {
            //     query = query.Where(x => x.CategoryId == categoryId.Value);
            // }

            var total = await query.CountAsync();

            var items = await query
                .OrderByDescending(x => x.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                total,
                page,
                pageSize,
                items
            });
        }

        // GET: api/ProductModelGroups/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.ProductModelGroups
                .Include(x => x.Brand)
                // .Include(x => x.Category)
                .Include(x => x.Products)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                return NotFound(new { message = "Không tìm thấy ProductModelGroup" });

            return Ok(item);
        }

        // POST: api/ProductModelGroups
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductModelGroupDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Optionally bạn có thể kiểm tra trùng tên/code ở đây nếu cần
            var entity = new ProductModelGroup
            {
                Name = dto.Name?.Trim() ?? string.Empty,
                BrandId = dto.BrandId,
                // CategoryId = dto.CategoryId,
                Description = dto.Description ?? string.Empty,
                Image = dto.Image ?? string.Empty
            };

            _context.ProductModelGroups.Add(entity);
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
            }
            catch (DbUpdateException ex)
            {
                // nếu muốn xử lý lỗi cụ thể (ví dụ unique constraint) có thể check InnerException
                return StatusCode(500, new { message = "Lỗi khi lưu dữ liệu", error = ex.Message });
            }
        }

        // PUT: api/ProductModelGroups/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductModelGroupDto dto)
        {
            var entity = await _context.ProductModelGroups.FindAsync(id);
            if (entity == null)
                return NotFound(new { message = "Không tìm thấy ProductModelGroup" });

            // Chỉ cập nhật khi client gửi giá trị (không phải null)
            if (dto.Name != null) entity.Name = dto.Name.Trim();
            if (dto.BrandId.HasValue) entity.BrandId = dto.BrandId.Value;
            // if (dto.CategoryId.HasValue) entity.CategoryId = dto.CategoryId.Value;
            if (dto.Description != null) entity.Description = dto.Description;
            if (dto.Image != null) entity.Image = dto.Image;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Cập nhật thành công" });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lưu dữ liệu", error = ex.Message });
            }
        }

        // DELETE: api/ProductModelGroups/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.ProductModelGroups
                // Nếu muốn đảm bảo không xóa khi còn product liên quan, kiểm tra Products.Count
                .Include(x => x.Products)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
                return NotFound(new { message = "Không tìm thấy ProductModelGroup" });

            // Nếu bạn không muốn xóa khi còn sản phẩm liên quan, bỏ comment đoạn sau:
            // if (entity.Products != null && entity.Products.Any())
            // {
            //     return BadRequest(new { message = "Không thể xóa: còn sản phẩm liên quan" });
            // }

            _context.ProductModelGroups.Remove(entity);

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Lỗi khi xóa", error = ex.Message });
            }
        }
    }

}
