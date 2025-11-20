// useBrand.ts
import { useApi } from '@/api/useApi';
import type { Brand, CreateBrandDTO, UpdateBrandDTO } from '@/types/brand';

// export const brandHooks = useApi<Brand, CreateBrandDTO, UpdateBrandDTO>('/brands');
export const useBrandHooks= () => {
  return  useApi<Brand, CreateBrandDTO, UpdateBrandDTO>('/brands');
};
