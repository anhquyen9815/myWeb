import type { Brand } from "./brand";
import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  code: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number;
  categoryId?: number;
  brandId?: number;
  image?: string;
  gallery?: string;
  isActive: boolean;
  createdAt?: string;
  brand?:Brand;
  category?:Category
}

export interface CreateProductDTO {
  name: string;
  code: string;
  slug?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  categoryId?: number;
  brandId?: number;
  image?: string;
  gallery?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface UpdateProductDTO {
  name?: string;
  code?: string;
  slug?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  categoryId?: number;
  brandId?: number;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface ProductListResponse {
  items: Product[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export type BulkInsertResult = {
  message?: string;
  insertedCount: number;
  skippedCount: number;
  inserted: Array<Partial<Product>>; // hoặc CreateProductDTO[]
  skipped: Array<{ Code?: string; Name?: string; reason?: string }>;
};

export type BulkUpdateGalleryResult = {
  message?: string;
  updatedCount: number;
  skippedCount: number;
  inserted: any; // hoặc CreateProductDTO[]
  skipped: any;
};
export interface DataExcel {
  nameSheet: string,
  data: CreateProductDTO[],
  id: number
}

export interface OptionFilterProduct {
  page?: number,
  size?: number,
  brandId?: number,
  categoryId?: number,
  keySearch?: string,
  sortBy?: "DiscountPrice" | "DiscountPercent"; // Enum SortField trong backend
  sortOrder?: "Asc" | "Desc"; 
  attributeFilters?: string,
  minPrice?:number;
  maxPrice?:number
}

export interface Response {
  total: number;
  page: number;
  size: number;
  items: Product[]
}

export interface UpdateGalleryDTO {
  idProduct: number;
  codeProduct: string;
  gallery: string;
  image?: string;
  listGallery?: string[]

}


