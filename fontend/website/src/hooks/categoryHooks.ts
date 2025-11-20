// useCategory.ts
import { useApi } from '@/api/useApi';
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category';

// export const categoryHooks = useApi<Category, CreateCategoryDTO, UpdateCategoryDTO>('/categories');


export const useCategoryHooks= () => {
  return useApi<Category, CreateCategoryDTO, UpdateCategoryDTO>('/categories');
};