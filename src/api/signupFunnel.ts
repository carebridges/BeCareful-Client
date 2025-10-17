import { axiosInstance } from '@/api/axiosInstance';
import { SearchInstitution, SignUpPayload } from '@/types/SocialSignUp';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const signUpMember = async (payload: SignUpPayload) => {
  const { data } = await axiosInstance.post('/social-worker/signup', payload);
  return data;
};

export const useSignUpMember = () => {
  return useMutation({ mutationFn: signUpMember });
};

export const searchInstitution = async (
  name: string,
): Promise<SearchInstitution[]> => {
  const { data } = await axiosInstance.get<SearchInstitution[]>(
    '/nursingInstitution/search',
    { params: { nursingInstitutionName: name } },
  );
  return data ?? [];
};

export const useSearchInstitution = (
  name: string,
  options?: Omit<
    UseQueryOptions<SearchInstitution[], unknown>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<SearchInstitution[], unknown>({
    queryKey: ['searchInstitution', name],
    queryFn: () => searchInstitution(name),
    enabled: !!name,
    ...options,
  });
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const { data } = await axiosInstance.get('/social-worker/check-nickname', {
    params: { nickname },
  });
  return data;
};
