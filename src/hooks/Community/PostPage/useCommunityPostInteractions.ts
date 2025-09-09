import { useCallback, useEffect, useState } from 'react';
import { PostDetailResponse } from '@/types/Community/post';

/**
 * 게시글 상세 페이지의 공유, 링크 복사, 파일 처리 관련 로직과 UI 상태를 관리하는 커스텀 훅.
 */
export const useCommunityPostInteractions = () => {
  // 파일 다운로드
  const handleFileDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  // 원본 URL로 이동
  const handleOriginalLinkClick = (originalUrl?: string) => {
    if (originalUrl) {
      window.open(originalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 카카오톡 공유하기
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

  // 현재 게시글 링크 복사
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const handleCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsLinkModalOpen(true);
      //   setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
  };

  return {
    handleFileDownload,
    handleOriginalLinkClick,
    isShareSheetOpen,
    setIsShareSheetOpen,
    handleKakaoShare,
    isLinkModalOpen,
    setIsLinkModalOpen,
    handleCopy,
  };
};
