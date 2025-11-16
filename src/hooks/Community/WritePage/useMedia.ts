import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  validateAttachedFile,
  validateImageFile,
  validateVideoFile,
  ValidationResult,
} from '@/utils/fileValidation';
import { usePostMediaMutation } from '@/api/presignedUrl';
import { useModals } from '@/hooks/Community/WritePage/useModals';
import { MediaItem, MediaItemRequest } from '@/types/Community/common';
import { PostDetailResponse } from '@/types/Community/post';

/* CommunityWritePage */
export const useMedia = (initialData?: PostDetailResponse) => {
  const { handleOpenLimitModal } = useModals();

  // 미디어 등록 api mutation
  const { mutateAsync: postMediaMutate } = usePostMediaMutation();

  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<(MediaItem | MediaItemRequest)[]>([]);
  const [videos, setVideos] = useState<(MediaItem | MediaItemRequest)[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<
    (MediaItem | MediaItemRequest)[]
  >([]);

  const [deleteMediaIdList, setDeleteMediaIdList] = useState<number[]>([]);

  useEffect(() => {
    if (initialData) {
      setPhotos(initialData.imageList || []);
      setVideos(initialData.videoList || []);
      setAttachedFiles(initialData.fileUList || []);
    }
  }, [initialData]);

  const handlePhotoClick = () => {
    photoRef.current?.click();
  };
  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const uploadToS3 = async (
    file: File,
    fileTypeParam: 'IMAGE' | 'VIDEO' | 'FILE',
  ): Promise<MediaItemRequest & { mediaUrl: string }> => {
    const uploaded = await postMediaMutate({
      file,
      fileTypeParam,
    });

    const mediaUrl = fileTypeParam === 'FILE' ? '' : URL.createObjectURL(file);

    return {
      ...uploaded,
      mediaUrl,
    };
  };

  const contentUpload = async (
    files: File[],
    fileType: 'IMAGE' | 'VIDEO' | 'FILE',
    currentItems: (MediaItem | MediaItemRequest)[],
    setter: React.Dispatch<
      React.SetStateAction<(MediaItem | MediaItemRequest)[]>
    >,
    validationFn: (
      file: File,
      ...args: number[]
    ) => { isValid: boolean; title: string; message: string },
  ) => {
    const filesToUpload: File[] = []; // 업로드할 파일

    // 선택된 새로운 파일들 총 사이즈
    let newFilesTotalSize = 0;
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
        );
      } else if (fileType === 'VIDEO') {
        validationResult = validationFn(
          file,
          currentItems.length,
          filesToUpload.length,
        );
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

    // 유효성 검사 통과한 파일들 presignedUrl 요청 + S3 업로드
    try {
      const results = await Promise.all(
        filesToUpload.map((file) => uploadToS3(file, fileType)),
      );

      // 성공적으로 업로드된 파일들만 상태에 추가
      setter((prev) => [...prev, ...results]);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ''; // 동일 파일 재선택 가능하도록

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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';

    await contentUpload(
      files,
      'FILE',
      attachedFiles,
      setAttachedFiles,
      validateAttachedFile,
    );
  };

  const remove = (
    key: number | string,
    items: (MediaItem | MediaItemRequest)[],
    setter: React.Dispatch<
      React.SetStateAction<(MediaItem | MediaItemRequest)[]>
    >,
  ) => {
    const itemToDelete = items.find(
      (item) =>
        (item as MediaItem).id === key ||
        (item as MediaItemRequest).tempKey === key,
    );

    if (itemToDelete && 'id' in itemToDelete) {
      setDeleteMediaIdList((prev) => [...prev, itemToDelete.id]);
    }

    setter((prev) =>
      prev.filter(
        (item) =>
          (item as MediaItem).id !== key &&
          (item as MediaItemRequest).tempKey !== key,
      ),
    );
  };

  const handleRemovePhoto = (key: number | string) => {
    remove(key, photos, setPhotos);
  };

  const handleRemoveVideo = (key: number | string) => {
    remove(key, videos, setVideos);
  };

  const handleRemoveAttachedFile = (key: number | string) => {
    remove(key, attachedFiles, setAttachedFiles);
  };

  return {
    photos,
    videos,
    attachedFiles,
    photoRef,
    fileRef,
    deleteMediaIdList,

    setPhotos,
    setVideos,
    setAttachedFiles,

    handlePhotoClick,
    handleFileClick,
    handleMediaChange,
    handleFileChange,

    handleRemovePhoto,
    handleRemoveVideo,
    handleRemoveAttachedFile,
  };
};
