import { Button } from '@/components/common/Button/Button';
import { styled } from 'styled-components';

interface SubmitSectionProps {
  onSubmit: () => void;
  isValid?: boolean;
}

export function SubmitSection({ onSubmit, isValid }: SubmitSectionProps) {
  return (
    <>
      <ButtonContainer>
        <Button
          variant={isValid ? 'blue' : 'gray'}
          width="100%"
          height="52px"
          onClick={onSubmit}
        >
          저장하기
        </Button>
      </ButtonContainer>
    </>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: calc(100% + 40px);
  margin-left: -20px;
  background-color: ${({ theme }) => theme.colors.white};
`;
