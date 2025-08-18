import { MediaItem } from '@/types/Community/common';
import { useModals } from './useModals';
import { useEffect } from 'react';
import { getDraftStorageKey } from '@/utils/getDraftStorageKey';

interface PostData {
  title: string;
  content: string;
  isImportant: boolean;
  originalUrl: string;
}

interface MediaData {
  photos: MediaItem[];
  videos: MediaItem[];
  attachedFiles: MediaItem[];
}

interface UseSaveProps {
  board: string;
  postData: PostData;
  mediaData: MediaData;
  setPostData: (data: PostData) => void;
  setMediaData: (data: {
    photos: MediaItem[];
    videos: MediaItem[];
    attachedFiles: MediaItem[];
  }) => void;
}

export const useSave = ({
  board,
  postData,
  mediaData,
  setPostData,
  setMediaData,
}: UseSaveProps) => {
  const { setIsSaveModalOpen } = useModals();

  // localStorage에 임시 저장
  const handleSaveDraft = () => {
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
  useEffect(() => {
    const storageKey = getDraftStorageKey(board);
    const savedDraft = localStorage.getItem(storageKey);

    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setPostData({
          title: draftData.title || '',
          content: draftData.content || '',
          isImportant: draftData.isImportant || false,
          originalUrl: draftData.originalUrl || '',
        });
        setMediaData({
          photos: draftData.photos || [],
          videos: draftData.videos || [],
          attachedFiles: draftData.attachedFiles || [],
        });
      } catch (e) {
        console.error('임시 저장 데이터 파싱 오류:', e);
        // localStorage.removeItem(storageKey);
      }
    }
  }, [board]);

  return { handleSaveDraft };
};
