// createApi.ts
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export interface BaseEntity {
  id: number;
}

export interface BaseDTO {}

// Generic API creator
export const createApi = <T extends BaseEntity, CreateDTO extends BaseDTO, UpdateDTO extends BaseDTO>(
  baseUrl: string
) => {
  return {
    getList: async (): Promise<T[]> => {
      const response: AxiosResponse<T[]> = await apiClient.get(baseUrl);
      return response.data;
    },

    getDetail: async (id: number): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.get(`${baseUrl}/${id}`);
      return response.data;
    },

    create: async (data: CreateDTO): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.post(baseUrl, data);
      return response.data;
    },

    update: async (id: number, data: UpdateDTO): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.put(`${baseUrl}/${id}`, data);
      return response.data;
    },

    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${baseUrl}/${id}`);
    },
  };
};
