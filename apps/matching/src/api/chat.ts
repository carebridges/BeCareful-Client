import { axiosInstance } from '@repo/common';
import { useQuery } from '@tanstack/react-query';
import {
  CaregiverChatList,
  CaregiverChatResponse,
  ContractChatDetail,
  SocialworkerChatList,
  SocialworkerChatResponse,
} from '@/types/chat';

// ==================== 사회복지사 ====================
/* 사회복지사 채팅 목록 */
export const useSocialworkerChatList = () =>
  useQuery<SocialworkerChatList[]>({
    queryKey: ['socialworkerChatList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/chat/social-worker/list');
      return data;
    },
    refetchOnWindowFocus: true,
  });

/* 사회복지사 채팅 데이터 조회 */
export const useSocialworkerChat = (chatRoomId: number) =>
  useQuery<SocialworkerChatResponse>({
    queryKey: ['socialworkerChat', chatRoomId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/chat/social-worker?chatRoomId=${chatRoomId}`,
      );
      return data;
    },
  });

/* 계약서 상세 내용 */
export const useGetSocialworkerContract = (contractId: number) =>
  useQuery<ContractChatDetail>({
    queryKey: ['socialworkerContract', contractId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/chat/social-worker/contract/${contractId}`,
      );
      return data;
    },
  });

// ==================== 요양보호사 ====================
/* 요양보호사 채팅 목록 */
export const useGetCaregiverChatList = () =>
  useQuery<CaregiverChatList[]>({
    queryKey: ['caregiverChatList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/chat/caregiver/list');
      return data;
    },
    refetchOnWindowFocus: true,
  });

/* 요양보호사 채팅 데이터 조회 */
export const useGetCaregiverChat = (chatRoomId: number) =>
  useQuery<CaregiverChatResponse>({
    queryKey: ['caregiverChat', chatRoomId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/chat/caregiver?chatRoomId=${chatRoomId}`,
      );
      return data;
    },
  });
