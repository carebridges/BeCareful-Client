import styled from 'styled-components';
import { ReactComponent as DotIcon } from '@/assets/icons/community/Dots.svg';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { isRecentDate } from '@/hooks/Community/isRecentDate';
import { PostDetailResponse } from '@/types/Community/post';
import { formatDateTime } from '@/utils/formatTime';

interface TitleSectionProps {
  post: PostDetailResponse | undefined;
  onOpenPostActionSheet: () => void;
}

const TitleSection = ({ post, onOpenPostActionSheet }: TitleSectionProps) => {
  return (
    <TitleWrapper>
      <Title>
        {post?.isImportant && <Tag>필독</Tag>}
        <label>{post?.title}</label>
      </Title>

      <Writer>
        <div className="writer-info">
          <img
            src={post?.author.institutionImageUrl}
            alt={'기관 이미지'}
            loading="lazy"
            decoding="async"
          />
          <div className="writer-wrapper">
            <div className="wrapper">
              <label className="writer">{post?.author.authorName}</label>
              <label className="writer">·</label>
              <label className="writer">
                {post?.author.authorInstitutionRank &&
                  INSTITUTION_RANK_EN_TO_KR[post?.author.authorInstitutionRank]}
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
              {post?.isEdited && <label className="date">수정됨</label>}
              {/* <label className="date">조회 101</label> */}
            </div>
          </div>
        </div>
        {post?.isMyPost && <Dots onClick={onOpenPostActionSheet} />}
      </Writer>
    </TitleWrapper>
  );
};

export default TitleSection;

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

const Dots = styled(DotIcon)`
  cursor: pointer;
`;
