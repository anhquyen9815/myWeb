// useProductModelGroup.ts
import { useApi } from '@/api/useApi';
import type { ProductModelGroup, CreateProductModelGroupDTO, UpdateProductModelGroupDTO } from '@/types/productModelGroup';

export const useProductModelGroupHooks= () => {
  return  useApi<ProductModelGroup, CreateProductModelGroupDTO, UpdateProductModelGroupDTO>('/ProductModelGroups');
};
