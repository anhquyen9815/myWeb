// useNews.ts
import { useApi } from '@/api/useApi';
import type { News, CreateNewsDTO, UpdateNewsDTO } from '@/types/news';

// export const newsHooks = useApi<News, CreateNewsDTO, UpdateNewsDTO>('/news');
export const useNewsHooks= () => {
  return  useApi<News, CreateNewsDTO, UpdateNewsDTO>('/news');
};
