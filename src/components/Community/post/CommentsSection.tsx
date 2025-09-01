import React from 'react';
import styled from 'styled-components';
import { CommentListResponse } from '@/types/Community/comment';
import { formatDateTime } from '@/utils/formatTime';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';

interface CommentsSectionProps {
  comments: CommentListResponse | undefined;
}

const CommentsSection = ({ comments }: CommentsSectionProps) => {
  return (
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
            <img src={comment.author.institutionImageUrl} />
            <div className="labels">
              <div className="writer-wrapper">
                <label className="writer">{comment.author.authorName}</label>
                <label className="writer">·</label>
                <label className="writer">
                  {
                    INSTITUTION_RANK_EN_TO_KR[
                      comment.author.authorInstitutionRank
                    ]
                  }
                </label>
              </div>
              <label className="content">{comment.content}</label>
              <label className="date">
                {formatDateTime(comment.createdAt)}
              </label>
            </div>
          </div>
          <Border />
        </React.Fragment>
      ))}
    </Comments>
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
`;

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
`;
