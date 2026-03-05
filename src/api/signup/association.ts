import { axiosInstance } from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';
import { PresignedUrlResponse, UploadResult } from '@/types/common';

/* 협회 프로필 이미지 업로드 */
export const useUploadAssociationProfileImage = () =>
  useMutation<UploadResult, Error, File>({
    mutationFn: async (file) => {
      const ct =
        file.type && file.type.trim() !== ''
          ? file.type
          : 'application/octet-stream';

      const { data } = await axiosInstance.post<PresignedUrlResponse>(
        '/association/profile-img/presigned-url',
        null,
        { params: { fileName: file.name, contentType: ct } },
      );

      const res = await fetch(data.presignedUrl, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': ct },
        body: file,
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`S3 PUT  실패 ${res.status}: ${body}`);
      }

      return { tempKey: data.tempKey, previewUrl: URL.createObjectURL(file) };
    },
  });

export const useRegisterAssociation = () =>
  useMutation({
    mutationFn: async (formData: CommunityFormData) => {
      const { data } = await axiosInstance.post(
        '/association/create',
        formData,
      );
      return data;
    },
  });
