import { useState } from 'react';

interface ModalContent {
  title: string;
  detail: string;
}

export const useModals = () => {
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: '',
    detail: '',
  });

  // limit modal
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const handleOpenLimitModal = (title: string, detail: string) => {
    setModalContent({ title, detail });
    setIsLimitModalOpen(true);
  };
  const handleCloseLimitModal = () => {
    setIsLimitModalOpen(false);
    setModalContent({ title: '', detail: '' });
  };

  // 임시저장 모달
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // 나가기 모달
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  // 등록 모달
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  // 링크 첨부 모달
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // 링크 첨부 bottom sheet
  const [isUrlSheetOpen, setIsUrlSheetOpen] = useState(false);

  return {
    modalContent,
    isLimitModalOpen,
    isSaveModalOpen,
    isCloseModalOpen,
    isPostModalOpen,
    isLinkModalOpen,
    setIsSaveModalOpen,
    setIsCloseModalOpen,
    setIsPostModalOpen,
    setIsLinkModalOpen,
    handleOpenLimitModal,
    handleCloseLimitModal,
    isUrlSheetOpen,
    setIsUrlSheetOpen,
  };
};
