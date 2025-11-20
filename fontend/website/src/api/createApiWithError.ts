import type { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export interface BaseEntity { id: number; }
export interface BaseDTO { }

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export const createApiWithError = <
  T extends BaseEntity,
  CreateDTO extends BaseDTO,
  UpdateDTO extends BaseDTO
>(baseUrl: string) => {
  const handleRequest = async <R>(
    request: () => Promise<AxiosResponse<R>>
  ): Promise<{ data: R | null; error: string | null }> => {
    try {
      const response = await request();

      // ✅ Chuẩn hóa response: đổi "data" → "items" nếu cần
      const serverData: any = response.data;
      if (Array.isArray(serverData.data)) {
        // Trường hợp backend trả { data: [], page, pageSize, totalCount }
        return {
          data: {
            items: serverData.data ?? [],
            page: serverData.page ?? 1,
            pageSize: serverData.pageSize ?? 10,
            totalCount: serverData.totalCount ?? 0,
          } as R,
          error: null,
        };
      }

      return { data: response.data, error: null };
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message || 'Unknown error';
      return { data: null, error: errorMsg };
    }
  };
  return {
    getList: async (page = 1, search = '', pageSize = 10) =>
      handleRequest<PaginatedResponse<T>>(() =>
        apiClient.get(baseUrl, { params: { page, search, pageSize } })
      ),

    getDetail: async (id: number) =>
      handleRequest<T>(() => apiClient.get(`${baseUrl}/${id}`)),

    create: async (data: CreateDTO) => 
      handleRequest<T>(() => apiClient.post(baseUrl, data)),

    update: async (id: number, data: UpdateDTO) =>
      handleRequest<T>(() => apiClient.put(`${baseUrl}/${id}`, data)),

    delete: async (id: number) =>
      handleRequest<void>(() => apiClient.delete(`${baseUrl}/${id}`)),
  };
};
