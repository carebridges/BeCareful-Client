import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as Setting } from '@repo/ui/src/assets/icons/Setting.svg';
import ProfileSection from '@/components/Caregiver/Mypage/ProfileSection';
import CareerSection from '@/components/Caregiver/Mypage/CareerSection';
import ApplicationSection from '@/components/Caregiver/Mypage/ApplicationSection';
import { useWorkApplicationToggleMutation } from '@/hooks/Caregiver/mutation/useWorkApplicationToggleMutation';
import { useCaregiverProfile } from '@/api/user/caregiver';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { NavBar } from '@repo/ui';

const CaregiverMyPage = () => {
  const { handleNavigate } = useHandleNavigate();

  const { data } = useCaregiverProfile();
  const [isToggleChecked, setIsToggleChecked] = useState(false);
  const isActive = data?.workApplicationInfo?.isActive;

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setIsToggleChecked(isActive);
    }
  }, [isActive]);

  const { mutate: toggleWorkApplication } = useWorkApplicationToggleMutation({
    onSuccessCallback: (newIsActive) => {
      setIsToggleChecked(newIsActive);
    },
  });

  const handleToggleChange = () => {
    toggleWorkApplication(!isToggleChecked);
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft>마이페이지</NavLeft>}
        right={
          <Setting onClick={() => handleNavigate('/caregiver/my/setting')} />
        }
      />

      <ProfileSection data={data?.caregiverInfo} />

      <Border />

      <CareerSection data={data?.careerInfo} />
      <ApplicationSection
        data={data?.workApplicationInfo}
        isToggleChecked={isToggleChecked}
        handleToggleChange={handleToggleChange}
      />

      <Border style={{ height: '5px' }} />
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

  svg {
    cursor: pointer;
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
