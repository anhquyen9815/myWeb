import { createApi } from './createApi';
import type { ProductModelGroup, CreateProductModelGroupDTO, UpdateProductModelGroupDTO } from '@/types/productModelGroup'

export const brandApi = createApi<ProductModelGroup, CreateProductModelGroupDTO, UpdateProductModelGroupDTO>('/ProductModelGroups');
