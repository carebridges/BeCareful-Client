// 영상 길이 얻는 함수
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
