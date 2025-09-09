import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
  institutionFormData: InstitutionFormData;
  setInstitutionFormData: React.Dispatch<
    React.SetStateAction<InstitutionFormData>
  >;
}

export const Step2InstitutionOpen = ({
  goToNext,
  goToPrev,
  institutionFormData,
  setInstitutionFormData,
}: StepProps) => {
  const handleInstitutionOpenDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const parsedValue = value === '' ? 0 : parseInt(value, 10);

    setInstitutionFormData((prev) => ({
      ...prev,
      openYear: parsedValue,
    }));
  };

  const isInstitutionOpenDateValid = /^\d{4}$/.test(
    String(institutionFormData.openYear),
  );

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관의 <br />
          개소 연도를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>센터가 설립되고 운영을 시작한 해를 입력해 주세요.</SubText>
      </HeaderSection>
      <SearchContainer>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="기관 개소 연도 입력"
          guide=""
          value={
            institutionFormData.openYear === 0
              ? ''
              : String(institutionFormData.openYear)
          }
          onChange={handleInstitutionOpenDateChange}
          inputMode="numeric"
          maxLength={4}
        />
      </SearchContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height={'52px'} variant="blue2">
          이전
        </Button>
        <Button
          onClick={() => {
            goToNext();
          }}
          height={'52px'}
          variant={isInstitutionOpenDateValid ? 'blue' : 'gray'}
          disabled={!isInstitutionOpenDateValid}
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
