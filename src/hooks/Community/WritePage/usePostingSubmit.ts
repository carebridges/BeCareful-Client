import { PostCreateRequest, PostUpdateRequest } from '@/types/Community/post';
import { BOARD_MAP } from '@/constants/domain/community';
import { getDraftStorageKey } from '@/utils/getDraftStorageKey';
import { useCreatePost, useUpdatePost } from '@/api/community/community';

/* CommunityWritePage */
export const usePostingSubmit = (
  board: string,
  onClose: () => void,
  isEditMode: boolean,
  postId: number,
) => {
  if (isEditMode && !postId) {
    throw new Error('글쓰기 수정하기 - postId가 필요합니다.');
  }

  const requestBoard =
    BOARD_MAP.KR_TO_EN[board as keyof typeof BOARD_MAP.KR_TO_EN];

  // 게시글 작성 api mutation
  const { mutateAsync: postPostingMutate } = useCreatePost(requestBoard);

  // 게시글 수정 api mutation
  const { mutateAsync: putPostingMutate } = useUpdatePost(
    requestBoard,
    postId as number,
  );

  const handlePostSubmit = async (postData: PostCreateRequest) => {
    try {
      await postPostingMutate(postData);
      console.log('게시글 작성 완료', postData);

      const storageKey = getDraftStorageKey(board);
      localStorage.removeItem(storageKey);

      onClose();
    } catch (error) {
      console.log('게시글 작성 post 실패: ', error);
    }
  };

  const handleEditSubmit = async (postData: PostUpdateRequest) => {
    try {
      if (isEditMode && typeof postId === 'number') {
        await putPostingMutate(postData);
        console.log('게시글 수정 완료', postData);
      }

      const storageKey = getDraftStorageKey(board);
      localStorage.removeItem(storageKey);

      onClose();
    } catch (error) {
      console.log('게시글 수정 put 실패: ', error);
    }
  };

  return { handlePostSubmit, handleEditSubmit };
};
