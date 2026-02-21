import { MEDIA_LIMITS } from '@/constants/common/system';

/* useMedia */
export interface ValidationResult {
  isValid: boolean;
  title: string;
  message: string;
}

// 이미지 검증
export const validateImage = (
  file: File,
  currentPhotosCount: number,
  newPhotosCount: number,
): ValidationResult => {
  if (currentPhotosCount + newPhotosCount > MEDIA_LIMITS.PHOTO.COUNT) {
    return {
      isValid: false,
      title: '사진이 크기 제한을 초과해요.',
      message: `사진 1장당 최대 크기는 ${MEDIA_LIMITS.PHOTO.SIZE_MB}MB입니다.\n사진은 최대 ${MEDIA_LIMITS.PHOTO.COUNT}장까지 첨부 가능합니다.`,
    };
  }
  if (file.size > MEDIA_LIMITS.PHOTO.SIZE_MB * 1024 * 1024) {
    return {
      isValid: false,
      title: '사진이 크기 제한을 초과해요.',
      message: `사진 1장당 최대 크기는 ${MEDIA_LIMITS.PHOTO.SIZE_MB}MB입니다.\n사진은 최대 ${MEDIA_LIMITS.PHOTO.COUNT}장까지 첨부 가능합니다.`,
    };
  }
  return { isValid: true, title: '', message: '' };
};

// 비디오 검증
export const validateVideo = (
  file: File,
  currentVideosCount: number,
  newVideosCount: number,
): ValidationResult => {
  if (currentVideosCount + newVideosCount > MEDIA_LIMITS.VIDEO.COUNT) {
    return {
      isValid: false,
      title: '동영상이 크기 제한을 초과해요.',
      message: `영상 1건당 최대 크기는 ${MEDIA_LIMITS.VIDEO.SIZE_GB}GB(15분)입니다.\n영상은 최대 ${MEDIA_LIMITS.VIDEO.COUNT}건까지 첨부 가능합니다.`,
    };
  }
  if (file.size > MEDIA_LIMITS.VIDEO.SIZE_GB * 1024 * 1024 * 1024) {
    return {
      isValid: false,
      title: '동영상이 크기 제한을 초과해요.',
      message: `영상 1건당 최대 크기는 ${MEDIA_LIMITS.VIDEO.SIZE_GB}GB(15분)입니다.\n영상은 최대 ${MEDIA_LIMITS.VIDEO.COUNT}건까지 첨부 가능합니다.`,
    };
  }
  return { isValid: true, title: '', message: '' };
};

// 파일 검증
export const validateFile = (
  file: File,
  currentFilesCount: number,
  newFilesCount: number,
  currentTotalSize: number,
  newFilesTotalSize: number,
): ValidationResult => {
  if (currentFilesCount + newFilesCount > MEDIA_LIMITS.FILE.COUNT) {
    return {
      isValid: false,
      title: '파일이 크기 제한을 초과해요.',
      message: `파일 1건당 최대 크기는 ${MEDIA_LIMITS.FILE.SIZE_MB}MB이며,\n한 게시글당 최대 크기 ${MEDIA_LIMITS.FILE.TOTAL_MB}MB,\n파일 개수는 ${MEDIA_LIMITS.FILE.COUNT}건까지 첨부 가능합니다.`,
    };
  }
  if (file.size > MEDIA_LIMITS.FILE.SIZE_MB * 1024 * 1024) {
    return {
      isValid: false,
      title: '파일이 크기 제한을 초과해요.',
      message: `파일 1건당 최대 크기는 ${MEDIA_LIMITS.FILE.SIZE_MB}MB이며,\n한 게시글당 최대 크기 ${MEDIA_LIMITS.FILE.TOTAL_MB}MB,\n파일 개수는 ${MEDIA_LIMITS.FILE.COUNT}건까지 첨부 가능합니다.`,
    };
  }
  if (
    currentTotalSize + newFilesTotalSize >
    MEDIA_LIMITS.FILE.TOTAL_MB * 1024 * 1024
  ) {
    return {
      isValid: false,
      title: '파일이 크기 제한을 초과해요.',
      message: `파일 1건당 최대 크기는 ${MEDIA_LIMITS.FILE.SIZE_MB}MB이며,\n한 게시글당 최대 크기 ${MEDIA_LIMITS.FILE.TOTAL_MB}MB,\n파일 개수는 ${MEDIA_LIMITS.FILE.COUNT}건까지 첨부 가능합니다.`,
    };
  }
  return { isValid: true, title: '', message: '' };
};

// 영상 길이 가져오기
export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;

    const fileURL = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(fileURL);
      resolve(video.duration);
    };

    video.onerror = () => {
      URL.revokeObjectURL(fileURL);
      reject(new Error('Failed to load video metadata.'));
    };

    video.src = fileURL;
  });
};
