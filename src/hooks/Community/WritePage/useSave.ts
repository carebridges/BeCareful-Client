import { useEffect, useState } from 'react';
import { MediaItemRequest } from '@/types/Community/common';
import { getDraftStorageKey } from '@/utils/getDraftStorageKey';

interface PostData {
  title: string;
  content: string;
  isImportant: boolean;
  originalUrl: string;
}

interface MediaData {
  photos: MediaItemRequest[];
  videos: MediaItemRequest[];
  attachedFiles: MediaItemRequest[];
}

interface UseSaveProps {
  board: string;
  postData: PostData;
  mediaData: MediaData;
  setPostData: (data: PostData) => void;
  setMediaData: (data: MediaData) => void;
}

export const useSave = ({
  board,
  postData,
  mediaData,
  setPostData,
  setMediaData,
}: UseSaveProps) => {
  // 임시저장 모달
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // 이어쓰기 모달
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  // localStorage에 임시 저장
  const saveDraft = () => {
    const draftData = {
      ...postData,
      ...mediaData,
    };
    const storageKey = getDraftStorageKey(board);
    try {
      localStorage.setItem(storageKey, JSON.stringify(draftData));
      console.log(`${board} 임시 저장 완료:`, draftData);
      setIsSaveModalOpen(true);
    } catch (e) {
      console.error('임시 저장 중 오류 발생:', e);
    }
  };

  // 임시 저장 데이터 불러오기
  const loadDraft = () => {
    const storageKey = getDraftStorageKey(board);

    try {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        return JSON.parse(savedDraft);
      }
    } catch (e) {
      console.error('임시 저장 데이터 파싱 오류:', e);
    }
    return null;
  };

  // 임시 저장 데이터 삭제
  const clearDraft = () => {
    const storageKey = getDraftStorageKey(board);
    localStorage.removeItem(storageKey);
  };

  useEffect(() => {
    const draft = loadDraft();
    const hasDraft =
      !!draft &&
      (Boolean(draft.title?.trim()) ||
        Boolean(draft.content?.trim()) ||
        (draft.photos?.length ?? 0) > 0 ||
        (draft.videos?.length ?? 0) > 0 ||
        (draft.attachedFiles?.length ?? 0) > 0);
    if (hasDraft) setIsDraftModalOpen(true);
    else clearDraft();
  }, [board]);

  const continueWriting = () => {
    const draft = loadDraft();
    if (draft) {
      setPostData({
        title: draft.title || '',
        content: draft.content || '',
        isImportant: draft.isImportant || false,
        originalUrl: draft.originalUrl || '',
      });
      setMediaData({
        photos: draft.photos || [],
        videos: draft.videos || [],
        attachedFiles: draft.attachedFiles || [],
      });
    }
    setIsDraftModalOpen(false);
  };

  const newWriting = () => {
    clearDraft();
    setPostData({
      title: '',
      content: '',
      isImportant: true,
      originalUrl: '',
    });
    setMediaData({ photos: [], videos: [], attachedFiles: [] });
    setIsDraftModalOpen(false);
  };

  return {
    isSaveModalOpen,
    setIsSaveModalOpen,
    isDraftModalOpen,
    setIsDraftModalOpen,
    saveDraft,
    continueWriting,
    newWriting,
  };
};
