import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SocialworkerHomeResponse } from '@/types/Socialworker/home';
import {
  SocialworkerMyRequest,
  SocialworkerMyResponse,
} from '@/types/Socialworker/mypage';
import {
  SocialworkerChatListResponse,
  SocialworkerChatResponse,
  SocialworkerContractEditRequest,
  SocialworkerContractResponse,
} from '@/types/Socialworker/chat';

/* 사회복지사 홈화면 */
// 사회복지사 홈화면 조회
export const useGetSocialWorkerHome = () =>
  useQuery<SocialworkerHomeResponse>({
    queryKey: ['socialworkerHome'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/socialworker/home');
      return data;
    },
  });

/* 사회복지사 마이페이지 */
// 회원정보 반환
export const useGetSocialWorkerMy = () =>
  useQuery<SocialworkerMyResponse>({
    queryKey: ['socialworkerMy'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/socialworker/me');
      return data;
    },
  });

// 회원정보 수정
export const usePutSocialworkerMy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (myData: SocialworkerMyRequest) => {
      const response = await axiosInstance.put('/socialworker/me', myData);
      return response;
    },
    onSuccess: (response) => {
      console.log(
        'usePutSocialworkerMy - 사회복지사 마이페이지 수정 성공:',
        response.data,
      );
      queryClient.invalidateQueries({
        queryKey: ['socialworkerMy'],
      });
    },
    onError: (error) => {
      console.error(
        'usePutSocialworkerMy - 사회복지사 마이페이지 수정 실패:',
        error,
      );
    },
  });
};

// 닉네임 중복 확인
export const useCheckNickName = (nickname: string) =>
  useQuery({
    queryKey: ['checkNickname', nickname],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/socialworker/check-nickname?nickname=${nickname}`,
      );
      return data;
    },
    enabled: !!nickname,
  });

/* 채팅 */
// 사회복지사 채팅 목록
export const useGetSocialworkerChatList = () =>
  useQuery<SocialworkerChatListResponse>({
    queryKey: ['socialworkerChatList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/chat/social-worker/list');
      return data;
    },
  });

// 사회복지사 채팅 데이터 조회
export const useGetSocialworkerChat = (matchingId: number) =>
  useQuery<SocialworkerChatResponse>({
    queryKey: ['socialworkerChat', matchingId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/chat/social-worker?matchingId=${matchingId}`,
      );
      return data;
    },
  });

// 계약서 상세 내용
export const useGetSocialworkerContract = (contractId: number) =>
  useQuery<SocialworkerContractResponse>({
    queryKey: ['socialworkerContract', contractId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/chat/social-worker/contract/${contractId}`,
      );
      return data;
    },
  });

// 수정 계약서 생성
export const usePostSocialworkerContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contractData: SocialworkerContractEditRequest) => {
      const response = await axiosInstance.post(
        '/chat/social-worker/contract/edit',
        contractData,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log(
        'usePostSocialworkerContract - 사회복지사 계약 수정 성공:',
        response.data,
      );
      queryClient.invalidateQueries({
        queryKey: ['socialworkerContract'],
      });
    },
    onError: (error) => {
      console.error(
        'usePostSocialworkerContract - 사회복지사 계약 수정 실패:',
        error,
      );
    },
  });
};
