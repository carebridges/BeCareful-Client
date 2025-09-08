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
  const handleCommentSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      // 댓글 내용이 비어있으면 전송 x
      return;
    }
    const commentRequest: CommentRequest = { content: comment };
    postCommentMutate(commentRequest, {
      onSuccess: () => {
        setComment('');
      },
    });
  };

  // 댓글 action sheet
  const [isCommentActionSheetOpen, setIsCommentActionSheetOpen] =
    useState(false);
  const [selectedCommentAction, setSelectedCommentAction] = useState('');

  // action sheet 열린 댓글
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );

  // 댓글 수정하기
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [isEditingComment, setIsEditingComment] = useState(false);
  const handleEditComment = useCallback(() => {
    if (selectedCommentId === null || !comments) return;

    const commentToEdit = comments.find(
      (comment) => comment.commentId === selectedCommentId,
    );
    if (commentToEdit) {
      setEditingCommentContent(commentToEdit.content);
      setIsEditingComment(true);
      setIsCommentActionSheetOpen(false);
    }
  }, [selectedCommentId, comments]);

  const { mutate: updateComment } = usePutCommentMutation(apiBoardType, postId);
  const editComment = useCallback(() => {
    if (selectedCommentId === null || !editingCommentContent.trim()) {
      return;
    }
    const updatedCommentData: CommentRequest = {
      content: editingCommentContent,
    };
    updateComment(
      { commentId: selectedCommentId, comment: updatedCommentData },
      {
        onSuccess: () => {
          setIsEditingComment(false);
          setEditingCommentContent('');
          setSelectedCommentId(null);
        },
      },
    );
  }, [selectedCommentId, editingCommentContent, updateComment]);

  // 댓글 삭제하기
  const { mutate: deleteComment } = useDeleteComment(apiBoardType, postId);
  const handleDeleteComment = useCallback(() => {
    if (selectedCommentId === null) return;
    deleteComment(selectedCommentId, {
      onSuccess: () => {
        setSelectedCommentId(null);
        setIsCommentActionSheetOpen(false);
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
    handleCommentChange,
    handleCommentSend,

    selectedCommentId,
    setSelectedCommentId,
    isEditingComment,
    setIsEditingComment,
    editingCommentContent,
    setEditingCommentContent,
    editComment,

    selectedCommentAction,
    setSelectedCommentAction,
    isCommentActionSheetOpen,
    setIsCommentActionSheetOpen,
    handleCommentActionSheetConfirm,
  };
};
