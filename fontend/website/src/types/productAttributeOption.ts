import type { AttributeOption } from "./attributeOption";

export interface ProductAttributeOption {
  id: number;
  attributeOptionId: number;
  productId: number;
}
export interface ProductAttributeOptionDto {
  id: number;
  attributeOptionId: number;
  productId: number;
  optionLabel?: string;
  optionValueKey?: string;
  attributeName?: string;
}
export interface CreateProductAttributeOptionDTO {
  attributeOptionId?: number;
  productId: number;
}

export interface UpdateProductAttributeOptionDTO {
  id: number;
  attributeOptionId?: number;
  productId: number;
}

export interface OptionFilterttributeOption {
  page?: number,
  size?: number,
  attributeOptionId?: number,
  attributeDefinitionId?: number;
  productId?: number;
  brandId?: number;
  categoryId?: number;
  keySearch?: string,
}

export interface Response {
  total: number;
  page: number;
  size: number;
  items: ProductAttributeOptionDto[]
}

export interface BulkInsertResult {
  added: any;
  already: any;
  missingProducts: any;
  mismatches: any;
}

export interface BulkInsertParams {
 optionId: number;
 productIds: number[];
 replaceSameAttribute: boolean 
}






