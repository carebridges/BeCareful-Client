import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import ProfileCard from '@/components/shared/ProfileCard';
import BelongCard from '@/components/SocialWorker/MyPage/BelongCard';
import AssociationCard from '@/components/shared/AssociationCard';
import InstitutionCard from '@/components/shared/InstitutionCard';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Gender_Mapping } from '@/constants/caregiverMapping';
import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import { Association_Rank_Mapping } from '@/constants/associationRank';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  useDeleteSocialworker,
  useGetSocialWorkerMy,
  useSocialworkerLogout,
} from '@/api/socialworker';

const SocialworkerMyPage = () => {
  const userInfo = useRecoilValue(currentUserInfo);
  const isMember = userInfo.institutionRank === 'SOCIAL_WORKER';

  const { handleNavigate } = useHandleNavigate();

  const { data } = useGetSocialWorkerMy();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  const { mutate: logout } = useSocialworkerLogout();
  const { mutate: leave } = useDeleteSocialworker();
  const setUserInfo = useSetRecoilState(currentUserInfo);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.clear();
        setUserInfo({
          realName: '',
          nickName: '',
          institutionRank: '',
          associationRank: '',
        });
        handleModal(setIsLogoutModalOpen);
        handleNavigate('/');
      },
    });
  };

  const handleWithdraw = () => {
    leave(undefined, {
      onSuccess: () => {
        localStorage.clear();
        setUserInfo({
          realName: '',
          nickName: '',
          institutionRank: '',
          associationRank: '',
        });
        handleModal(setIsWithdrawModalOpen);
        handleNavigate('/');
      },
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
          gender={Gender_Mapping[data?.socialWorkerInfo.gender ?? 'FEMALE']}
        />

        <BelongCard
          title={data?.institutionInfo.institutionName ?? ''}
          rank={
            Institution_Rank_Mapping[
              data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'
            ]
          }
        />

        {!isMember && (
          <BelongCard
            title={data?.associationName ?? ''}
            rank={
              Association_Rank_Mapping[
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
        <Button
          height="52px"
          variant="subBlue"
          onClick={() => handleNavigate('/socialworker/my/institution')}
        >
          기관 정보 수정하기
        </Button>
      </SectionWrapper>

      {!isMember && (
        <>
          <Border />

          <SectionWrapper>
            <label className="section-title">협회 정보</label>
            <AssociationCard
              association={data?.associationName ?? ''}
              type={Association_Rank_Mapping[userInfo.associationRank]}
              rank={Institution_Rank_Mapping[userInfo.institutionRank]}
            />
            <Button
              height="52px"
              variant="subBlue"
              onClick={() => handleNavigate('/socialworker/my/association')}
            >
              협회 정보 변경하기
            </Button>
          </SectionWrapper>
        </>
      )}

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="section-title">계정</label>
        <Logout isRed={true} onClick={() => handleModal(setIsLogoutModalOpen)}>
          <LogoutIcon />
          로그아웃
        </Logout>
        <Logout
          isRed={false}
          onClick={() => handleModal(setIsWithdrawModalOpen)}
        >
          <LogoutIcon />
          탈퇴하기
        </Logout>
      </SectionWrapper>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => handleModal(setIsLogoutModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsLogoutModalOpen)}
          title="로그아웃 하시겠습니까?"
          detail="현재 계정에서 로그아웃됩니다. 계속하시겠습니까?"
          left="취소"
          right="로그아웃"
          handleLeftBtnClick={() => handleModal(setIsLogoutModalOpen)}
          handleRightBtnClick={handleLogout}
        />
      </Modal>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => handleModal(setIsWithdrawModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsWithdrawModalOpen)}
          title="정말 탈퇴 하시겠습니까?"
          detail={'돌봄다리 통합 서비스에서 탈퇴됩니다.\n계속하시겠습니까?'}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => handleModal(setIsWithdrawModalOpen)}
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

const Logout = styled.div<{ isRed: boolean }>`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  color: ${({ theme, isRed }) =>
    isRed ? theme.colors.mainOrange : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
