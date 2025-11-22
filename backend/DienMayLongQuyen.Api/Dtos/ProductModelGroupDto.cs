public class CreateProductModelGroupDto
{
    public string Name { get; set; }
    public int? BrandId { get; set; }
    public int? CategoryId { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
}

public class UpdateProductModelGroupDto
{
    public string Name { get; set; }
    public int? BrandId { get; set; }
     public int? CategoryId { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
}

