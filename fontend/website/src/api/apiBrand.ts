import { createApi } from './createApi';
import type {Brand,  CreateBrandDTO, UpdateBrandDTO} from '@/types/brand'

export const brandApi = createApi<Brand, CreateBrandDTO, UpdateBrandDTO>('/brands');
