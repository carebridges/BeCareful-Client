import styled from 'styled-components';
import React from 'react';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import PostOverview from '@/components/Community/common/PostOverview';
import { Board_Type_Mapping } from '@/constants/communityBoard';
import { PostListItem } from '@/types/Community/post';
import { PageableRequest } from '@/types/Community/common';
import { useBoardPostList } from '@/hooks/Community/api/useBoardPostList';

interface CommunityDetailProps {
  boardType: string;
}

const CommunityDetail = ({ boardType }: CommunityDetailProps) => {
  const pageable: PageableRequest = {
    page: 0,
    size: 1,
    sort: [],
  };

  const { data, error } = useBoardPostList(
    Board_Type_Mapping[boardType],
    pageable,
  );
  if (error) {
    console.log('getPostingList 에러: ', error);
  }

  return (
    <Container>
      <Title>
        <NoticeIcon />
        <label>{boardType}</label>
      </Title>

      <NoticeList>
        {data?.map((post: PostListItem, index) => (
          <React.Fragment key={post.postId}>
            <PostOverview key={post.postId} post={post} boardType={boardType} />
            {index !== data.length - 1 && <Border />}
          </React.Fragment>
        ))}
      </NoticeList>
    </Container>
  );
};

export default CommunityDetail;

const Container = styled.div`
  padding: 16px 20px 60px 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 12px;

  path {
    fill: ${({ theme }) => theme.colors.gray600};
  }

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 140%;
  }
`;

const NoticeList = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const Border = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  height: 1px;
`;
