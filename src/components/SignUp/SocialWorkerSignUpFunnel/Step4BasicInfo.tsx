import { useSignUpContext } from '@/contexts/KakaoSocialWorkerSignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { NameInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/NameInput';
import { NicknameInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/NicknameInput';
import { PhoneNumberInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/PhoneNumberInput';
import { ResidentIdInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/ResidentIdInput';
import { useBasicInfoForm } from '@/hooks/SignUp/useBasicInfoForm';

export const Step4BasicInfo = () => {
  const { goToNext, goToPrev } = useSignUpContext();
  const {
    formData,
    isFormValid,
    handleChange,
    handleCheckDuplicate,
    handleBirthAndGenderChange,
    message,
    state,
  } = useBasicInfoForm();

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>담당자 기본 정보를 입력하세요.</Title>
      </HeaderSection>

      <NameInput
        value={formData.realName}
        onChange={handleChange('realName')}
      />
      <NicknameInput
        value={formData.nickName}
        onChange={handleChange('nickName')}
        onCheckDuplicate={handleCheckDuplicate}
      />
      {message && (
        <ValidationMessage state={state}>{message}</ValidationMessage>
      )}
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
          variant={isFormValid ? 'blue' : 'gray'}
          disabled={!isFormValid}
        >
          다음
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

const ValidationMessage = styled.p<{ state: 'default' | 'error' | 'success' }>`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  margin-top: 8px;
  color: ${({ theme, state }) =>
    state === 'error' ? theme.colors.mainOrange : theme.colors.mainBlue};
`;
