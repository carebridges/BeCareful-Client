import { PostDetailResponse } from '@/types/Community/post';
import { useEffect, useState } from 'react';

export const useKakaoShare = () => {
  // bottomsheet - 공유 버튼
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  // 카카오톡 공유하기
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_APP_JAVASCRIPT_KEY);
    }
  }, []);

  const handleKakaoShare = (post?: PostDetailResponse) => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      const title = '돌봄다리 커뮤니티 새소식';
      const content = '요양기관 센터장들의 소통 공간';
      const defaultImgUrl =
        'https://care-bridges-bucket.s3.ap-northeast-2.amazonaws.com/kakaotalk_share_thumbnail.png';
      const imgUrl = post?.imageList[0]?.mediaUrl ?? defaultImgUrl;
      const currentUrl = window.location.href;

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: content,
          imageUrl: imgUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      });
    }
  };

  return {
    isShareSheetOpen,
    setIsShareSheetOpen,
    handleKakaoShare,
  };
};
