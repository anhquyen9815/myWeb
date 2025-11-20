
export interface BrandCategory {
  id: number;
  categoryId: number;
  brandId: number;
  brandName?: string;
  brandLogo?: string;
  categoryName?: string;
}

export interface CreatBrandCategoryDTO {
  categoryId: number;
  brandId: number;
}

export interface UpdateBrandCategoryDTO {
  categoryId?: number;
  brandId?: number;
}

export interface Response {
  total: number;
  page: number;
  size: number;
  items: BrandCategory[]
}

export type BulkInsertResult = {
  message?: string;
  insertedCount: number;
  skippedCount: number;
  inserted: Array<Partial<BrandCategory>>; // hoặc CreateProductDTO[]
  skipped: Array<{ Code?: string; Name?: string; reason?: string }>;
};


