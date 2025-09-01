import styled from 'styled-components';
import React, { useEffect } from 'react';
import { usePostReadStatus } from '@/contexts/PostReadStatusContext';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Share } from '@/assets/icons/community/Share.svg';
import { ReactComponent as Send } from '@/assets/icons/community/ReplySend.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ReactComponent as Link } from '@/assets/icons/community/LinkPost.svg';
import { ReactComponent as Copy } from '@/assets/icons/community/LinkCopy.svg';
import { ReactComponent as Kakao } from '@/assets/icons/community/KakaoLogo.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { Button } from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { BOARD_PARAM_TO_KR } from '@/constants/community/communityBoard';
import { useComments } from '@/api/community';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useLinkCopy } from '@/hooks/Community/PostPage/useLinkCopy';
import { useCommentSend } from '@/hooks/Community/PostPage/useCommentSend';
import { useFileHandling } from '@/hooks/Community/PostPage/useFileHandling';
import { useKakaoShare } from '@/hooks/Community/PostPage/useKakaoShare';
import { usePostActions } from '@/hooks/Community/PostPage/usePostActions';
import { usePostData } from '@/hooks/Community/PostPage/usePostData';
import TitleSection from '@/components/Community/post/TitleSection';
import CommentsSection from '@/components/Community/post/CommentsSection';

const CommunityPostPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const {
    boardType,
    postId,
    apiBoardType,
    post,
    postDetailError,
    handleEditPost,
    handleDeletePost,
  } = usePostData();

  // 댓글 조회
  const { data: comments, error: commentsError } = useComments(
    apiBoardType,
    postId,
  );
  // 댓글 등록
  const { reply, handleReplyChange, handleReplySend } = useCommentSend(
    apiBoardType,
    postId,
  );

  // 읽음 상태 context 관리
  const { readStatuses, markAsRead } = usePostReadStatus();
  // 현재 게시글의 읽음 상태
  const currentPostIsRead = readStatuses[postId] || false;
  useEffect(() => {
    if (!currentPostIsRead && postId >= 0) {
      markAsRead(postId);
    }
  }, [postId, markAsRead, currentPostIsRead]);

  // 게시글 수정, 삭제하기
  const {
    isActionSheetOpen,
    setIsActionSheetOpen,
    openActionSheet,
    closeActionSheet,
    selectedAction,
    setSelectedAction,
    handleActionSheetConfirm,
  } = usePostActions({
    onEditSuccess: handleEditPost,
    onDelete: handleDeletePost,
    post: post,
  });

  // 파일 다운로드, 원본 url 링크 이동
  const { handleFileDownload, handleOriginalLinkClick } = useFileHandling();

  // 카카오톡 공유하기
  const { isShareSheetOpen, setIsShareSheetOpen, handleKakaoShare } =
    useKakaoShare();

  // 현재 게시글 링크 복사
  const { isLinkModalOpen, setIsLinkModalOpen, handleCopy } = useLinkCopy();

  if (postDetailError) {
    console.log('getPostDetail 에러 발생: ', postDetailError);
  }
  if (commentsError) {
    console.log('getComment 에러 발생: ', commentsError);
  }

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={
          <NavCenter>{BOARD_PARAM_TO_KR[boardType ?? 'association']}</NavCenter>
        }
        color="white"
      />

      <TitleSection post={post} onClick={openActionSheet} />

      {post?.fileUList && post.fileUList.length > 0 && (
        <Files>
          {post.fileUList.map((fileUrl) => {
            const fileName = fileUrl.fileName;
            return (
              <label
                key={fileUrl.id}
                onClick={() => handleFileDownload(fileUrl.mediaUrl)}
              >
                {fileName}
              </label>
            );
          })}
        </Files>
      )}

      <ContentWrapper>
        <label>
          {post?.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              <label>{line}</label>
              {index < post?.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </label>
        <MediaWrapper>
          {post?.imageList &&
            post?.imageList.map((image, index) => (
              <img
                key={image.id}
                src={image.mediaUrl}
                alt={`게시글 이미지 ${index + 1}`}
              />
            ))}
          {post?.videoList &&
            post?.videoList.map((video) => (
              <video key={video.id} src={video.mediaUrl} controls />
            ))}
        </MediaWrapper>
      </ContentWrapper>

      <SectionBorder />

      <ReplyWrapper>
        <CommentsSection comments={comments} />

        <SectionBorder />

        {boardType === 'service' ? (
          <IsMyPost>
            <Link onClick={() => handleOriginalLinkClick(post?.originalUrl)} />
            <Share onClick={() => setIsShareSheetOpen(true)} />
          </IsMyPost>
        ) : (
          <Share
            style={{ padding: '10px 0px' }}
            onClick={() => setIsShareSheetOpen(true)}
          />
        )}

        <SectionBorder />

        <div className="my-reply">
          <Reply
            placeholder="댓글을 입력하세요"
            value={reply}
            onChange={handleReplyChange}
          />
          <Send style={{ padding: '4px' }} onClick={handleReplySend} />
        </div>
      </ReplyWrapper>

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
        isOpen={isActionSheetOpen}
        setIsOpen={setIsActionSheetOpen}
        title="게시물을 수정 또는 삭제하시겠습니까?"
        titleStar={false}
      >
        <CheckButton
          active={selectedAction === '수정하기'}
          onClick={() => setSelectedAction('수정하기')}
        >
          <Check />
          수정하기
        </CheckButton>
        <CheckButton
          active={selectedAction === '삭제하기'}
          onClick={() => setSelectedAction('삭제하기')}
        >
          <Check />
          삭제하기
        </CheckButton>
        <DeleteButtons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={closeActionSheet}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={handleActionSheetConfirm}
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

const Files = styled.div`
  padding-top: 20px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  overflow-x: hidden;

  label {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 14px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 300px;

  label {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const MediaWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img,
  video {
    width: 320px;
    height: 320px;
    object-fit: contain;
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

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    cursor: pointer;
  }

  .my-reply {
    height: 44px;
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
`;

const IsMyPost = styled.div`
  display: flex;
  gap: 18px;
  padding: 10px 0;
`;

const Reply = styled.input`
  outline: none;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  display: flex;
  align-items: center;
  width: 100%;
  height: 26px;
  padding: 9px 16px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
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
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

const DeleteButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding-top: 85px;
`;
