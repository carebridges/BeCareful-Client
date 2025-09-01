import { axiosInstance } from '@/api/axiosInstance';
import { Institution } from '@/types/SocialSignUp';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface SignUpPayload {
  nursingInstitutionId: number;
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  institutionRank:
    | 'CENTER_DIRECTOR'
    | 'REPRESENTATIVE'
    | 'SOCIAL_WORKER'
    | 'none';
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export const signUpMember = async (payload: SignUpPayload) => {
  const { data } = await axiosInstance.post('/socialworker/signup', payload);
  return data;
};

export const useSignUpMember = () => {
  return useMutation({ mutationFn: signUpMember });
};

export const searchInstitution = async (name: string) => {
  const { data } = await axiosInstance.get('/nursingInstitution/search', {
    params: { nursingInstitutionName: name },
  });
  return data.nursingInstitutionSimpleInfoList;
};

export const useSearchInstitution = (
  name: string,
  options?: Omit<
    UseQueryOptions<Institution[], unknown>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<Institution[], unknown>({
    queryKey: ['searchInstitution', name],
    queryFn: () => searchInstitution(name),
    enabled: !!name,
    ...options,
  });
}; //TODO

export const checkNicknameDuplicate = async (nickname: string) => {
  const { data } = await axiosInstance.get('/socialworker/check-nickname', {
    params: { nickname },
  });
  return data;
};
