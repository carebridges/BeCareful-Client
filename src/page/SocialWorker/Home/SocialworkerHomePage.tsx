import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { ReactComponent as Point } from '@/assets/icons/Point.svg';
import { ReactComponent as Elderly } from '@/assets/icons/socialworker/home/ElderlyDefault.svg';
import { ReactComponent as Caregiver } from '@/assets/icons/socialworker/home/CaregiverDefault.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import RankCard from '@/components/SocialWorker/Home/RankCard';
import MatchingSection from '@/components/SocialWorker/Home/MatchingSection';
import ApplySection from '@/components/SocialWorker/Home/ApplySection';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Gender_Mapping } from '@/constants/caregiverMapping';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGetSocialWorkerHome } from '@/api/socialworker';

const SocialworkerHomePage = () => {
  const [isNew, setIsNew] = useState(false);
  const chatNew = true;
  const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);

  const { handleNavigate } = useHandleNavigate();
  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  const { data } = useGetSocialWorkerHome();

  return (
    <Container>
      {isNew && (
        <Modal isOpen={isNew} onClose={() => handleModal(setIsNew)}>
          <ModalButtons
            onClose={() => handleModal(setIsNew)}
            title="회원가입을 축하드립니다!"
            detail="가입 보상 포인트 5,000P가 지급되었습니다."
            left="내 포인트 확인"
            right="홈으로"
            handleLeftBtnClick={() => handleNavigate('/socialworker/point')}
            handleRightBtnClick={() => handleModal(setIsNew)}
          />
        </Modal>
      )}

      <NavBar
        left={<NavLeft />}
        right={
          <NavRight onClick={() => handleNavigate('/socialworker/chat')}>
            {chatNew ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="blue"
      />

      <Top>
        <div className="caregiver">
          <img src="" />
          <label className="title">{data?.socialWorkerInfo.name}</label>
          <RankCard
            rank={data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'}
          />
        </div>

        <div
          className="pointWrapper"
          onClick={() => handleNavigate('/socialworker/point')}
        >
          <Point />
          {/* <label className="point">{data.point}</label> */}
          <label className="point">1,500P</label>
          <ChevronRight />
        </div>
      </Top>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">
            {data?.institutionInfo.institutionName}
          </label>
        </div>

        <Institution>
          <div className="content">
            <div className="left">
              <Elderly />
              <label className="type">어르신</label>
            </div>
            <label className="people">
              <span>{data?.institutionInfo.elderlyCount}</span>명
            </label>
          </div>

          <div className="border" />

          <div className="content">
            <div className="left">
              <Caregiver />
              <label className="type">요양보호사</label>
            </div>
            <label className="people">
              <span>{data?.institutionInfo.socialWorkerCount}</span>명
            </label>
          </div>
          <Button
            height="52px"
            variant="subBlue"
            style={{ marginTop: '4px' }}
            onClick={() => handleModal(setIsInstitutionModalOpen)}
          >
            직원 정보 보기
          </Button>
        </Institution>
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
        <MatchingSection
          matchingProcessingCount={
            data?.matchingStatistics.matchingProcessingCount ?? 0
          }
          recentlyMatchedCount={
            data?.matchingStatistics.recentlyMatchedCount ?? 0
          }
          totalMatchingCompletedCount={
            data?.matchingStatistics.totalMatchingCompletedCount ?? 0
          }
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">지원 통계</label>
        </div>
        <ApplySection
          averageAppliedCaregiver={
            data?.applicationStatistics.averageAppliedCaregiver ?? 0
          }
          appliedCaregiverCount={
            data?.applicationStatistics.appliedCaregiverCount ?? 0
          }
          averageApplyingRate={
            data?.applicationStatistics.averageApplyingRate ?? 0
          }
        />
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

        <Edler>
          {data?.matchingElderlyList.map((elderly, index) => (
            <div className="elder" key={index}>
              <img src={elderly.elderlyProfileImageUrl} />
              <div className="elder-info">
                <label className="name">{elderly.elderlyName}</label>
                <div className="bottom">
                  <label className="extra">{elderly.elderlyAge}세</label>
                  <div className="border" />
                  <label className="extra">
                    {Gender_Mapping[elderly.elderlyGender]}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </Edler>
      </SectionWrapper>

      <Modal
        isOpen={isInstitutionModalOpen}
        onClose={() => handleModal(setIsInstitutionModalOpen)}
      >
        <ModalWrapper>
          <div className="modal-top">
            <div className="modal-title">
              <label className="modal-title">소속 기관 직원</label>
              <span>{data?.institutionInfo.socialWorkerCount}</span>
            </div>
            <ModalXImg onClick={() => handleModal(setIsInstitutionModalOpen)} />
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
              onClick={() => handleModal(setIsInstitutionModalOpen)}
            >
              취소
            </Button>
            <Button
              height="52px"
              variant="mainBlue"
              onClick={() => handleModal(setIsInstitutionModalOpen)}
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

const Institution = styled.div`
  padding: 24px 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);

  .content {
    justify-content: space-between;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }

  .left {
    gap: 8px;
    align-items: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .people {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .border {
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const Edler = styled.div`
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .elder {
    padding: 16px;
    width: 88px;
    flex: 0 0 auto;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
  }

  .elder-info {
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .bottom {
    gap: 4px;
    align-items: center;
  }

  .extra {
    color: ${({ theme }) => theme.colors.gray500};
  }

  .border {
    width: 1px;
    height: 12px;
    background: ${({ theme }) => theme.colors.subBlue};
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
