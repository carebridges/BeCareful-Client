'use client';

import styled from 'styled-components';
import { useEffect } from 'react';
import { usePostReadStatus } from '@/contexts/PostReadStatusContext';
import ArrowLeft from '@repo/ui/src/assets/icons/ArrowLeft.svg';
import Check from '@repo/ui/src/assets/icons/matching/CircleCheck.svg';
import Copy from '@repo/ui/src/assets/icons/community/LinkCopy.svg';
import Link from '@repo/ui/src/assets/icons/community/LinkPost.svg';
import Share from '@repo/ui/src/assets/icons/community/Share.svg';
import Kakao from '@repo/ui/src/assets/icons/community/KakaoLogo.svg';
import ContentSection from '@/components/Community/post/ContentSection';
import CommentsSection from '@/components/Community/post/CommentsSection';
import TitleSection from '@/components/Community/post/TitleSection';
import { BOARD_MAP } from '@/constants/community';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useCommunityPost } from '@/hooks/PostPage/useCommunityPost';
import { useCommunityPostInteractions } from '@/hooks/PostPage/useCommunityPostInteractions';
import { BottomSheet, Button, Modal, ModalLimit, NavBar } from '@repo/ui';

const CommunityPostPage = () => {
  const { handleGoBack } = useHandleNavigate();

  // 게시글
  const {
    boardType,
    apiBoardType,
    postId,
    post,
    isPostActionSheetOpen,
    setIsPostActionSheetOpen,
    selectedPostAction,
    setSelectedPostAction,
    handlePostActionSheetConfirm,
  } = useCommunityPost();

  // 게시글 액션
  const {
    handleFileDownload,
    handleOriginalLinkClick,
    isShareSheetOpen,
    setIsShareSheetOpen,
    handleKakaoShare,
    isLinkModalOpen,
    setIsLinkModalOpen,
    handleCopy,
  } = useCommunityPostInteractions();

  // 게시글 읽음 상태 context 관리
  const { readStatuses, markAsRead } = usePostReadStatus();
  // 현재 게시글의 읽음 상태
  const currentPostIsRead = readStatuses[postId] || false;
  useEffect(() => {
    if (!currentPostIsRead && postId >= 0) {
      markAsRead(postId);
    }
  }, [postId, markAsRead, currentPostIsRead]);

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={
          <NavCenter>
            {
              BOARD_MAP.PARAM_TO_KR[
                (boardType ??
                  'association') as keyof typeof BOARD_MAP.PARAM_TO_KR
              ]
            }
          </NavCenter>
        }
      />

      <TitleSection
        post={post}
        onOpenPostActionSheet={() => setIsPostActionSheetOpen(true)}
      />

      <ContentSection post={post} onFileDownload={handleFileDownload} />

      <SectionBorder />

      <CommentsSection apiBoardType={apiBoardType} postId={postId} />

      <IconsWrapper>
        {boardType === 'service' && post?.originalUrl && (
          <Link onClick={() => handleOriginalLinkClick(post.originalUrl)} />
        )}
        <Share onClick={() => setIsShareSheetOpen(true)} />
      </IconsWrapper>

      <BottomSheet
        isOpen={isShareSheetOpen}
        setIsOpen={setIsShareSheetOpen}
        title="게시물 공유하기"
        titleStar={false}
      >
        <Buttons>
          <button className="kakao">
            <Kakao onClick={() => handleKakaoShare(post)} />
            카카오톡
          </button>
          <button className="copy">
            <Copy onClick={handleCopy} />
            링크 복사
          </button>
        </Buttons>
      </BottomSheet>

      <BottomSheet
        isOpen={isPostActionSheetOpen}
        setIsOpen={setIsPostActionSheetOpen}
        title="게시물을 수정 또는 삭제하시겠습니까?"
        titleStar={false}
      >
        <CheckButton
          active={selectedPostAction === '수정하기'}
          onClick={() => setSelectedPostAction('수정하기')}
        >
          <Check />
          수정하기
        </CheckButton>
        <CheckButton
          active={selectedPostAction === '삭제하기'}
          onClick={() => setSelectedPostAction('삭제하기')}
        >
          <Check />
          삭제하기
        </CheckButton>
        <DeleteButtons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={() => setIsPostActionSheetOpen(false)}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={handlePostActionSheetConfirm}
          >
            확인
          </Button>
        </DeleteButtons>
      </BottomSheet>

      <Modal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)}>
        <ModalLimit
          title="링크가 복사되었어요."
          detail={'게시글 링크가 복사되었어요.\n링크를 붙여넣기할 수 있어요.'}
          onClose={() => setIsLinkModalOpen(false)}
          handleBtnClick={() => setIsLinkModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default CommunityPostPage;

const Container = styled.div`
  padding: 0px 20px;
  margin-bottom: 108px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const IconsWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  gap: 18px;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 64px;
`;

const SectionBorder = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin: 0px -20px;
`;

const Buttons = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 30px;

  button {
    height: 82px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

const CheckButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.mainBlue : '')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};

    path {
      fill: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`;

const DeleteButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding-top: 85px;
`;
