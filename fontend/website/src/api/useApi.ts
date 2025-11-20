import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiWithError } from './createApiWithError';
import type { BaseEntity, BaseDTO, PaginatedResponse } from './createApiWithError';
import axios from 'axios';

export const useApi = <
  T extends BaseEntity,
  CreateDTO extends BaseDTO,
  UpdateDTO extends BaseDTO
>(baseUrl: string) => {
  const api = createApiWithError<T, CreateDTO, UpdateDTO>(baseUrl);
  const queryClient = useQueryClient();

  return {
    // ---------------- List với pagination ----------------
    useGetList: (page = 1, search = '', pageSize = 10,) =>
      useQuery<{ data: PaginatedResponse<T> | null; error: string | null }>({
        queryKey: [baseUrl, page, search, pageSize],
        queryFn: () => api.getList(page, search, pageSize),
      }),
    // ---------------- Detail ----------------
    useGetDetail: (id: number) =>
      useQuery<{ data: T | null; error: string | null }>({
        queryKey: [baseUrl, id],
        queryFn: () => api.getDetail(id),
        enabled: !!id,
      }),

    // ---------------- Create ----------------
    useCreate: () =>
      useMutation<{ data: T | null; error: string | null }, unknown, CreateDTO>({
        mutationFn: (data: CreateDTO) => api.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [baseUrl] }),
        onError: (error: any) => {
          console.log('Quyen error', error)
          if (axios.isAxiosError(error)) {
            alert(
              `Đã có lỗi xảy ra khi thêm mới: ${error.response?.status} - ${error.response?.data}`
            );
          } else {
            alert('Đã có lỗi không xác định xảy ra.');
          }
        }
      }),

    // ---------------- Update ----------------
    useUpdate: () =>
      useMutation<{ data: T | null; error: string | null }, unknown, { id: number; data: UpdateDTO }>({
        mutationFn: ({ id, data }) => api.update(id, data),
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({ queryKey: [baseUrl] });           // invalidate list
          queryClient.invalidateQueries({ queryKey: [baseUrl, variables.id] }); // invalidate detail
        },
        onError: (error: any) => {
          if (axios.isAxiosError(error)) {
            alert(
              `Đã có lỗi xảy ra khi chỉnh sửa: ${error.response?.status} - ${error.response?.data}`
            );
          } else {
            alert('Đã có lỗi không xác định xảy ra.');
          }
        }
      }),

    // ---------------- Delete ----------------
    useDelete: () =>
      useMutation<{ data: void | null; error: string | null }, unknown, number>({
        mutationFn: (id: number) => api.delete(id),
        onSuccess: (_, id) => {
          queryClient.invalidateQueries({ queryKey: [baseUrl] });           // invalidate list
          queryClient.invalidateQueries({ queryKey: [baseUrl, id] });       // invalidate detail
        },
        onError: (error: any) => {
          if (axios.isAxiosError(error)) {
            alert(
              `Đã có lỗi xảy ra khi xóa: ${error.response?.status} - ${error.response?.data}`
            );
          } else {
            alert('Đã có lỗi không xác định xảy ra.');
          }
        }
      }),
  };
};
