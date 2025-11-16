import { useRef, useState } from 'react';
import { useGetPresignedUrl } from '@/api/presignedUrl';

export const useProfileImg = (endpoint: string) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImgAction, setSelectedImgAction] = useState('');

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tempKey, setTempKey] = useState<string | null>(null);

  const { mutateAsync: getPresignedUrl } = useGetPresignedUrl(endpoint);

  // 파일 업로드
  const handleImageChange = async (file: File) => {
    // 1) presigned url 요청
    const { presignedUrl, tempKey } = await getPresignedUrl({
      fileName: file.name,
      contentType: file.type,
    });

    // 2) S3 PUT 업로드
    await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    // 3) 프리뷰/키 저장
    // setPreviewUrl(URL.createObjectURL(file));
    setPreviewUrl(presignedUrl.split('?')[0]);
    setTempKey(tempKey);
    setSelectedImgAction('앨범');
  };

  // 서버에 넘길 최종 key
  const getProfileImageKeyForServer = () => {
    if (selectedImgAction === '기본') return 'default';
    if (selectedImgAction === '앨범') return tempKey;
    return null;
  };

  return {
    fileInputRef,

    previewUrl,
    selectedImgAction,
    tempKey,

    setPreviewUrl,
    setSelectedImgAction,
    handleImageChange,
    getProfileImageKeyForServer,
  };
};
