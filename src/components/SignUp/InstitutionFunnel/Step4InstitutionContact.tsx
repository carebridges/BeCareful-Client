import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

interface Step4Props {
  goToNext: () => void;
  goToPrev: () => void;
  institutionFormData: InstitutionFormData;
  setInstitutionFormData: React.Dispatch<
    React.SetStateAction<InstitutionFormData>
  >;
}

export const Step4InstitutionContact = ({
  goToNext,
  goToPrev,
  institutionFormData,
  setInstitutionFormData,
}: Step4Props) => {
  const handleInstitutionPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setInstitutionFormData((prev) => ({
      ...prev,
      phoneNumber: formatPhoneNumber(value),
    }));
  };

  const isInstitutionPhoneValid = institutionFormData.phoneNumber.length > 0;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관의 <br />
          연락처를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>기관 대표 전화번호를 입력해 주세요.</SubText>
      </HeaderSection>

      <SearchContainer>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="기관 연락처 입력"
          guide=""
          value={institutionFormData.phoneNumber}
          onChange={handleInstitutionPhoneChange}
          inputMode="tel"
          maxLength={13}
        />
      </SearchContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={() => {
            goToNext();
          }}
          height="52px"
          variant={isInstitutionPhoneValid ? 'blue' : 'gray'}
          disabled={!isInstitutionPhoneValid}
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
