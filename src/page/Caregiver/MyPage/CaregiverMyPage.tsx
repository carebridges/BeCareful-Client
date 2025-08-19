import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { ReactComponent as ApplicationIcon } from '@/assets/icons/caregiver/MyWork.svg';
import { ReactComponent as CareerIcon } from '@/assets/icons/caregiver/my/Career.svg';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import { Button } from '@/components/common/Button/Button';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import ProfileCard from '@/components/shared/ProfileCard';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Gender_Mapping } from '@/constants/caregiverMapping';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useCaregiverMyPageInfoQuery } from '@/hooks/Caregiver/caregiverQuery';
import { useWorkApplicationToggleMutation } from '@/hooks/Caregiver/mutation/useWorkApplicationToggleMutation';
import {
  caretypeFormat,
  dayFormat,
  locationFormat,
  timeFormat,
} from '@/utils/caregiver';
import { useCaregiverLogout } from '@/api/caregiver';

const CaregiverMyPage = () => {
  const { data, error } = useCaregiverMyPageInfoQuery();
  if (error) {
    console.log('getCaregiverMyPageInfo 에러: ', error);
  }

  const { handleNavigate } = useHandleNavigate();

  const { mutate: toggleWorkApplication } = useWorkApplicationToggleMutation({
    onSuccessCallback: (newIsActive) => {
      setIsToggleChecked(newIsActive);
    },
  });

  const [isToggleChecked, setIsToggleChecked] = useState(false);
  useEffect(() => {
    if (data?.workApplicationInfo.isActive !== undefined) {
      setIsToggleChecked(data.workApplicationInfo.isActive);
    }
  }, [data?.workApplicationInfo.isActive]);

  const handleToggleChange = () => {
    toggleWorkApplication(isToggleChecked);
  };

  const applicationInfo = [
    {
      title: '케어항목',
      detail: caretypeFormat(data?.workApplicationInfo.careTypes ?? [], 2),
    },
    {
      title: '근무요일',
      detail: dayFormat(data?.workApplicationInfo.workDays ?? []),
    },
    {
      title: '근무시간',
      detail: timeFormat(data?.workApplicationInfo.workTimes ?? []),
    },
    {
      title: '희망급여',
      detail:
        data?.workApplicationInfo.workSalaryAmount.toLocaleString('ko-KR'),
    },
    {
      title: '근무지역',
      detail: locationFormat(data?.workApplicationInfo.workLocations ?? [], 2),
    },
  ];

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

  const { mutate: logout } = useCaregiverLogout();
  // const { mutate: leave } = useDeleteSocialworker();
  const setUserInfo = useSetRecoilState(currentUserInfo);

  const handleLogout = () => {
    console.log('로그아웃');
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
    console.log('회원탈퇴');
    // leave();
    localStorage.clear();
    setUserInfo({
      realName: '',
      nickName: '',
      institutionRank: '',
      associationRank: '',
    });
    handleModal(setIsWithdrawModalOpen);
    handleNavigate('/');
  };

  return (
    <Container>
      <NavBar left={<NavLeft>마이페이지</NavLeft>} color="" />

      <ProfileWrapper>
        {data && (
          <ProfileCard
            profileImgURL={data.caregiverInfo.profileImageUrl}
            name={data.caregiverInfo.name}
            point={1500}
            phoneNumber={data.caregiverInfo.phoneNumber}
            age={data.caregiverInfo.age}
            gender={
              data.caregiverInfo.gender &&
              Gender_Mapping[data.caregiverInfo.gender]
            }
          />
        )}
        <Bottom>
          <div className="certificateWrapper">
            <label className="title-label">기본 자격</label>
            <div className="certificates">
              <CertificateCard
                isBlue={data?.caregiverInfo.caregiverDetailInfo.havingCar}
              >
                {data?.caregiverInfo.caregiverDetailInfo.havingCar
                  ? '자차 보유'
                  : '자차 미보유'}
              </CertificateCard>
              <CertificateCard
                isBlue={
                  data?.caregiverInfo.caregiverDetailInfo
                    .completeDementiaEducation
                }
              >
                {data?.caregiverInfo.caregiverDetailInfo
                  .completeDementiaEducation
                  ? '치매교육 이수 완료'
                  : '치매교육 이수전'}
              </CertificateCard>
            </div>
          </div>
          <div className="certificateWrapper">
            <label className="title-label">보유 자격증</label>
            <div className="certificates">
              {data?.caregiverInfo.certificates.map((certificate, index) => (
                <label key={index} className="certificate">
                  {certificate}
                </label>
              ))}
            </div>
          </div>
        </Bottom>

        <Button
          height="52px"
          variant="subBlue"
          onClick={() => handleNavigate('/caregiver/my/profile')}
        >
          프로필 수정하기
        </Button>
      </ProfileWrapper>

      <Border />

      <SectionWrapper>
        <label className="title-label">경력서</label>
        {data?.careerInfo.careerTitle ? (
          <Career>
            <div className="dateWrapper">
              <label className="date">최근 수정일 </label>
              <span>
                {data.careerInfo.lastModifiedDate.replaceAll('-', '.')}
              </span>
            </div>
            <label className="title">{data.careerInfo.careerTitle}</label>
          </Career>
        ) : (
          <NoContent>
            <CareerIcon />
            <label className="title">아직 등록된 경력서가 없어요!</label>
            <label className="detail">
              나의 경력을 입력하여 합격률을 높여보세요!
            </label>
          </NoContent>
        )}
        <Button
          height="52px"
          variant="subBlue"
          onClick={() => handleNavigate('/caregiver/my/career')}
        >
          {data?.careerInfo.careerTitle ? '경력서 수정하기' : '경력서 작성하기'}
        </Button>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title-label">일자리 신청서</label>
        {data?.workApplicationInfo ? (
          <Application>
            <div className="top">
              <div className="left">
                <div className="dateWrapper">
                  <label className="date">최근 수정일 </label>
                  <span>
                    {data.workApplicationInfo.lastModifiedDate.replaceAll(
                      '-',
                      '.',
                    )}
                  </span>
                </div>
                <label className="title">일자리 신청서</label>
              </div>
              <div className="right">
                <Toggle
                  checked={isToggleChecked ? true : false}
                  onChange={handleToggleChange}
                />
                <ToggleLabel isBlue={isToggleChecked}>
                  {isToggleChecked ? '신청중' : '미신청'}
                </ToggleLabel>
              </div>
            </div>
            <InfoDisplay
              items={applicationInfo}
              gapColumn="8px"
              gapRow="32px"
            />
          </Application>
        ) : (
          <NoContent>
            <ApplicationIcon />
            <label className="title">아직 등록된 신청서가 없어요!</label>
            <label className="detail">
              일자리 신청서를 등록하고
              <br />
              나에게 딱 맞는 일자리 확인하세요!
            </label>
          </NoContent>
        )}
        <Button
          height="52px"
          variant="subBlue"
          onClick={() => handleNavigate('/caregiver/my/application')}
        >
          {data?.workApplicationInfo ? '신청서 수정하기' : '신청서 작성하기'}
        </Button>
      </SectionWrapper>

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="title-label">계정</label>
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

export default CaregiverMyPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 57px;

  div {
    display: flex;
  }

  .title-label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  padding: 12px 0px;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const Bottom = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 20px;

  .certificateWrapper {
    flex-direction: column;
    gap: 16px;
  }

  .certificates {
    gap: 6px;
  }

  .certificate {
    padding: 4px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const CertificateCard = styled.label<{ isBlue: boolean | undefined }>`
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, isBlue }) => (isBlue ? 'none' : theme.colors.gray100)};
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.subBlue : theme.colors.gray50};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const NoContent = styled.div`
  margin-bottom: 8px;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    text-align: center;
  }
`;

const Career = styled.div`
  padding: 20px;
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .dateWrapper {
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Application = styled.div`
  padding: 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  div {
    flex-direction: column;
  }

  .dateWrapper {
    flex-direction: row;
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .top {
    flex-direction: row;
    gap: auto;
    justify-content: space-between;
  }

  .left {
    gap: auto;
    justify-content: space-between;
  }

  .right {
    gap: 4px;
    align-items: center;
  }
`;

const Logout = styled.div<{ isRed: boolean }>`
  height: 18px;
  padding: 20px;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

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

const ToggleLabel = styled.label<{ isBlue: boolean | undefined }>`
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
