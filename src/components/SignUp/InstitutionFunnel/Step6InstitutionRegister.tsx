import { styled } from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { ReactComponent as SignUpComplete } from '@/assets/icons/signup/SignUpComplete.svg';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { useRegisterInstitution } from '@/api/institutionFunnel';
import { useState } from 'react';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';

interface StepProps {
  onComplete: (newInstitutionId: number) => void;
  institutionFormData: InstitutionFormData;
}

export const Step6InstitutionRegister = ({
  onComplete,
  institutionFormData,
}: StepProps) => {
  const { mutate } = useRegisterInstitution();
  const [isError, setIsError] = useState(false);

  const handleRegister = () => {
    mutate(institutionFormData, {
      onSuccess: (newInstitutionId) => {
        onComplete(newInstitutionId);
      },
      onError: () => {
        setIsError(true);
      },
    });
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          기관 등록이 완료되었습니다.
          <br />
          <span className="highlight">이어서 회원가입을 진행해 보세요!</span>
        </Title>
      </HeaderSection>
      <SignUpCompleteContainer>
        {!isError && <SignUpComplete />}
      </SignUpCompleteContainer>

      {isError && (
        <ErrorContainer>
          <ErrorIndicator />
        </ErrorContainer>
      )}

      <ButtonContainer>
        <Button
          onClick={handleRegister}
          height="52px"
          variant={isError ? 'gray' : 'blue'}
        >
          회원 가입 진행하기
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
`;

const SignUpCompleteContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  z-index: 3;

  svg {
    width: 240px;
    height: auto;
    display: block;
  }
`;

const ErrorContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
