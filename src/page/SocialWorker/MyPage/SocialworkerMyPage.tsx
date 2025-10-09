import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import ProfileCard from '@/components/shared/ProfileCard';
import BelongCard from '@/components/SocialWorker/MyPage/BelongCard';
import AssociationCard from '@/components/shared/AssociationCard';
import InstitutionCard from '@/components/shared/InstitutionCard';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { ASSOCIATION_RANK_EN_TO_KR } from '@/constants/common/associationRank';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useDeleteUserInfo } from '@/hooks/useDeleteUserInfo';
import {
  useDeleteSocialworker,
  useGetSocialWorkerMy,
  useSocialworkerLogout,
} from '@/api/socialworker';
import {
  ExpelButton,
  LogoutButton,
} from '@/components/common/Button/LogoutButton';

const SocialworkerMyPage = () => {
  const { handleNavigate } = useHandleNavigate();

  const { data } = useGetSocialWorkerMy();
  const isSocialworker =
    data?.socialWorkerInfo.institutionRank === 'SOCIAL_WORKER';
  const isNone = data?.socialWorkerInfo.associationRank === 'NONE';
  const isMember = data?.socialWorkerInfo.associationRank === 'MEMBER';

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { mutate: logout } = useSocialworkerLogout();
  const { mutate: leave } = useDeleteSocialworker();
  const deleteUserInfo = useDeleteUserInfo();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: deleteUserInfo,
    });
  };

  const handleWithdraw = () => {
    leave(undefined, {
      onSuccess: deleteUserInfo,
    });
  };

  return (
    <Container>
      <NavBar left={<NavLeft>마이페이지</NavLeft>} color="" />

      <ProfileWrapper>
        <ProfileCard
          profileImgURL={data?.institutionInfo.institutionImageUrl ?? ''}
          name={data?.socialWorkerInfo.name ?? ''}
          nickname={data?.socialWorkerInfo.nickName ?? ''}
          // point={1500}
          phoneNumber={data?.socialWorkerInfo.phoneNumber ?? ''}
          age={data?.socialWorkerInfo.age ?? 0}
          gender={GENDER_EN_TO_KR_2[data?.socialWorkerInfo.gender ?? 'FEMALE']}
        />

        <BelongCard
          title={data?.institutionInfo.institutionName ?? ''}
          rank={
            INSTITUTION_RANK_EN_TO_KR[
              data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'
            ]
          }
        />

        {!isNone && (
          <BelongCard
            title={data?.associationName ?? ''}
            rank={
              ASSOCIATION_RANK_EN_TO_KR[
                data?.socialWorkerInfo.associationRank ?? 'MEMBER'
              ]
            }
          />
        )}

        <Button
          height="52px"
          variant="subBlue"
          onClick={() => handleNavigate('/socialworker/my/profile')}
        >
          프로필 수정하기
        </Button>
      </ProfileWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">기관 정보</label>
        <InstitutionCard
          date={data?.institutionInfo.institutionLastUpdate ?? ''}
          institution={data?.institutionInfo.institutionName ?? ''}
          year={data?.institutionInfo.institutionOpenYear ?? 0}
          types={data?.institutionInfo.facilityTypes ?? []}
          phoneNumber={data?.institutionInfo.institutionPhoneNumber ?? ''}
        />
        {!isSocialworker && (
          <Button
            height="52px"
            variant="subBlue"
            onClick={() => handleNavigate('/socialworker/my/institution')}
          >
            기관 정보 수정하기
          </Button>
        )}
      </SectionWrapper>

      {!isNone && (
        <>
          <Border />

          <SectionWrapper>
            <label className="section-title">협회 정보</label>
            <AssociationCard
              association={data?.associationName ?? ''}
              type={
                ASSOCIATION_RANK_EN_TO_KR[
                  data?.socialWorkerInfo.associationRank ?? 'MEMBER'
                ]
              }
              rank={
                INSTITUTION_RANK_EN_TO_KR[
                  data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'
                ]
              }
            />
            {!isMember && (
              <Button
                height="52px"
                variant="subBlue"
                onClick={() => handleNavigate('/socialworker/my/association')}
              >
                협회 정보 변경하기
              </Button>
            )}
          </SectionWrapper>
        </>
      )}

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="section-title">계정</label>
        <LogoutButton onClick={() => setIsLogoutModalOpen(true)} />
        <ExpelButton onClick={() => setIsWithdrawModalOpen(true)} />
      </SectionWrapper>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsLogoutModalOpen(false)}
          title="로그아웃 하시겠습니까?"
          detail="현재 계정에서 로그아웃됩니다. 계속하시겠습니까?"
          left="취소"
          right="로그아웃"
          handleLeftBtnClick={() => setIsLogoutModalOpen(false)}
          handleRightBtnClick={handleLogout}
        />
      </Modal>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsWithdrawModalOpen(false)}
          title="정말 탈퇴 하시겠습니까?"
          detail={'돌봄다리 통합 서비스에서 탈퇴됩니다.\n계속하시겠습니까?'}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => setIsWithdrawModalOpen(false)}
          handleRightBtnClick={handleWithdraw}
        />
      </Modal>
    </Container>
  );
};

export default SocialworkerMyPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 57px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  padding-top: 12px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .section-title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
