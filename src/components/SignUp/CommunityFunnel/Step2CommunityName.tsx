import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';
import { CommunitySearchInput } from '@/components/SignUp/CommunityFunnel/CommunitySearchInput';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';

interface StepProps {
  goToNext: () => void;
  onCancel?: () => void;
  communityFormData: CommunityFormData;
  setCommunityFormData: React.Dispatch<React.SetStateAction<CommunityFormData>>;
}

export const Step2CommunityName = ({
  goToNext,
  onCancel,
  communityFormData,
  setCommunityFormData,
}: StepProps) => {
  const handleCommunityNameChange = (name: string) => {
    setCommunityFormData((prev) => ({ ...prev, name }));
  };

  const handleCommunityOpenYearChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const year = parseInt(value, 10);
    setCommunityFormData((prev) => ({
      ...prev,
      establishedYear: isNaN(year) ? 0 : year,
    }));
  };

  const handleNext = () => {
    if (!isCommunityNameValid || !isEstablishedYearValid) {
      if (!isEstablishedYearValid) {
        alert('설립연도를 올바르게 입력해주세요.');
      }
      return;
    }
    goToNext();
  };

  const isCommunityNameValid = communityFormData.name.length > 0;
  const isEstablishedYearValid =
    communityFormData.establishedYear >= 1800 &&
    communityFormData.establishedYear <= new Date().getFullYear();

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          협회명을 입력하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 협회의 정확한 명칭을 검색해 주세요.</SubText>
      </HeaderSection>
      <SearchContainer>
        <CommunitySearchInput onCommunitySelect={handleCommunityNameChange} />
      </SearchContainer>
      <Header2Section>
        <Title>
          협회 설립연도를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 협회의 설립연도를 입력해주세요.</SubText>
      </Header2Section>
      <SearchContainer>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="협회 설립연도 입력"
          guide=""
          value={
            communityFormData.establishedYear === 0
              ? ''
              : String(communityFormData.establishedYear)
          }
          onChange={handleCommunityOpenYearChange}
          inputMode="numeric"
          maxLength={4}
        />
      </SearchContainer>
      <ButtonContainer>
        <Button onClick={onCancel} height={'52px'} variant="blue2">
          이전
        </Button>
        <Button
          onClick={handleNext}
          height="52px"
          variant={isCommunityNameValid ? 'blue' : 'gray'}
          disabled={!isCommunityNameValid}
        >
          확인
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
