import { useSignUpContext } from '@/contexts/SocialWorkerSignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { useNavigate } from 'react-router-dom';

const mapToInstitutionRank = (kor: string) => {
  switch (kor) {
    case '센터장':
      return 'CENTER_DIRECTOR';
    case '대표':
      return 'REPRESENTATIVE';
    case '사회복지사':
      return 'SOCIAL_WORKER';
    default:
      return 'SOCIAL_WORKER';
  }
};

export const Step1SelectRole = () => {
  const { goToNext, formData, setFormData } = useSignUpContext();

  const handleRoleChange = (korLabel: string) => {
    const rank = mapToInstitutionRank(korLabel);
    setFormData((prev) => ({ ...prev, institutionRank: rank }));
  };

  const navigate = useNavigate();
  const goToPrev = () => {
    navigate(-1);
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관에서
          <br />
          현재 직급을 알려주세요<span className="highlight"> *</span>
        </Title>
      </HeaderSection>

      <CardContainer>
        <CheckCard
          pressed={formData.institutionRank === 'CENTER_DIRECTOR'}
          text="센터장 입니다."
          onClick={() => handleRoleChange('센터장')}
        />
        <CheckCard
          pressed={formData.institutionRank === 'REPRESENTATIVE'}
          text="대표 입니다."
          onClick={() => handleRoleChange('대표')}
        />
        <CheckCard
          pressed={formData.institutionRank === 'SOCIAL_WORKER'}
          text="사회복지사 입니다."
          onClick={() => handleRoleChange('사회복지사')}
        />
      </CardContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          disabled={!formData.institutionRank}
          variant={formData.institutionRank ? 'blue' : 'gray'}
          height="52px"
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
`;
