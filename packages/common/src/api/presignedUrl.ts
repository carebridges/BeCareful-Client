'use client';

import { axiosInstance } from './axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { PresignedUrlRequest } from '../types';

// ==================== 파일 업로드 ====================
/* Presigned URL 발급 */
export const useGetPresignedUrl = (endpoint: string) => {
  return useMutation({
    mutationFn: async (request: PresignedUrlRequest) => {
      const response = await axiosInstance.post(endpoint, request);
      return response.data;
    },
    onSuccess: (response) => {
      console.log('useGetPresignedUrl 성공:', response.data);
    },
    onError: (error) => {
      console.error('useGetPresignedUrl 실패:', error);
    },
  });
};
