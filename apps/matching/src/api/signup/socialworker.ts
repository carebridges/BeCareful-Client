import { SignUpPayload } from '@/types/auth';
import { axiosInstance } from '@repo/common';
import { useMutation } from '@tanstack/react-query';

/* 사회복지사 회원가입 */
export const signUpMember = async (payload: SignUpPayload) => {
  const { data } = await axiosInstance.post('/social-worker/signup', payload);
  return data;
};

export const useSignUpMember = () => {
  return useMutation({ mutationFn: signUpMember });
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const { data } = await axiosInstance.get('/social-worker/check-nickname', {
    params: { nickname },
  });
  return data;
};
