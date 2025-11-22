using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DienMayLongQuyen.Api.Models
{
    public class ProductModelGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
