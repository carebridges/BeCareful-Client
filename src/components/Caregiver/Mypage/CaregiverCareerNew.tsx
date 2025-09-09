import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CareerNewProps {
  introduce?: string;
  handleIntroduceChange: (introduce: string) => void;
}

const CaregiverCareerNew = ({
  introduce,
  handleIntroduceChange,
}: CareerNewProps) => {
  const [textCount, setTextCount] = useState(0);
  const [memoContent, setMemoContent] = useState('');

  useEffect(() => {
    if (introduce) {
      setMemoContent(introduce);
      setTextCount(introduce.length);
    }
  }, [introduce]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(e.target.value.length);
    setMemoContent(e.target.value);
    handleIntroduceChange(e.target.value);
  };

  return (
    <Container>
      <InputWrapper>
        <InputFieldLabel htmlFor="memo">자기소개</InputFieldLabel>
        <StrengthWrapper>
          <Strength
            id="memo"
            placeholder="나의 강점을 자유롭게 설명해주세요."
            value={memoContent}
            maxLength={200}
            onChange={handleMemoChange}
          />
          <MemoCount>{textCount}/200</MemoCount>
        </StrengthWrapper>
      </InputWrapper>
    </Container>
  );
};

export default CaregiverCareerNew;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 32px 20px;
  gap: 8px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const InputFieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: -0.35px;
`;

const StrengthWrapper = styled.div`
  position: relative;
`;

const Strength = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const MemoCount = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  right: 16px;
  bottom: 16px;
`;
