// apiCategory.ts
import { createApi } from './createApi';
import type {Category,  CreateCategoryDTO, UpdateCategoryDTO} from '@/types/category'

export const categoryApi = createApi<Category, CreateCategoryDTO, UpdateCategoryDTO>('/categories');