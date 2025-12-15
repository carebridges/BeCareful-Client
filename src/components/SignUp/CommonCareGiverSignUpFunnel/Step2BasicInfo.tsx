import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { NameInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/NameInput';
import { PhoneNumberInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/PhoneNumberInput';
import { ResidentIdInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/ResidentIdInput';
import { useNavigate } from 'react-router-dom';
import { useCommonCaregiverSignUpContext } from '@/contexts/CommonCaregiverSignUpContext';
import { useCommonCaregiverBasicInfoForm } from '@/hooks/SignUp/useCaregiverBasicInfoForm';

export const Step2BasicInfo = () => {
  const { goToNext } = useCommonCaregiverSignUpContext();
  const navigate = useNavigate();
  const goToPrev = () => {
    navigate(-1);
  };
  const { formData, handleChange, handleBirthAndGenderChange } =
    useCommonCaregiverBasicInfoForm();

  //const isNextEnabled = isFormValid;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>담당자 기본 정보를 입력하세요.</Title>
      </HeaderSection>

      <NameInput
        value={formData.realName}
        onChange={handleChange('realName')}
      />

      <ResidentIdInput
        birthDate={formData.birthYymmdd}
        genderInput={
          formData.genderCode > 0 ? formData.genderCode.toString() : ''
        }
        onBirthDateChange={(e) =>
          handleBirthAndGenderChange(
            e.target.value,
            formData.genderCode.toString(),
          )
        }
        onGenderChange={(e) =>
          handleBirthAndGenderChange(formData.birthYymmdd, e.target.value)
        }
      />

      <PhoneNumberInput
        value={formData.phoneNumber}
        onChange={handleChange('phoneNumber')}
      />

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          height="52px"
          variant={'blue'}
          //disabled={!isNextEnabled}
        >
          다음 단계로 이동
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 112px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;
