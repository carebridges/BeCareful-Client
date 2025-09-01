import styled from 'styled-components';
import { usePostReadStatus } from '@/contexts/PostReadStatusContext';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { BOARD_EN_TO_PARAM } from '@/constants/community/communityBoard';
import { PostListItem } from '@/types/Community/post';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { isRecentDate } from '@/hooks/Community/isRecentDate';
import { textTruncateFormat } from '@/utils/formatText';
import { formatDateTime } from '@/utils/formatTime';

interface PostOverviewProps {
  post: PostListItem;
}

const PostOverview = ({ post }: PostOverviewProps) => {
  const { handleNavigate } = useHandleNavigate();

  const { readStatuses } = usePostReadStatus();
  const isRead = readStatuses[post.postId] || false;

  return (
    <Container
      onClick={() => {
        handleNavigate(
          `/community/${BOARD_EN_TO_PARAM[post.boardType]}/${post.postId}`,
        );
      }}
    >
      <Wrapper>
        <Writer>
          <img className="writer-img" src={post.author.institutionImageUrl} />
          <label>{post.author.authorName}</label>
          <label>·</label>
          <label>
            {INSTITUTION_RANK_EN_TO_KR[post.author.authorInstitutionRank]}
          </label>
        </Writer>
        <Title isRead={isRead}>
          <label>
            {post.isImportant && <IsMustTag>필독</IsMustTag>}{' '}
            {textTruncateFormat(post.title, 33)}
          </label>
        </Title>
        <Day>
          <label>{formatDateTime(post.createdAt)}</label>
          {isRecentDate(post.createdAt, 3) && <NewTag>N</NewTag>}
        </Day>
      </Wrapper>

      {post.thumbnailUrl && (
        <img className="thumnail" src={post.thumbnailUrl} alt="게시물 썸네일" />
      )}
    </Container>
  );
};

export default PostOverview;

const Container = styled.div`
  height: 100px;
  display: flex;
  gap: 14px;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;

  .thumnail {
    min-width: 72px;
    height: 72px;
    object-fit: cover;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Writer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;

  .writer-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }
`;

const Title = styled.div<{ isRead: boolean }>`
  display: flex;
  gap: 5px;
  align-items: center;

  label {
    color: ${({ theme, isRead }) =>
      isRead ? theme.colors.gray300 : theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: 140%;
  }
`;

const IsMustTag = styled.span`
  padding: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: 140%;
`;

const Day = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }
`;

const NewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainOrange};
  color: ${({ theme }) => theme.colors.subOrange};
  font-size: 9px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
