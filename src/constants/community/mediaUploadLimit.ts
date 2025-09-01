// 사진/이미지 제한
export const MAX_PHOTOS_COUNT = 100;
export const MAX_PHOTO_SIZE_MB = 30; // MB
export const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * 1024 * 1024;

// 동영상 제한
export const MAX_VIDEOS_COUNT = 10;
export const MAX_VIDEO_SIZE_GB = 1; // GB
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_GB * 1024 * 1024 * 1024;
export const MAX_VIDEO_DURATION_MIN = 15; // 분

// 일반 파일 제한
export const MAX_FILES_COUNT = 5;
export const MAX_FILE_SIZE_MB = 10; // MB
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_TOTAL_FILES_SIZE_MB = 30; // MB
export const MAX_TOTAL_FILES_SIZE_BYTES = MAX_TOTAL_FILES_SIZE_MB * 1024 * 1024;
