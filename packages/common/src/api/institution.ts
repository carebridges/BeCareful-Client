'use client';

import { axiosInstance } from './axiosInstance';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  Institution,
  InstitutionFormData,
  PresignedUrlResponse,
  PublicApiDto,
  UploadResult,
} from '../types';
import { getAddressFromPublicApi } from '../utils/getAddressFromPublicApi';

/* 기관 프로필 이미지 업로드 */
export const useUploadInstitutionProfileImage = () =>
  useMutation<UploadResult, Error, File>({
    mutationFn: async (file) => {
      const contentType =
        file.type && file.type.trim() !== ''
          ? file.type
          : 'application/octet-stream';

      const { data } = await axiosInstance.post<PresignedUrlResponse>(
        '/nursingInstitution/profile-img/presigned-url',
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

const getApiKey = (): string => {
  // 1. Next.js/Node 환경 체크
  if (
    typeof process !== 'undefined' &&
    process.env?.NEXT_PUBLIC_PUBLIC_API_KEY
  ) {
    return process.env.NEXT_PUBLIC_PUBLIC_API_KEY;
  }

  try {
    const meta = import.meta as ImportMeta & {
      readonly env: {
        readonly VITE_APP_PUBLIC_API_KEY?: string;
        [key: string]: string | boolean | undefined;
      };
    };

    if (meta.env?.VITE_APP_PUBLIC_API_KEY) {
      return meta.env.VITE_APP_PUBLIC_API_KEY;
    }
  } catch (e) {
    console.log(e);
  }

  return '';
};

const PUBLIC_API_SERVICE_KEY = getApiKey();

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
