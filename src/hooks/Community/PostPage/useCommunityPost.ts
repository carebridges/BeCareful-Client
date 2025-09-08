import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BOARD_PARAM_TO_EN } from '@/constants/community/communityBoard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useDeletePost, usePostDetail } from '@/api/community';

export const useCommunityPost = () => {
  const { handleNavigate } = useHandleNavigate();

  const { boardType: boardType, postId: postIdParam } = useParams<{
    boardType: string;
    postId: string;
  }>();
  const parsedPostId = Number(postIdParam);
  const postId =
    Number.isInteger(parsedPostId) && parsedPostId > 0 ? parsedPostId : 0;
  const apiBoardType =
    BOARD_PARAM_TO_EN[boardType ?? 'association'] ?? 'association-notice';

  // 게시글 상세 조회
  const { data: post } = usePostDetail(apiBoardType, postId);

  // 게시글 수정하기
  const handleEditPost = useCallback(() => {
    if (post && post.postId) {
      handleNavigate(`/community/edit/${boardType}/${post.postId}`);
    }
  }, [post, boardType, handleNavigate]);

  // 게시글 삭제하기
  const { mutate: deletePost } = useDeletePost(apiBoardType, postId);
  const handleDeletePost = useCallback(() => {
    if (!apiBoardType || !Number.isInteger(postId) || postId <= 0) return;
    deletePost(undefined, {
      onSuccess: () => {
        handleNavigate('/community');
      },
    });
  }, [apiBoardType, postId, deletePost, handleNavigate]);

  // 게시글 수정, 삭제 bottomsheet
  const [isPostActionSheetOpen, setIsPostActionSheetOpen] = useState(false);
  const [selectedPostAction, setSelectedPostAction] = useState('');

  const handlePostActionSheetConfirm = useCallback(() => {
    if (selectedPostAction == '수정하기') {
      handleEditPost();
    } else if (selectedPostAction == '삭제하기') {
      handleDeletePost();
    }
    setIsPostActionSheetOpen(false);
  }, [selectedPostAction, handleEditPost, handleDeletePost]);

  return {
    boardType,
    apiBoardType,
    postId,
    post,
    isPostActionSheetOpen,
    setIsPostActionSheetOpen,
    selectedPostAction,
    setSelectedPostAction,
    handlePostActionSheetConfirm,
  };
};
