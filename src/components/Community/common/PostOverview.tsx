import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePostReadStatus } from '@/contexts/PostReadStatusContext';
import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import { PostListItem } from '@/types/Community/post';
import { textTruncateFormat } from '@/hooks/Community/PostOverview/textFormat';
import { isRecentDate } from '@/hooks/Community/isRecentDate';

interface PostOverviewProps extends PostListItem {
  boardType: string;
}

const PostOverview = ({
  postId,
  title,
  isImportant,
  thumbnailUrl,
  createdAt,
  author,
  boardType,
}: PostOverviewProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/community/${postId}`, {
      state: { boardType: boardType },
    }); // 클릭 시 해당 ID의 게시글 상세 페이지로 이동
    window.scrollTo(0, 0);
  };

  const { readStatuses } = usePostReadStatus();
  const isRead = readStatuses[postId] || false;

  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <Writer>
          <img className="writer-img" src={author.institutionImageUrl} />
          <label>{author.authorName}</label>
          <label>·</label>
          <label>
            {Institution_Rank_Mapping[author.authorInstitutionRank]}
          </label>
        </Writer>
        <Title isRead={isRead}>
          <label>
            {isImportant && <IsMustTag>필독</IsMustTag>}{' '}
            {textTruncateFormat(title, 33)}
          </label>
        </Title>
        <Day>
          <label>{createdAt}</label>
          {isRecentDate(createdAt, 3) && <NewTag>N</NewTag>}
        </Day>
      </Wrapper>

      <img className="profile-img" src={thumbnailUrl} />
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

  .profile-img {
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
