import { useParams } from 'react-router-dom';
import { BOARD_PARAM_TO_EN } from '@/constants/community/communityBoard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useDeletePost, usePostDetail } from '@/api/community';

export const usePostData = () => {
  const { handleNavigate } = useHandleNavigate();

  const { boardType: boardType, postId: postIdParam } = useParams<{
    boardType: string;
    postId: string;
  }>();
  const postId = postIdParam ? parseInt(postIdParam, 10) : 0;
  const apiBoardType = BOARD_PARAM_TO_EN[boardType ?? 'association'];

  // 게시글 상세 조회
  const { data: post, error: postDetailError } = usePostDetail(
    apiBoardType,
    postId,
  );

  // 게시글 수정, 삭제하기 api
  const handleEditPost = () => {
    if (post && post.postId) {
      handleNavigate(`/community/edit/${boardType}/${post.postId}`);
    }
  };
  const { mutate: deletePost } = useDeletePost(apiBoardType, postId);

  const handleDeletePost = () => {
    if (!apiBoardType || postId <= 0) return;
    deletePost(undefined, {
      onSuccess: () => {
        handleNavigate('/community');
      },
    });
  };

  return {
    boardType,
    postId,
    apiBoardType,
    post,
    postDetailError,
    handleEditPost,
    handleDeletePost,
  };
};
