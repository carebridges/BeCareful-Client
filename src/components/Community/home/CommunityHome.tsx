import styled from 'styled-components';
import React from 'react';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import { Button } from '@/components/common/Button/Button';
import PostOverview from '@/components/Community/common/PostOverview';
import { Board_List } from '@/constants/communityBoard';
import { PageableRequest } from '@/types/Community/common';
import { BoardPostListResponse, PostListItem } from '@/types/Community/post';
import { useImportantPostings } from '@/api/community';
import { useBoardPostings } from '@/hooks/Community/api/useBoardPostings';

interface CommunityHomeProps {
  onTabChange: (tabName: string) => void;
}

const CommunityHome = ({ onTabChange }: CommunityHomeProps) => {
  const importantPageable: PageableRequest = {
    page: 0,
    size: 5,
    sort: [],
  };

  const { data: importantPostings, error: importantError } =
    useImportantPostings(importantPageable);
  if (importantError) {
    console.log('getImportantPosting 에러: ', importantError);
  }

  const boardPageable: PageableRequest = { page: 0, size: 5, sort: [] };
  const boardPostings = useBoardPostings(boardPageable);

  const getContent = (
    data: BoardPostListResponse | undefined,
    isError: boolean,
    error: Error | null,
    board: string,
  ) => {
    if (isError) {
      console.log('getContent 오류 발생: ', error);
      return null;
    }
    if (!data || data.length === 0) {
      console.log('getContent 데이터 없음');
      return <div>{board} 게시판의 게시글이 없습니다.</div>;
    }

    return (
      <>
        {data?.map((post: PostListItem, index) => (
          <React.Fragment key={post.postId}>
            <PostOverview post={post} />
            {index !== data.length - 1 && <Border />}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Must>
        <NoticeIcon />
        <label>필독</label>
      </Must>

      <CustomPagination>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          style={{ width: '100%', height: 'auto' }}
        >
          {importantPostings?.map((post: PostListItem) => (
            <SwiperSlide key={post.postId}>
              <NoticeList>
                <PostOverview key={post.postId} post={post} />
              </NoticeList>
            </SwiperSlide>
          ))}
        </Swiper>
      </CustomPagination>

      <CustomPagination>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          autoHeight={true}
          style={{ width: '100%', height: 'auto' }}
        >
          {Board_List.map((board, index) => {
            const { data, isError, error } = boardPostings[index];
            const Icon = board.icon;

            return (
              <SwiperSlide key={board.label}>
                <Title>
                  <Icon />
                  <label>{board.label}</label>
                </Title>
                <NoticeList>
                  {getContent(
                    data as BoardPostListResponse,
                    isError,
                    error,
                    board.label,
                  )}
                </NoticeList>
                <Button
                  width="100%"
                  height="52px"
                  variant="subBlue"
                  style={{ marginTop: '4px', marginBottom: '15px' }}
                  onClick={() => onTabChange(board.label)}
                >
                  더보기
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CustomPagination>
    </Container>
  );
};

export default CommunityHome;

const Container = styled.div`
  padding: 16px 20px 40px 20px;
`;

const Must = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 12px;

  path {
    fill: ${({ theme }) => theme.colors.mainBlue};
  }

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
    line-height: 140%; /* 25.2px */
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
  margin-bottom: 20px;
`;

const Border = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  height: 1px;
`;

const CustomPagination = styled.div`
  .swiper-pagination {
    position: relative;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }
`;
