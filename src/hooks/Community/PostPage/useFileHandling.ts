export const useFileHandling = () => {
  // 파일 다운로드
  const handleFileDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  // 원본 URL로 이동
  const handleOriginalLinkClick = (originalUrl?: string) => {
    if (originalUrl) {
      window.open(originalUrl, '_blank');
    }
  };

  return {
    handleFileDownload,
    handleOriginalLinkClick,
  };
};
