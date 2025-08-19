import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

type UploadMutationResponse = string;

interface UseProfileImageUploadProps<V> {
  initialImgUrl?: string;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  uploadMutate: UseMutateFunction<UploadMutationResponse, Error, V, unknown>;
  additionalUploadData?: { name?: string };
}

export const useProfileImageUpload = <V>({
  initialImgUrl,
  setIsChanged,
  uploadMutate,
  additionalUploadData,
}: UseProfileImageUploadProps<V>) => {
  const [imgUrl, setImgUrl] = useState(initialImgUrl);
  useEffect(() => {
    setImgUrl(initialImgUrl);
  }, [initialImgUrl]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: V) => {
    uploadMutate(file, {
      onSuccess: (url) => {
        setImgUrl(url);
        setIsChanged(true);
      },
      onError: (error) => {
        console.log('이미지 업로드 실패', error);
        setImgUrl(initialImgUrl);
        setIsChanged(false);
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      const uploadFile = additionalUploadData?.name
        ? ({ file: file, name: additionalUploadData.name } as V)
        : (file as V);

      handleImageUpload(uploadFile);
    } else {
      setImgUrl(initialImgUrl);
      setIsChanged(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return {
    imgUrl,
    fileInputRef,
    handleImageChange,
    handleCameraClick,
  };
};
