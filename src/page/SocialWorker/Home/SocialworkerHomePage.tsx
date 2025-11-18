import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { ReactComponent as Plus } from '@/assets/icons/socialworker/home/Plus.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import RankCard from '@/components/SocialWorker/Home/RankCard';
import MatchingSection from '@/components/SocialWorker/Home/MatchingSection';
import ElderSection from '@/components/SocialWorker/Home/ElderSection';
import InstitutionSection from '@/components/SocialWorker/Home/InstitutionSection';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGetSocialWorkerHome } from '@/api/socialworker';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostOverviewAd from '@/components/Community/common/PostOverviewAd';
import { adPostList } from '@/constants/Ad';

const SocialworkerHomePage = () => {
  const { handleNavigate } = useHandleNavigate();
  const [isNew, setIsNew] = useState(false);
  const { data } = useGetSocialWorkerHome();

  return (
    <Container>
      {isNew && (
        <Modal isOpen={isNew} onClose={() => setIsNew(false)}>
          <ModalButtons
            onClose={() => setIsNew(false)}
            title="회원가입을 축하드립니다!"
            detail="지금 바로 ‘매칭하기’를 눌러 구인해보세요!"
            left="내 포인트 확인"
            right="홈으로"
            handleLeftBtnClick={() => handleNavigate('/socialworker/point')}
            handleRightBtnClick={() => setIsNew(false)}
          />
        </Modal>
      )}

      <NavBar
        left={<NavLeft />}
        right={
          <NavRight onClick={() => handleNavigate('/socialworker/chat')}>
            {data?.hasNewChat ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="blue"
      />

      <Top>
        <div className="institution">
          <img src={data?.socialWorkerInfo.profileImageUrl} />
          <label>{data?.institutionInfo.institutionDetail.name}</label>
          <RankCard
            rank={data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'}
          />
        </div>
      </Top>

      <CustomPagination>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          style={{ width: '100%', height: 'auto' }}
        >
          {adPostList.map((post) => (
            <SwiperSlide key={post.postId}>
              <PostWrapper>
                <PostOverviewAd key={post.postId} post={post} />
              </PostWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </CustomPagination>

      {/* {searchResults.map((post, index) => ( */}
      {/* <React.Fragment key={post.postId}> */}
      {/* <PostOverviewAd key={adPost.postId} post={adPost} /> */}
      {/* {index < searchResults.length - 1 && <Border />} */}
      {/* </React.Fragment> */}
      {/* ))} */}

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">매칭 통계</label>
        </div>
        <MatchingSection data={data?.recruitmentStatistics} />
        <Button
          height="52px"
          variant="mainBlue"
          style={{
            marginTop: '12px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => handleNavigate('/socialworker/recruitment/new')}
        >
          <Plus /> 새 공고 등록하기
        </Button>
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">매칭 진행 중인 어르신</label>
          <div
            className="detailWrapper"
            onClick={() => handleNavigate('/socialworker/elderly')}
          >
            <label className="detail">더보기</label>
            <ChevronRight />
          </div>
        </div>
        <ElderSection data={data?.matchingProcessingElderlys} />
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">
            {data?.institutionInfo.institutionDetail.name} 정보
          </label>
        </div>
        <InstitutionSection data={data?.institutionInfo} />
      </SectionWrapper>
    </Container>
  );
};

export default SocialworkerHomePage;

const Container = styled.div`
  background: #f2f4f6;
  min-height: 100vh;
  padding-bottom: 72px;

  div {
    display: flex;
  }
`;

const NavLeft = styled(Logo)`
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  padding-right: 20px;
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const Top = styled.div`
  padding: 20px;
  padding-top: 0px;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};

  .institution {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 20px;
    gap: 8px;
    align-items: center;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const SectionWrapper = styled.div`
  margin: auto 20px;
  margin-top: 12px;
  flex-direction: column;

  .title {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: 17px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .titleWrapper {
    width: 100%;
    padding: 14px 0px;
    align-items: center;
    justify-content: space-between;
  }

  .detailWrapper {
    gap: 2px;
    align-items: center;
    cursor: pointer;
    color: #666666;
  }

  .detail {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    cursor: pointer;
  }
`;

const CustomPagination = styled.div`
  padding: 20px;
  padding-bottom: 0px;

  .swiper-pagination {
    display: flex;
    justify-content: center;
  }
`;

const PostWrapper = styled.div`
  margin-bottom: 32px;
  padding: 24px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;
