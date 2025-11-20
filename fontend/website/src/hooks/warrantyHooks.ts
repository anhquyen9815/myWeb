// useWarranty.ts
import { useApi } from '@/api/useApi';
import type { Warranty, CreateWarrantyDTO, UpdateWarrantyDTO } from '@/types/warranty';

export const useWarrantyHooks= () => {
  return  useApi<Warranty, CreateWarrantyDTO, UpdateWarrantyDTO>('/warranties');
};
