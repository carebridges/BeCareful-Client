import { axiosInstance } from '@/api/axiosInstance';
import {
  buildCaregiverSignUpPayload,
  CaregiverSignUpFormData,
} from '@/types/CareGiverSignUp';
import { useMutation } from '@tanstack/react-query';

type Presigned = {
  tempKey: string;
  presignedUrl: string;
};

type UploadResult = {
  tempKey: string;
  previewUrl: string;
};

export const useUploadCareGiverProfileImage = () =>
  useMutation<UploadResult, Error, File>({
    mutationFn: async (file) => {
      const contentType =
        file.type && file.type.trim() !== ''
          ? file.type
          : 'application/octet-stream';

      const { data } = await axiosInstance.post<Presigned>(
        '/caregiver/profile-img/presigned-url',
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
export const useRegisterCaregiver = () =>
  useMutation({
    mutationFn: async (formData: CaregiverSignUpFormData) => {
      const payload = buildCaregiverSignUpPayload(formData);
      const { data } = await axiosInstance.post('/caregiver/signup', payload);
      return data.institutionId as number;
    },
  });
