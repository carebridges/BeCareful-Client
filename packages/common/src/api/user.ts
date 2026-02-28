'use client';

import { axiosInstance } from './axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MarketingAgreeInfo } from '../types';

// ==================== 요양보호사 ====================
/* 요양보호사 마케팅 동의 여부 조회 */
export const useCaregiverMarketing = (enabled: boolean) => {
  return useQuery<MarketingAgreeInfo>({
    queryKey: ['caregiverMarketing'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/my/setting');
      return response.data;
    },
    enabled: enabled,
  });
};

/* 요양보호사 마케팅 동의 여부 수정 */
export const useUpdateCaregiverMarketing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (marketingAgree: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/caregiver/my/marketing-info-receiving-agreement',
        marketingAgree,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverMarketing'],
      });
    },
  });
};

/* 로그아웃 */
export const useCaregiverLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/caregiver/logout');
      return response;
    },
  });
};

/* 회원탈퇴 */
export const useDeleteCaregiver = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/caregiver/leave');
      return response;
    },
  });
};

// ==================== 사회복지사 ====================
/* 사회복지사 마케팅 동의 여부 조회 */
export const useSocialworkerMarketing = (enabled: boolean) => {
  return useQuery<MarketingAgreeInfo>({
    queryKey: ['socialworkerMarketing'],
    queryFn: async () => {
      const response = await axiosInstance.get('/social-worker/my/setting');
      return response.data;
    },
    enabled: enabled,
  });
};

/* 사회복지사 마케팅 동의 여부 수정 */
export const useUpdateSocialMarketing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (marketingAgree: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/social-worker/my/marketing-info-receiving-agreement',
        marketingAgree,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialworkerMarketing'] });
    },
  });
};

/* 로그아웃 */
export const useSocialworkerLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/social-worker/logout');
      return response;
    },
  });
};

/* 회원탈퇴 */
export const useDeleteSocialworker = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/social-worker/leave');
      return response;
    },
  });
};
