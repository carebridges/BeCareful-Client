import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
// import { ReactComponent as Point } from '@/assets/icons/Point.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import RankCard from '@/components/SocialWorker/Home/RankCard';
import MatchingSection from '@/components/SocialWorker/Home/MatchingSection';
import ApplySection from '@/components/SocialWorker/Home/ApplySection';
import ElderSection from '@/components/SocialWorker/Home/ElderSection';
import InstitutionSection from '@/components/SocialWorker/Home/InstitutionSection';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGetSocialWorkerHome } from '@/api/socialworker';

const SocialworkerHomePage = () => {
  const [isNew, setIsNew] = useState(false);
  const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);

  const { handleNavigate } = useHandleNavigate();

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
        <div className="caregiver">
          <img src={data?.socialWorkerInfo.profileImageUrl} />
          <label className="title">{data?.socialWorkerInfo.name}</label>
          <RankCard
            rank={data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'}
          />
        </div>
      </Top>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">
            {data?.institutionInfo.institutionName}
          </label>
        </div>
        <InstitutionSection
          data={data?.institutionInfo}
          onClick={() => setIsInstitutionModalOpen(true)}
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">매칭 통계</label>
          <div
            className="detailWrapper"
            onClick={() => handleNavigate('/socialworker/matching/dashboard')}
            style={{ cursor: 'pointer' }}
          >
            <label className="detail">자세히 보기</label>
            <ChevronRight />
          </div>
        </div>
        <MatchingSection data={data?.matchingStatistics} />
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">지원 통계</label>
        </div>
        <ApplySection data={data?.applicationStatistics} />
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">매칭 대기중인 어르신</label>
          <div
            className="detailWrapper"
            onClick={() => handleNavigate('/socialworker/elderly')}
            style={{ cursor: 'pointer' }}
          >
            <label className="detail">자세히 보기</label>
            <ChevronRight />
          </div>
        </div>
        <ElderSection data={data?.matchingElderlyList} />
      </SectionWrapper>

      <Modal
        isOpen={isInstitutionModalOpen}
        onClose={() => setIsInstitutionModalOpen(false)}
      >
        <ModalWrapper>
          <div className="modal-top">
            <div className="modal-title">
              <label className="modal-title">소속 기관 직원</label>
              <span>{data?.institutionInfo.socialWorkerCount}</span>
            </div>
            <ModalXImg onClick={() => setIsInstitutionModalOpen(false)} />
          </div>

          <ModalSocial>
            {data?.institutionInfo.socialWorkerList.map(
              (socialworker, index) => (
                <div className="modal-social" key={index}>
                  <label className="modal-name">{socialworker.name}</label>
                  <RankCard rank={socialworker.institutionRank} />
                </div>
              ),
            )}
          </ModalSocial>

          <div className="buttons">
            <Button
              height="52px"
              variant="subBlue"
              onClick={() => setIsInstitutionModalOpen(false)}
            >
              취소
            </Button>
            <Button
              height="52px"
              variant="mainBlue"
              onClick={() => setIsInstitutionModalOpen(false)}
            >
              확인
            </Button>
          </div>
        </ModalWrapper>
      </Modal>
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

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .number {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .unit {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
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
  padding: 12px 20px;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};

  .caregiver {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 20px;
    gap: 8px;
    align-items: center;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .pointWrapper {
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }

  .point {
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    cursor: pointer;
  }
`;

const SectionWrapper = styled.div`
  margin: auto 20px;
  margin-top: 12px;
  flex-direction: column;

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
  }

  .detail {
    color: #666666;
    cursor: pointer;
  }

  path {
    stroke: #666666;
    fill: #666666;
  }
`;

const ModalWrapper = styled.div`
  padding: 20px;
  padding-top: 28px;
  width: 272px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  .modal-top {
    display: flex;
    justify-content: space-between;
  }

  .modal-title {
    display: flex;
    gap: 4px;
    align-items: center;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .buttons {
    width: 100%;
    display: flex;
    gap: 8px;
  }
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;

const ModalSocial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .modal-social {
    padding-bottom: 12px;

    display: flex;
    gap: 6px;
    align-items: center;

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

    &:last-child {
      padding-bottom: 0px;
      border-bottom: none;
    }
  }

  .modal-name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;
