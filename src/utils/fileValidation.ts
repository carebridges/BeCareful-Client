import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  MAX_FILES_COUNT,
  MAX_PHOTO_SIZE_BYTES,
  MAX_PHOTO_SIZE_MB,
  MAX_PHOTOS_COUNT,
  MAX_TOTAL_FILES_SIZE_BYTES,
  MAX_TOTAL_FILES_SIZE_MB,
  MAX_VIDEO_SIZE_BYTES,
  MAX_VIDEO_SIZE_GB,
  MAX_VIDEOS_COUNT,
} from '@/constants/community/mediaUploadLimit';

/* useMedia */
export interface ValidationResult {
  isValid: boolean;
  title: string;
  message: string;
}

export const validateImageFile = (
  file: File,
  currentPhotosCount: number,
  newPhotosCount: number,
): ValidationResult => {
  if (currentPhotosCount + newPhotosCount > MAX_PHOTOS_COUNT) {
    return {
      isValid: false,
      title: '사진이 크기 제한을 초과해요.',
      message: `사진 1장당 최대 크기는 ${MAX_PHOTO_SIZE_MB}MB입니다.\n사진은 최대 ${MAX_PHOTOS_COUNT}장까지 첨부 가능합니다.`,
    };
  }
  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return {
      isValid: false,
      title: '사진이 크기 제한을 초과해요.',
      message: `사진 1장당 최대 크기는 ${MAX_PHOTO_SIZE_MB}MB입니다.\n사진은 최대 ${MAX_PHOTOS_COUNT}장까지 첨부 가능합니다.`,
    };
  }
  return { isValid: true, title: '', message: '' };
};

export const validateVideoFile = (
  file: File,
  currentVideosCount: number,
  newVideosCount: number,
): ValidationResult => {
  if (currentVideosCount + newVideosCount > MAX_VIDEOS_COUNT) {
    return {
      isValid: false,
      title: '동영상이 크기 제한을 초과해요.',
      message: `영상 1건당 최대 크기는 ${MAX_VIDEO_SIZE_GB}GB(15분)입니다.\n영상은 최대 ${MAX_VIDEOS_COUNT}건까지 첨부 가능합니다.`,
    };
  }
  if (file.size > MAX_VIDEO_SIZE_BYTES) {
    return {
      isValid: false,
      title: '동영상이 크기 제한을 초과해요.',
      message: `영상 1건당 최대 크기는 ${MAX_VIDEO_SIZE_GB}GB(15분)입니다.\n영상은 최대 ${MAX_VIDEOS_COUNT}건까지 첨부 가능합니다.`,
    };
  }
  return { isValid: true, title: '', message: '' };
};

export const validateAttachedFile = (
  file: File,
  currentFilesCount: number,
  newFilesCount: number,
  currentTotalSize: number,
  newFilesTotalSize: number,
): ValidationResult => {
  if (currentFilesCount + newFilesCount > MAX_FILES_COUNT) {
    return {
      isValid: false,
      title: '파일이 크기 제한을 초과해요.',
      message: `파일 1건당 최대 크기는 ${MAX_FILE_SIZE_MB}MB이며,\n한 게시글당 최대 크기 ${MAX_TOTAL_FILES_SIZE_MB}MB,\n파일 개수는 ${MAX_FILES_COUNT}건까지 첨부 가능합니다.`,
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      title: '파일이 크기 제한을 초과해요.',
      message: `파일 1건당 최대 크기는 ${MAX_FILE_SIZE_MB}MB이며,\n한 게시글당 최대 크기 ${MAX_TOTAL_FILES_SIZE_MB}MB,\n파일 개수는 ${MAX_FILES_COUNT}건까지 첨부 가능합니다.`,
    };
  }
  if (currentTotalSize + newFilesTotalSize > MAX_TOTAL_FILES_SIZE_BYTES) {
    return {
      isValid: false,
      title: '파일이 크기 제한을 초과해요.',
      message: `파일 1건당 최대 크기는 ${MAX_FILE_SIZE_MB}MB이며,\n한 게시글당 최대 크기 ${MAX_TOTAL_FILES_SIZE_MB}MB,\n파일 개수는 ${MAX_FILES_COUNT}건까지 첨부 가능합니다.`,
    };
  }
  return { isValid: true, title: '', message: '' };
};
