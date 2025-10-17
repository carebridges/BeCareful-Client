import { useCallback, useState } from 'react';
import { CommentRequest } from '@/types/Community/comment';
import {
  useComments,
  useDeleteComment,
  usePostCommentMutation,
  usePutCommentMutation,
} from '@/api/community';

export const useCommunityComments = (apiBoardType: string, postId: number) => {
  // 댓글 조회
  const { data: comments } = useComments(apiBoardType, postId);

  // 댓글 작성
  const [comment, setComment] = useState('');
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const { mutate: postCommentMutate } = usePostCommentMutation(
    apiBoardType,
    postId,
  );

  // 댓글 action sheet
  const [isCommentActionSheetOpen, setIsCommentActionSheetOpen] =
    useState(false);
  const [selectedCommentAction, setSelectedCommentAction] = useState('');

  // action sheet 열린 댓글
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );

  // 댓글 수정 모드 여부
  const [isEditingComment, setIsEditingComment] = useState(false);

  // 댓글 수정하기
  const { mutate: updateComment } = usePutCommentMutation(apiBoardType, postId);
  const handleEditComment = useCallback(() => {
    if (selectedCommentId === null || !comments) return;

    const commentToEdit = comments.find(
      (comment) => comment.commentId === selectedCommentId,
    );
    if (commentToEdit) {
      setComment(commentToEdit.content);
      setIsEditingComment(true);
      setIsCommentActionSheetOpen(false);
    }
  }, [selectedCommentId, comments]);

  // 댓글 전송 버튼 클릭
  const handleCommentSend = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!comment.trim()) {
      // 댓글 내용이 비어있으면 전송 x
      return;
    }
    const commentRequest: CommentRequest = { content: comment };

    if (isEditingComment && selectedCommentId !== null) {
      updateComment(
        { commentId: selectedCommentId, comment: commentRequest },
        {
          onSuccess: () => {
            setComment('');
            setIsEditingComment(false);
            setSelectedCommentId(null);
          },
        },
      );
    } else {
      postCommentMutate(commentRequest, {
        onSuccess: () => {
          setComment('');
        },
      });
    }
  };

  // 댓글 삭제하기
  const { mutate: deleteComment } = useDeleteComment(apiBoardType, postId);
  const handleDeleteComment = useCallback(() => {
    if (selectedCommentId === null) return;
    deleteComment(selectedCommentId, {
      onSuccess: () => {
        setSelectedCommentId(null);
        setIsCommentActionSheetOpen(false);
        setSelectedCommentAction('');
      },
    });
  }, [deleteComment, selectedCommentId]);

  const handleCommentActionSheetConfirm = () => {
    if (selectedCommentAction == '수정하기') {
      handleEditComment();
    } else if (selectedCommentAction == '삭제하기') {
      handleDeleteComment();
    }
    setIsCommentActionSheetOpen(false);
    setSelectedCommentAction('');
  };

  return {
    comments,

    comment,
    setComment,
    handleCommentChange,
    handleCommentSend,

    selectedCommentId,
    setSelectedCommentId,
    isEditingComment,
    setIsEditingComment,

    selectedCommentAction,
    setSelectedCommentAction,
    isCommentActionSheetOpen,
    setIsCommentActionSheetOpen,
    handleCommentActionSheetConfirm,
  };
};
