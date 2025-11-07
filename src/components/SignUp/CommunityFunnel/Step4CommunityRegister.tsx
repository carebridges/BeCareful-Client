import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as SignUpComplete } from '@/assets/icons/signup/SignUpComplete.svg';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';
import { useNavigate } from 'react-router-dom';

interface StepProps {
  communityFormData: CommunityFormData;
  onComplete?: () => void;
}
export const Step4CommunityRegister = ({ communityFormData }: StepProps) => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/community');
  };
  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          {communityFormData.name}
          <br />
          커뮤니티가 만들어졌어요!
          <br />
          <span className="highlight">회원을 초대해 보세요.</span>
        </Title>
      </HeaderSection>
      <SignUpCompleteContainer>
        <SignUpComplete />
      </SignUpCompleteContainer>

      <ButtonContainer>
        <Button onClick={handleComplete} height="52px" variant="blue2">
          커뮤니티 둘러보기
        </Button>
        <Button onClick={handleComplete} height="52px" variant="blue">
          회원 초대하기
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
