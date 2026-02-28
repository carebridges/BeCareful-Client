'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  Comment,
  CommentRequest,
  CommunityAccessResponse,
  CommunityHomeResponse,
  MediaItemRequest,
  PageableRequest,
  PostCreateRequest,
  PostDetailResponse,
  PostListItem,
  PostUpdateRequest,
} from '@/types/community';
import { getVideoDuration } from '@/utils/media';
import {
  axiosInstance,
  MediaPresignedUrlRequest,
  PresignedUrlResponse,
} from '@repo/common';

// ==================== 커뮤니티 홈 ====================
/* 커뮤니티 탭 접근 권한 검증 */
export const useCommunityAccess = (): UseQueryResult<CommunityAccessResponse> =>
  useQuery({
    queryKey: ['communityAccess'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/community/access');
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, //TODO
  });

/* 커뮤니티 탭 협회 정보 조회 */
export const useCommunityHome = (enabled: boolean) => {
  return useQuery<CommunityHomeResponse, Error>({
    queryKey: ['communityHome'],
    queryFn: async () => {
      const response = await axiosInstance.get('/community/home');
      return response.data;
    },
    enabled: enabled,
  });
};

// ==================== 게시글 ====================
/* 미디어 업로드 */
export const useUploadMedia = () => {
  const uploadMedia = async ({
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
    mutationFn: uploadMedia,
  });
};

/* 모든 게시판의 필독 게시글 모아보기 */
export const useImportantPosts = (pageable: PageableRequest) => {
  return useQuery<PostListItem[], Error>({
    queryKey: ['importantPosts', pageable],
    queryFn: async () => {
      const response = await axiosInstance.get('/community/post/important', {
        params: {
          page: pageable.page,
          size: pageable.size,
          ...(pageable.sort &&
            pageable.sort.length > 0 && { sort: pageable.sort }),
        },
      });
      return response.data;
    },
  });
};

/* 특정 게시판의 모든 게시글 리스트 조회 */
export const getPostList = async (
  pageable: PageableRequest,
  boardType: string,
): Promise<PostListItem[]> => {
  const response = await axiosInstance.get(
    `/community/board/${boardType}/post`,
    {
      params: {
        page: pageable.page,
        size: pageable.size,
        ...(pageable.sort &&
          pageable.sort.length > 0 && { sort: pageable.sort }),
      },
    },
  );
  return response.data;
};

/* 특정 게시글 상세 조회 */
export const usePostDetail = (boardType: string, postId: number) => {
  return useQuery<PostDetailResponse, Error>({
    queryKey: ['postDetail', boardType, postId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/community/board/${boardType}/post/${postId}`,
      );
      return response.data;
    },
    enabled: !!boardType && postId > 0,
  });
};

/* 게시글 작성 */
export const useCreatePost = (boardType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: PostCreateRequest) => {
      const response = await axiosInstance.post(
        `/community/board/${boardType}/post`,
        postData,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList', boardType] });
      queryClient.invalidateQueries({ queryKey: ['importantPosts'] });
    },
  });
};

/* 게시글 수정 */
export const useUpdatePost = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: PostUpdateRequest) => {
      const response = await axiosInstance.put(
        `/community/board/${boardType}/post/${postId}`,
        postData,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
      queryClient.invalidateQueries({ queryKey: ['postList', boardType] });
      queryClient.invalidateQueries({ queryKey: ['importantPosts'] });
    },
  });
};

/* 게시글 삭제 */
export const useDeletePost = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/community/board/${boardType}/post/${postId}`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
      queryClient.invalidateQueries({ queryKey: ['postList', boardType] });
      queryClient.invalidateQueries({ queryKey: ['importantPosts'] });
      queryClient.removeQueries({ queryKey: ['comments', boardType, postId] });
    },
  });
};

// ==================== 댓글 ====================
/* 댓글 조회 */
export const useComments = (boardType: string, postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', boardType, postId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/community/board/${boardType}/post/${postId}/comment`,
      );
      return response.data;
    },
    enabled: !!boardType && postId > 0,
  });
};

/* 댓글 작성 */
export const useCreateComment = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: CommentRequest) => {
      const response = await axiosInstance.post(
        `/community/board/${boardType}/post/${postId}/comment`,
        comment,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
    },
  });
};

/* 댓글 수정 */
export const useUpdateComment = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      comment,
    }: {
      commentId: number;
      comment: CommentRequest;
    }) => {
      const response = await axiosInstance.put(
        `/community/board/${boardType}/post/${postId}/comment/${commentId}`,
        comment,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
    },
  });
};

/* 댓글 삭제 */
export const useDeleteComment = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) => {
      const response = await axiosInstance.delete(
        `/community/board/${boardType}/post/${postId}/comment/${commentId}`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
    },
  });
};
