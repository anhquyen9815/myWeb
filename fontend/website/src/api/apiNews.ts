// apiNews.ts
import { createApi } from './createApi';
import type {News,  CreateNewsDTO, UpdateNewsDTO} from '@/types/news'

export const newsApi = createApi<News, CreateNewsDTO, UpdateNewsDTO>('/news');
