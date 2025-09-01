import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { FACILITY_TYPES } from '@/constants/socialworker/institutionFacilityTypes';
import { FacilityType } from '@/types/SocialSignUp';

interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
  institutionFormData: InstitutionFormData;
  setInstitutionFormData: React.Dispatch<
    React.SetStateAction<InstitutionFormData>
  >;
}

export const Step3InstitutionType = ({
  goToNext,
  goToPrev,
  institutionFormData,
  setInstitutionFormData,
}: StepProps) => {
  const handleTypeSelect = (type: FacilityType) => {
    setInstitutionFormData((prev) => {
      const alreadySelected = prev.facilityTypeList.includes(type);

      return {
        ...prev,
        facilityTypeList: alreadySelected
          ? prev.facilityTypeList.filter((t) => t !== type)
          : [...prev.facilityTypeList, type],
      };
    });
  };

  const isInstitutionTypeValid =
    institutionFormData.facilityTypeList.length > 0;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관의 <br />
          시설 유형을 선택하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>복수 선택이 가능해요.</SubText>
      </HeaderSection>
      <CardContainer>
        {FACILITY_TYPES.map((type) => (
          <CheckCard
            key={type}
            pressed={institutionFormData.facilityTypeList.includes(type)}
            text={type}
            onClick={() => handleTypeSelect(type)}
          />
        ))}
      </CardContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height={'52px'} variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          height="52px"
          variant={isInstitutionTypeValid ? 'blue' : 'gray'}
          disabled={!isInstitutionTypeValid}
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
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 55px 20px;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
`;
