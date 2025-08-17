import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';

import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { InstitutionRegisterNameInput } from '@/components/SignUp/InstitutionFunnel/Step1InstitutionName/InstitutionRegisterNameInput';
import { InstitutionCodeInput } from '@/components/SignUp/InstitutionFunnel/Step1InstitutionName/InstitutionCodeInput';
import { useState } from 'react';

interface StepProps {
  goToNext: () => void;
  onCancel?: () => void;
  institutionFormData: InstitutionFormData;
  setInstitutionFormData: React.Dispatch<
    React.SetStateAction<InstitutionFormData>
  >;
}

export const Step1InstitutionName = ({
  goToNext,
  onCancel,
  institutionFormData,
  setInstitutionFormData,
}: StepProps) => {
  const handleInstitutionSelect = (
    name: string,
    _id?: number,
    address?: string,
  ) => {
    setInstitutionFormData((prev) => ({
      ...prev,
      institutionName: name,
      streetAddress: address || '',
      detailAddress: '',
    }));
  };

  const handleInstitutionNameChange = (name: string) => {
    setInstitutionFormData((prev) => ({ ...prev, institutionName: name }));
  };
  const handleInstitutionCodeChange = (code: string) => {
    setInstitutionFormData((prev) => ({ ...prev, institutionCode: code }));
  };

  const [isInstitutionCodeDuplicate, setIsInstitutionCodeDuplicate] =
    useState(false);

  const isInstitutionNameValid = institutionFormData.institutionName.length > 0;
  const isInstitutionCodeValid =
    institutionFormData.institutionCode.length > 0 &&
    !isInstitutionCodeDuplicate;

  const isNextEnabled = isInstitutionNameValid && isInstitutionCodeValid;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관을 등록하세요
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 기관의 정확한 명칭을 검색해 주세요.</SubText>
      </HeaderSection>
      <SearchContainer>
        <InstitutionRegisterNameInput
          onInstitutionSelect={handleInstitutionSelect}
          onChangeText={handleInstitutionNameChange}
        />
      </SearchContainer>
      <Header2Section>
        <Title>
          소속된 기관 코드를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 기관의 코드를 등록해 주세요.</SubText>
      </Header2Section>
      <SearchContainer>
        <InstitutionCodeInput
          onInstitutionCodeChange={handleInstitutionCodeChange}
          onDuplicateCheck={setIsInstitutionCodeDuplicate}
        />
      </SearchContainer>
      <ButtonContainer>
        <Button onClick={onCancel} height={'52px'} variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          height="52px"
          variant={isNextEnabled ? 'blue' : 'gray'}
          disabled={!isNextEnabled}
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

const Header2Section = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 36px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
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

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  flex-direction: column;
`;
