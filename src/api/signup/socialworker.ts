import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { SignUpPayload } from '@/types/auth';
import { InstitutionInfo } from '@/types/institution';
import { UploadResult, PresignedUrlResponse } from '@/types/common';

export const useUploadSocialWorkerProfileImage = () =>
  useMutation<UploadResult, Error, File>({
    mutationFn: async (file) => {
      const contentType =
        file.type && file.type.trim() !== ''
          ? file.type
          : 'application/octet-stream';

      const { data } = await axiosInstance.post<PresignedUrlResponse>(
        '/social-worker/profile-img/presigned-url',
        null,
        {
          params: {
            fileName: file.name,
            contentType,
          },
        },
      );

      const res = await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: file,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`S3 PUT 실패 ${res.status}: ${body}`);
      }

      return {
        tempKey: data.tempKey,
        previewUrl: URL.createObjectURL(file),
      };
    },
  });

/* 사회복지사 회원가입 */
export const signUpMember = async (payload: SignUpPayload) => {
  const { data } = await axiosInstance.post('/social-worker/signup', payload);
  return data;
};

export const useSignUpMember = () => {
  return useMutation({ mutationFn: signUpMember });
};

export const searchInstitution = async (
  name: string,
): Promise<InstitutionInfo[]> => {
  const { data } = await axiosInstance.get<InstitutionInfo[]>(
    '/nursingInstitution/search',
    { params: { nursingInstitutionName: name } },
  );
  return data ?? [];
};

export const useSearchInstitution = (
  name: string,
  options?: Omit<
    UseQueryOptions<InstitutionInfo[], unknown>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<InstitutionInfo[], unknown>({
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
