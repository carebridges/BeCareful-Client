import { PostDetailResponse } from '@/types/Community/post';
import { useState } from 'react';

interface UsePostActionsProps {
  onEditSuccess: () => void;
  onDelete: () => void;
  post?: PostDetailResponse;
}

export const usePostActions = ({
  onEditSuccess,
  onDelete,
  post,
}: UsePostActionsProps) => {
  // bottomsheet - 수정, 삭제 버튼
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const openActionSheet = () => setIsActionSheetOpen(true);
  const closeActionSheet = () => setIsActionSheetOpen(false);

  const handleActionSheetConfirm = () => {
    if (selectedAction == '수정하기') {
      if (post) {
        onEditSuccess();
      } else {
        console.log('수정하기 페이지 열기 실패 : 게시글 상세 정보 없음');
      }
    } else if (selectedAction == '삭제하기') {
      onDelete();
    }
    closeActionSheet();
  };

  return {
    isActionSheetOpen,
    setIsActionSheetOpen,
    openActionSheet,
    closeActionSheet,
    selectedAction,
    setSelectedAction,
    handleActionSheetConfirm,
  };
};
