import { InstitutionFunnel } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';

import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { InstitutionSearchInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step3InstitutionName/InstitutionSearchInput';
import { useInstitutionSearch } from '@/hooks/SignUp/useInstitutionSearch';

export const Step3InstitutionName = () => {
  const {
    setInstitutionName,
    setInstitutionId,
    institutionId,
    isRegisteringInstitution,
    handleClickRegisterInstitution,
    handleRegisterComplete,
    handleRegisterCancel,
    handleNext,
  } = useInstitutionSearch();

  if (isRegisteringInstitution) {
    return (
      <InstitutionFunnel
        onDone={handleRegisterComplete}
        onCancel={handleRegisterCancel}
      />
    );
  }

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관명을 입력하세요<span className="highlight"> *</span>
        </Title>
        <SubText>소속된 기관을 아래 목록에서 선택해주세요</SubText>
      </HeaderSection>

      <SearchContainer>
        <InstitutionSearchInput
          onInstitutionSelect={(name, id) => {
            setInstitutionName(name);
            if (id) setInstitutionId(id);
          }}
          onRequestRegister={handleClickRegisterInstitution}
        />
      </SearchContainer>

      <ButtonContainer>
        <Button onClick={handleRegisterCancel} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={handleNext}
          height="52px"
          variant={institutionId ? 'blue' : 'gray'}
          disabled={!institutionId}
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
  //overflow-y: auto;
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

  background: ${({ theme }) => theme.colors.white};
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  flex-direction: column;
`;
