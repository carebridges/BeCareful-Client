import { axiosInstance } from '@/api/axiosInstance';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { PublicApiDto } from '@/types/Institution';
import { Institution } from '@/types/SocialSignUp';
import { getAddressFromPublicApi } from '@/utils/getAddressFromPublicApi';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useUploadInstitutionProfileImage = () =>
  useMutation({
    mutationFn: async ({ file, name }: { file: File; name: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('institutionName', name);

      const { data } = await axiosInstance.post(
        '/nursingInstitution/upload-profile-img',
        formData,
      );
      return data.profileImageUrl as string;
    },
  });

export const useRegisterInstitution = () =>
  useMutation({
    mutationFn: async (formData: InstitutionFormData) => {
      const { data } = await axiosInstance.post(
        '/nursingInstitution/for-guest/register',
        formData,
      );
      return data.institutionId as number;
    },
  });

export const checkInstitutionCode = async (code: string): Promise<boolean> => {
  const { data } = await axiosInstance.get<boolean>(
    '/nursingInstitution/for-guest/check/already-register',
    {
      params: { nursingInstitutionCode: code },
    },
  );
  return data;
};

export const useCheckInstitutionCode = (
  code: string,
  options?: Omit<UseQueryOptions<boolean>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<boolean>({
    queryKey: ['check-institution-code', code],
    queryFn: () => checkInstitutionCode(code),
    enabled: !!code,
    ...options,
  });
};

const PUBLIC_API_SERVICE_KEY = import.meta.env.VITE_APP_PUBLIC_API_KEY;

export const fetchInstitutionsBySiDo = async (siDoCd: string) => {
  const url = `https://apis.data.go.kr/B550928/searchLtcInsttService01/getLtcInsttSeachList01?siDoCd=${siDoCd}&numOfRows=10000&_type=json&serviceKey=${PUBLIC_API_SERVICE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data?.response?.body?.items?.item ?? []) as PublicApiDto[];
};

export const mapPublicApiDtoToInstitution = (
  it: PublicApiDto,
):
  | (Institution & { address?: string; siDoCd?: number; siGunGuCd?: number })
  | null => {
  if (!it.longTermAdminSym || !it.adminNm) return null;

  const siDoCdNum = Number(it.siDoCd);
  const siGunGuCdNum = Number(it.siGunGuCd);

  return {
    institutionId: Number(it.longTermAdminSym),
    institutionName: it.adminNm.trim(),
    institutionStreetAddress: '',
    institutionDetailAddress: '',
    address: getAddressFromPublicApi(siDoCdNum, siGunGuCdNum),
    siDoCd: siDoCdNum,
    siGunGuCd: siGunGuCdNum,
  };
};
