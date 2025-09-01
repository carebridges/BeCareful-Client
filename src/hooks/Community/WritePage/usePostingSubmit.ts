import { PostRequest } from '@/types/Community/post';
import { BOARD_KR_TO_EN } from '@/constants/community/communityBoard';
import { getDraftStorageKey } from '@/utils/getDraftStorageKey';
import { usePostPostingMutation, usePutPostingMutation } from '@/api/community';

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

  const requestBoard = BOARD_KR_TO_EN[board];

  // 게시글 작성 api mutation
  const { mutateAsync: postPostingMutate } =
    usePostPostingMutation(requestBoard);

  // 게시글 수정 api mutation
  const { mutateAsync: putPostingMutate } = usePutPostingMutation(
    requestBoard,
    postId as number,
  );

  const handleSubmit = async (postData: PostRequest) => {
    try {
      if (isEditMode && typeof postId === 'number') {
        await putPostingMutate(postData);
        console.log('게시글 수정 완료', postData);
      } else {
        await postPostingMutate(postData);
        console.log('게시글 작성 완료', postData);
      }

      const storageKey = getDraftStorageKey(board);
      localStorage.removeItem(storageKey);

      onClose();
    } catch (error) {
      console.log('게시글 작성 post 실패: ', error);
    }
  };

  return { handleSubmit };
};
