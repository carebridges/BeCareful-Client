import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostReadStatus } from '@/contexts/PostReadStatusContext';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Dots } from '@/assets/icons/community/Dots.svg';
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
import {
  API_Board_Type_Param,
  Board_Type_Param_KOR,
} from '@/constants/communityBoard';
import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import { useComments, useDeletePost, usePostDetail } from '@/api/community';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useLinkCopy } from '@/hooks/Community/PostPage/useLinkCopy';
import { useCommentSend } from '@/hooks/Community/PostPage/useCommentSend';
import { isRecentDate } from '@/hooks/Community/isRecentDate';
import { useFileHandling } from '@/hooks/Community/PostPage/useFileHandling';
import { useKakaoShare } from '@/hooks/Community/PostPage/useKakaoShare';
import { usePostActions } from '@/hooks/Community/PostPage/usePostActions';
import { formatDateTime } from '@/utils/formatTime';

const CommunityPostPage = () => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const { boardType: boardType, postId: postIdParam } = useParams<{
    boardType: string;
    postId: string;
  }>();
  const postId = postIdParam ? parseInt(postIdParam, 10) : 0;

  const apiBoardType = API_Board_Type_Param[boardType ?? 'association'];

  // 게시글 상세 조회
  const { data: post, error: postDetailError } = usePostDetail(
    apiBoardType,
    postId,
  );
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

  const handleEditPost = () => {
    if (post && post.postId) {
      handleNavigate(`/community/edit/${boardType}/${post.postId}`);
    }
  };
  const { mutate: handleDeletetPost } = useDeletePost(apiBoardType, postId);

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
    onDelete: handleDeletetPost,
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
          <NavCenter>
            {Board_Type_Param_KOR[boardType ?? 'association']}
          </NavCenter>
        }
        color="white"
      />

      <TitleWrapper>
        <Title>
          {post?.isImportant && <Tag>필독</Tag>}
          <label>{post?.title}</label>
        </Title>

        <Writer>
          <div className="writer-info">
            <img src={post?.author.institutionImageUrl} />
            <div className="writer-wrapper">
              <div className="wrapper">
                <label className="writer">{post?.author.authorName}</label>
                <label className="writer">·</label>
                <label className="writer">
                  {post?.author &&
                    Institution_Rank_Mapping[
                      post?.author.authorInstitutionRank
                    ]}
                </label>
              </div>
              <div className="wrapper">
                {post?.postedDate && (
                  <>
                    <label className="date">
                      {formatDateTime(post.postedDate)}
                    </label>
                    {isRecentDate(post.postedDate, 3) && (
                      <label className="new">N</label>
                    )}
                  </>
                )}
                <label className="date">수정됨</label>
                <label className="date">조회 101</label>
              </div>
            </div>
          </div>
          {post?.isMyPost && <Dots onClick={openActionSheet} />}
        </Writer>
      </TitleWrapper>

      {post?.fileUList && post.fileUList.length > 0 && (
        <Files>
          {post.fileUList.map((fileUrl, index) => {
            const fileName = fileUrl.fileName;
            return (
              <label
                key={`file-${index}`}
                onClick={() => handleFileDownload(fileUrl.mediaUrl)}
              >
                {fileName}
              </label>
            );
          })}
        </Files>
      )}

      <ContentWrapper>
        <label>{post?.content}</label>
        <MediaWrapper>
          {post?.imageList &&
            post?.imageList.map((image, index) => (
              <img
                key={`image-${index}`}
                src={image.mediaUrl}
                alt={`게시글 이미지 ${index + 1}`}
              />
            ))}
          {post?.videoList &&
            post?.videoList.map((video, index) => (
              <video key={`video-${index}`} src={video.mediaUrl} controls />
            ))}
        </MediaWrapper>
      </ContentWrapper>

      <Border />

      <SectionBorder />

      <ReplyWrapper>
        <div className="replys">
          <label
            className="content"
            style={{ display: 'block', padding: '14px 0px' }}
          >
            댓글 <span>{comments?.length}</span>
          </label>
          {comments?.map((comment) => (
            // <React.Fragment key={comment.commentId}>
            <React.Fragment key={comment.author.authorId}>
              <div className="reply">
                <img src={comment.author.institutionImageUrl} />
                <div className="labels">
                  <div className="writer-wrapper">
                    <label className="writer">
                      {comment.author.authorName}
                    </label>
                    <label className="writer">·</label>
                    <label className="writer">
                      {
                        Institution_Rank_Mapping[
                          comment.author.authorInstitutionRank
                        ]
                      }
                    </label>
                  </div>
                  <label className="content">{comment.content}</label>
                  <label className="date">{comment.createdAt}</label>
                </div>
              </div>
              <Border />
            </React.Fragment>
          ))}
        </div>

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

      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(!isLinkModalOpen)}
      >
        <ModalLimit
          title="링크가 복사되었어요."
          detail={'게시글 링크가 복사되었어요.\n링크를 붙여넣기할 수 있어요.'}
          onClose={() => setIsLinkModalOpen(!isLinkModalOpen)}
          handleBtnClick={() => setIsLinkModalOpen(!isLinkModalOpen)}
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

const TitleWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
`;

const Title = styled.div`
  display: flex;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Tag = styled.span`
  display: flex;
  width: 60px;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subBlue};

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const Writer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  .writer-info {
    display: flex;
    gap: 8px;
  }

  img {
    width: 47px;
    height: 47px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }

  svg {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  .writer-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .writer {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .date {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .new {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.mainOrange};
    color: ${({ theme }) => theme.colors.subOrange};
    font-size: 9.1px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Files = styled.div`
  padding-top: 20px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

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

  .replys {
    margin-bottom: 105px;
  }

  label {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .content {
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }

  .reply {
    padding: 9px 0;
    display: flex;
    gap: 8px;
  }

  img {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  .labels {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .writer-wrapper {
    display: flex;
    gap: 4px;
  }

  .writer {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }

  .date {
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }

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

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
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
