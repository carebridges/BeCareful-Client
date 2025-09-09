import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Send } from '@/assets/icons/community/ReplySend.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ReactComponent as DotIcon } from '@/assets/icons/community/Dots.svg';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { Button } from '@/components/common/Button/Button';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { useCommunityComments } from '@/hooks/Community/PostPage/useCommunityComment';
import { formatDateTime } from '@/utils/formatTime';

interface CommentsSectionProps {
  apiBoardType: string;
  postId: number;
}

const CommentsSection = ({ apiBoardType, postId }: CommentsSectionProps) => {
  const {
    comments,

    comment,
    handleCommentChange,
    handleCommentSend,

    selectedCommentId,
    setSelectedCommentId,
    isEditingComment,
    editingCommentContent,
    setEditingCommentContent,
    editComment,

    selectedCommentAction,
    setSelectedCommentAction,
    isCommentActionSheetOpen,
    setIsCommentActionSheetOpen,
    handleCommentActionSheetConfirm,
  } = useCommunityComments(apiBoardType, postId);

  return (
    <>
      <Comments>
        <label
          className="content"
          style={{ display: 'block', padding: '14px 0px' }}
        >
          댓글 <span>{comments?.length}</span>
        </label>

        {comments?.map((comment) => (
          <React.Fragment key={comment.commentId}>
            <div className="reply">
              <div className="left">
                <img src={comment.author.institutionImageUrl} />
                <div className="labels">
                  <div className="writer-wrapper">
                    <label className="writer">
                      {comment.author.authorName}
                    </label>
                    <label className="writer">·</label>
                    <label className="writer">
                      {
                        INSTITUTION_RANK_EN_TO_KR[
                          comment.author.authorInstitutionRank
                        ]
                      }
                    </label>
                  </div>

                  {isEditingComment &&
                  comment.commentId === selectedCommentId ? (
                    <div className="edit-comment">
                      <Comment
                        value={editingCommentContent}
                        onChange={(e) =>
                          setEditingCommentContent(e.target.value)
                        }
                      />
                      <Button
                        width="100%"
                        height="46px"
                        variant="subBlue"
                        onClick={editComment}
                      >
                        수정하기
                      </Button>
                    </div>
                  ) : (
                    <label className="content">{comment.content}</label>
                  )}

                  <label className="date">
                    {formatDateTime(comment.createdAt)}
                  </label>
                </div>
              </div>
              {comment.isMyComment && !isEditingComment && (
                <Dots
                  onClick={() => {
                    setSelectedCommentId(comment.commentId);
                    setIsCommentActionSheetOpen(true);
                  }}
                />
              )}
            </div>
            <Border />
          </React.Fragment>
        ))}
      </Comments>

      <CommentWrapper>
        <Comment
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={handleCommentChange}
        />
        <Send style={{ padding: '4px' }} onClick={handleCommentSend} />
      </CommentWrapper>

      <BottomSheet
        isOpen={isCommentActionSheetOpen}
        setIsOpen={setIsCommentActionSheetOpen}
        title="댓글을 수정 또는 삭제하시겠습니까?"
        titleStar={false}
      >
        <CheckButton
          active={selectedCommentAction === '수정하기'}
          onClick={() => setSelectedCommentAction('수정하기')}
        >
          <Check />
          수정하기
        </CheckButton>
        <CheckButton
          active={selectedCommentAction === '삭제하기'}
          onClick={() => setSelectedCommentAction('삭제하기')}
        >
          <Check />
          삭제하기
        </CheckButton>
        <DeleteButtons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={() => setIsCommentActionSheetOpen(false)}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={handleCommentActionSheetConfirm}
          >
            확인
          </Button>
        </DeleteButtons>
      </BottomSheet>
    </>
  );
};

export default CommentsSection;

const Comments = styled.div`
  margin-bottom: 105px;

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
    justify-content: space-between;
  }

  .left {
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

  .edit-comment {
    height: 44px;
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
  }

  input {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }

  .date {
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }
`;

const CommentWrapper = styled.div`
  padding: 10px 20px;
  height: 44px;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  svg {
    cursor: pointer;
  }
`;

const Comment = styled.input`
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

const Dots = styled(DotIcon)`
  cursor: pointer;
`;
    
const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
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
