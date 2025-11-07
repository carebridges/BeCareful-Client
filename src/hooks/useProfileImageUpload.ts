import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

interface UseProfileImageUploadProps<V, R = string> {
  initialImgUrl?: string;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  uploadMutate: UseMutateFunction<R, Error, V, unknown>;
  getUrl?: (res: R) => string;
  additionalUploadData?: { name?: string };
}

export const useProfileImageUpload = <V, R = string>({
  initialImgUrl,
  setIsChanged,
  uploadMutate,
  getUrl,
  additionalUploadData,
}: UseProfileImageUploadProps<V, R>) => {
  const [imgUrl, setImgUrl] = useState(initialImgUrl);
  useEffect(() => {
    setImgUrl(initialImgUrl);
  }, [initialImgUrl]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const pickUrl = (res: R) =>
    getUrl ? getUrl(res) : (res as unknown as string);

  const handleImageUpload = (file: V) => {
    uploadMutate(file, {
      onSuccess: (res) => {
        setImgUrl(pickUrl(res));
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
      reader.onloadend = () => setImgUrl(reader.result as string);
      reader.readAsDataURL(file);

      const uploadFile = additionalUploadData?.name
        ? ({ file, name: additionalUploadData.name } as V)
        : (file as V);

      handleImageUpload(uploadFile);
    } else {
      setImgUrl(initialImgUrl);
      setIsChanged(false);
    }
  };

  const handleCameraClick = () => fileInputRef.current?.click();

  return {
    imgUrl,
    setImgUrl,
    fileInputRef,
    handleImageChange,
    handleCameraClick,
  };
};

export type UploadResult = { tempKey: string; previewUrl: string };
//배포해야하는데 여기서 자꾸 타입 에러가 나서 임시로 수정했어요
//나중에 수정바람
