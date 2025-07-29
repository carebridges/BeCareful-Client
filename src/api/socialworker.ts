import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SocialworkerHomeResponse } from '@/types/Socialworker/home';
import {
  SocialworkerMyRequest,
  SocialworkerMyResponse,
} from '@/types/Socialworker/mypage';

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
