import { CommunityHomeResponse } from '@/types/Community/community';
import { axiosInstance } from './axiosInstance';
import { MediaItem, PageableRequest } from '@/types/Community/common';
import {
  BoardPostListResponse,
  ImportantPostListResponse,
  PostDetailResponse,
  PostRequest,
} from '@/types/Community/post';
import { CommentListResponse, CommentRequest } from '@/types/Community/comment';
import { getVideoDuration } from '@/utils/communityMedia';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/* CommunityPage */
// 커뮤니티 탭 협회 정보 조회
export const useGetCommunityHome = (enabled: boolean) => {
  return useQuery<CommunityHomeResponse, Error>({
    queryKey: ['associationHome'],
    queryFn: async () => {
      const response = await axiosInstance.get('/community/home');
      return response.data;
    },
    enabled: enabled,
  });
};

// 미디어 파일 업로드
export const postMedia = async (
  file: File,
  fileTypeParam: 'FILE' | 'IMAGE' | 'VIDEO',
): Promise<MediaItem | null> => {
  const formData = new FormData();
  formData.append('file', file);

  let duration = 0;
  if (fileTypeParam === 'VIDEO') {
    try {
      duration = await getVideoDuration(file);
    } catch (e) {
      console.error(`영상 길이 얻기 실패: ${file.name}`, e);
      duration = 0;
    }
  }

  const response = await axiosInstance.post(
    '/community/media/upload',
    formData,
    {
      params: {
        fileType: fileTypeParam,
        ...(fileTypeParam === 'VIDEO' && { videoDuration: duration }),
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

// 게시글 작성
export const usePostPostingMutation = (boardType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: PostRequest) => {
      const response = await axiosInstance.post(
        `/community/board/${boardType}/post`,
        postData,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('usePostPostingMutation - 게시글 작성 성공:', response.data);
      queryClient.invalidateQueries({ queryKey: ['postingList', boardType] });
      queryClient.invalidateQueries({ queryKey: ['importantPostingList'] });
    },
    onError: (error) => {
      console.error('usePostPostingMutation - 게시글 작성 실패:', error);
    },
  });
};

// 게시글 수정
export const usePutPostingMutation = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: PostRequest) => {
      const response = await axiosInstance.put(
        `/community/board/${boardType}/post/${postId}`,
        postData,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('usePutPostingMutation - 게시글 수정 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
      queryClient.invalidateQueries({ queryKey: ['postingList', boardType] });
      queryClient.invalidateQueries({ queryKey: ['importantPostingList'] });
    },
    onError: (error) => {
      console.error('usePutPostingMutation - 게시글 수정 실패:', error);
    },
  });
};

// 게시글 삭제
export const useDeletePost = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/community/board/${boardType}/post/${postId}`,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('useDeletePost - 게시글 삭제 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
      queryClient.invalidateQueries({ queryKey: ['postingList', boardType] });
      queryClient.invalidateQueries({ queryKey: ['importantPostingList'] });
      queryClient.removeQueries({ queryKey: ['comments', boardType, postId] });
    },
    onError: (error) => {
      console.error('useDeletePost - 게시글 삭제 실패:', error);
    },
  });
};

/* CommunityHome */
// 모든 게시판의 필독 게시글 모아보기
export const useImportantPostings = (pageable: PageableRequest) => {
  return useQuery<ImportantPostListResponse, Error>({
    queryKey: ['importantPostingList', pageable],
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

// 특정 게시판의 모든 게시글 리스트 조회
export const getPostingList = async (
  pageable: PageableRequest,
  boardType: string,
): Promise<BoardPostListResponse> => {
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

/* CommunityPost */
// 특정 게시글 상세 조회
export const usePostDetail = (boardType: string, postId: number) => {
  return useQuery<PostDetailResponse, Error>({
    queryKey: ['postDetail', boardType, postId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/community/board/${boardType}/post/${postId}`,
      );
      return response.data;
    },
    enabled: !!boardType && postId > 0, // boardType과 postId가 유효할 때만 쿼리 실행
  });
};

// 댓글 조회
export const useComments = (boardType: string, postId: number) => {
  return useQuery<CommentListResponse, Error>({
    queryKey: ['comments', boardType, postId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/community/board/${boardType}/post/${postId}/comment`,
      );
      return response.data;
    },
    enabled: !!boardType && postId > 0, // boardType과 postId가 유효할 때만 쿼리 실행
  });
};

// 댓글 작성
export const usePostCommentMutation = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: CommentRequest) => {
      const response = await axiosInstance.post(
        `/community/board/${boardType}/post/${postId}/comment`,
        comment,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('usePostCommentMutation - 댓글 작성 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
    },
    onError: (error) => {
      console.error('usePostCommentMutation - 댓글 작성 실패:', error);
    },
  });
};

// 댓글 수정
export const usePutCommentMutation = (boardType: string, postId: number) => {
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
    onSuccess: (response) => {
      console.log('usePutCommentMutation - 댓글 수정 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
    },
    onError: (error) => {
      console.error('usePutCommentMutation - 댓글 수정 실패:', error);
    },
  });
};

// 댓글 삭제
export const useDeleteComment = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) => {
      const response = await axiosInstance.delete(
        `/community/board/${boardType}/post/${postId}/comment/${commentId}`,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('useDeleteComment - 댓글 삭제 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', boardType, postId],
      });
    },
    onError: (error) => {
      console.error('useDeleteComment - 댓글 삭제 실패:', error);
    },
  });
};
