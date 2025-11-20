import type { Warranty } from "./warranty";
export interface ProductWarranty {
    id: number;
    productId: number;
    product?: ProductWarranty;
    warrantyId: number;
    warranty?:Warranty;
}

export interface CreateProductWarrantyDTO {
    productId?: number;
    warrantyId?: number;
}

export interface UpdateProductWarrantyDTO {
    productId?: number;
    warrantyId?: number;
}

export interface ProductListResponse {
  items: ProductWarranty[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export type BulkInsertResult = {
  message?: string;
  insertedCount: number;
  skippedCount: number;
  inserted: Array<Partial<ProductWarranty>>; // hoặc CreateProductDTO[]
  skipped: Array<{ Code?: string; Name?: string; reason?: string }>;
};


export interface OptionFilterProductWarranty {
  page?: number,
  size?: number,
  productId?: number,
  warrantyId?: number,
  brandId?: number,
  categoryId?: number,
  keySearch?: string,
  sortBy?: "DiscountPrice" | "DiscountPercent"; // Enum SortField trong backend
  sortOrder?: "Asc" | "Desc"; 
}

export interface Response {
  total: number;
  page: number;
  size: number;
  items: ProductWarranty[]
}




