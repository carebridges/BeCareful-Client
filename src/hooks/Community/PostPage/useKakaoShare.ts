import { PostDetailResponse } from '@/types/Community/post';
import { useCallback, useEffect, useState } from 'react';

export const useKakaoShare = () => {
  // bottomsheet - 공유 버튼
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  const [isKakaoReady, setIsKakaoReady] = useState(false);

  // SDK 로드 함수
  const loadKakaoSDK = () => {
    return new Promise<void>((resolve) => {
      if (window.Kakao) return resolve();
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  // SDK 로드 후 init
  useEffect(() => {
    loadKakaoSDK().then(() => {
      const key = import.meta.env.VITE_APP_JAVASCRIPT_KEY;
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(key);
      }
      setIsKakaoReady(true);
    });
  }, []);

  // 카카오톡 공유하기
  const handleKakaoShare = useCallback(
    (post?: PostDetailResponse) => {
      if (!isKakaoReady) {
        console.error('Kakao SDK not ready yet');
        return;
      }

      const kakao = window.Kakao;
      const title = '돌봄다리 커뮤니티 새소식';
      const content = '요양기관 센터장들의 소통 공간';
      const defaultImgUrl =
        'https://care-bridges-bucket.s3.ap-northeast-2.amazonaws.com/kakaotalk_share_thumbnail.png';
      const imgUrl = post?.imageList?.[0]?.mediaUrl ?? defaultImgUrl;
      const currentUrl = window.location.href;

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: content,
          imageUrl: imgUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      });
    },
    [isKakaoReady],
  );

  return {
    isShareSheetOpen,
    setIsShareSheetOpen,
    handleKakaoShare,
  };
};
