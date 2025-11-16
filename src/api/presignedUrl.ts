import { axiosInstance } from './axiosInstance';
import { useMutation } from '@tanstack/react-query';
import {
  MediaPresignedUrlRequest,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '@/types/common/presignedUrl';
import { MediaItemRequest } from '@/types/Community/common';
import { getVideoDuration } from '@/utils/communityMedia';

export const useGetPresignedUrl = (endpoint: string) => {
  return useMutation({
    mutationFn: async (request: PresignedUrlRequest) => {
      const response = await axiosInstance.post(endpoint, request);
      return response.data;
    },
    onSuccess: (response) => {
      console.log('useGetPresignedUrl 성공:', response.data);
    },
    onError: (error) => {
      console.error('useGetPresignedUrl 실패:', error);
    },
  });
};

export const usePostMediaMutation = () => {
  const postMediaMutate = async ({
    file,
    fileTypeParam,
  }: {
    file: File;
    fileTypeParam: 'IMAGE' | 'VIDEO' | 'FILE';
  }): Promise<MediaItemRequest> => {
    let videoDuration = 0;
    if (fileTypeParam === 'VIDEO') {
      videoDuration = await getVideoDuration(file);
    }

    const presignedRequest: MediaPresignedUrlRequest = {
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type,
      fileType: fileTypeParam,
      ...(fileTypeParam === 'VIDEO' && { videoDuration }),
    };

    const presignedResponse = await axiosInstance.post<PresignedUrlResponse>(
      `/community/post/media/presigned-url`,
      null,
      { params: presignedRequest },
    );
    const { tempKey, presignedUrl } = presignedResponse.data;

    const uploadToS3Response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });
    if (!uploadToS3Response.ok) throw new Error('S3 업로드 실패');

    return {
      fileName: file.name,
      tempKey,
      fileType: fileTypeParam,
      fileSize: file.size,
      ...(fileTypeParam === 'VIDEO' && { videoDuration }),
    };
  };

  return useMutation({
    mutationFn: postMediaMutate,
  });
};
