//import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';

//import { Button } from '@/components/common/Button/Button';
//import { CheckCard } from '@/components/SignUp/SignUpFunnel/CheckCard';

export const Step2ProfileType = () => {
  //const { goToNext, goToPrev, formData, setFormData } = useSignUpContext();
  {
    /*const handleTypeChange = (selectedType: string) => {
    setFormData((prev) => ({ ...prev, profileType: selectedType }));
  };*/
  }

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관에서
          <br />
          현재 직급을 알려주세요<span className="highlight"> *</span>
        </Title>
      </HeaderSection>
      {/*}
      <CardContainer>
        <CheckCard
          pressed={formData.profileType === '회장'}
          text="회장 입니다."
          onClick={() => handleTypeChange('회장')}
        />
        <CheckCard
          pressed={formData.profileType === '임원진'}
          text="임원진 입니다."
          onClick={() => handleTypeChange('임원진')}
        />
        <CheckCard
          pressed={formData.profileType === '회원'}
          text="회원 입니다."
          onClick={() => handleTypeChange('회원')}
        />
      </CardContainer>
      <ButtonContainer>
        <Button onClick={goToPrev} height={'52px'} variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          disabled={!formData.profileType}
          variant={formData.profileType ? 'blue' : 'gray'}
          height={'52px'}
        >
          다음
        </Button>
      </ButtonContainer>*/}
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 135px;
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
/*
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
`;
*/
