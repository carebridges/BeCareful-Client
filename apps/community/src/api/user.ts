import { axiosInstance } from '@repo/common';
import { useQuery } from '@tanstack/react-query';
import { SocialworkerProfileResponse } from '@/types/user';

/* 회원정보 반환 */
export const useSocialworkerProfile = () =>
  useQuery<SocialworkerProfileResponse>({
    queryKey: ['socialworkerProfile'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/my');
      return data;
    },
  });
