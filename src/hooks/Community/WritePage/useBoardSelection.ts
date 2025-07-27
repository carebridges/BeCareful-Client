import { useState } from 'react';

export const useBoardSelection = (boardType: string) => {
  // 게시판 선택 bottom sheet 열림 상태
  const [isBoardSheetOpen, setIsBoardSheetOpen] = useState(false);

  // 메인으로 표시될 게시판 유형 상태
  const [board, setBoard] = useState(
    boardType === '전체' ? '게시판 선택' : boardType,
  );

  const toggleBoardSheet = () => {
    if (!isBoardSheetOpen) {
      setTempBoard(board);
    }
    setIsBoardSheetOpen(!isBoardSheetOpen);
  };

  // 시트 내에서 임시로 선택된 게시판 유형 상태
  const [tempBoard, setTempBoard] = useState(board);
  const handleBoardSheetConfirm = () => {
    setBoard(tempBoard);
    setIsBoardSheetOpen(false);
  };

  return {
    isBoardSheetOpen,
    board,
    tempBoard,
    setIsBoardSheetOpen,
    setBoard,
    setTempBoard,
    toggleBoardSheet,
    handleBoardSheetConfirm,
  };
};
