import { MediaItem } from '@/types/Community/common';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  processUploadResults,
  validateAttachedFile,
  validateImageFile,
  validateVideoFile,
  ValidationResult,
} from '@/utils/fileValidation';
import { usePostMediaMutation } from '@/hooks/Community/api/usePostMediaMutation';
import { useModals } from './useModals';
import { PostDetailResponse } from '@/types/Community/post';

/* CommunityWritePage */
export const useMedia = (initialData?: PostDetailResponse) => {
  const { handleOpenLimitModal } = useModals();

  // 미디어 등록 api mutation
  const { mutateAsync: postMediaMutate } = usePostMediaMutation();

  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<MediaItem[]>(
    initialData?.imageList || [],
  );
  const [videos, setVideos] = useState<MediaItem[]>(
    initialData?.videoList || [],
  );
  const [attachedFiles, setAttachedFiles] = useState<MediaItem[]>(
    initialData?.fileUList || [],
  );

  useEffect(() => {
    if (initialData) {
      setPhotos(initialData.imageList || []);
      setVideos(initialData.videoList || []);
      setAttachedFiles(initialData.fileUList || []);
    } else {
      setPhotos([]);
      setVideos([]);
      setAttachedFiles([]);
    }
  }, [initialData]);

  const handlePhotoClick = () => {
    photoRef.current?.click();
  };
  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const contentUpload = async (
    files: File[],
    fileType: 'IMAGE' | 'VIDEO' | 'FILE',
    currentItems: MediaItem[],
    setter: React.Dispatch<React.SetStateAction<MediaItem[]>>,
    validationFn: (
      file: File,
      ...args: number[]
    ) => { isValid: boolean; title: string; message: string },
  ) => {
    const filesToUpload: File[] = []; // 업로드할 파일
    let newFilesTotalSize = 0; // 선택된 새로운 파일들 총 사이즈

    // 이전 파일들 총 사이즈, files에서만 사용
    const currentTotalAttachedFilesSize = attachedFiles.reduce(
      (sum, item) => sum + item.fileSize,
      0,
    );

    // 사용자가 선택한 모든 파일 검사
    for (const file of files) {
      let validationResult: ValidationResult;

      if (fileType === 'IMAGE') {
        validationResult = validationFn(
          file,
          currentItems.length,
          filesToUpload.length,
        ) as ValidationResult;
      } else if (fileType === 'VIDEO') {
        validationResult = validationFn(
          file,
          currentItems.length,
          filesToUpload.length,
        ) as ValidationResult;
      } else {
        validationResult = validationFn(
          file,
          currentItems.length, // 현재 파일 개수
          filesToUpload.length, // 유효성 검사 통과한 새로운 파일 개수
          currentTotalAttachedFilesSize, // 총 사이즈
          newFilesTotalSize + file.size, // 새로 선택된 파일들 총 사이즈
        );
      }

      if (!validationResult.isValid) {
        handleOpenLimitModal(validationResult.title, validationResult.message);
        continue;
      }

      filesToUpload.push(file);
      if (fileType === 'FILE') {
        newFilesTotalSize += file.size; // 유효한 파일의 용량만 합산
      }
    }

    if (filesToUpload.length === 0) return;

    // 유효성 검사를 통과한 사진/동영상 파일들에 대해 mutateAsync 호출 Promise 생성
    const uploadPromises = filesToUpload.map((file) =>
      postMediaMutate({ file, fileTypeParam: fileType }),
    );

    try {
      const results = await Promise.allSettled(uploadPromises);
      const successfulUploads = processUploadResults(results);
      // 성공적으로 업로드된 파일들만 상태에 추가
      setter((prev) => [...prev, ...successfulUploads]);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const handleMediaChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = ''; // 동일 파일 재선택 가능하도록

    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    const videoFiles = files.filter((f) => f.type.startsWith('video/'));

    await contentUpload(
      imageFiles,
      'IMAGE',
      photos,
      setPhotos,
      validateImageFile,
    );
    await contentUpload(
      videoFiles,
      'VIDEO',
      videos,
      setVideos,
      validateVideoFile,
    );
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';

    await contentUpload(
      files,
      'FILE',
      attachedFiles,
      setAttachedFiles,
      validateAttachedFile,
    );
  };

  return {
    photos,
    videos,
    attachedFiles,
    photoRef,
    fileRef,
    setPhotos,
    setVideos,
    setAttachedFiles,
    handlePhotoClick,
    handleFileClick,
    handleMediaChange,
    handleFileChange,
  };
};
