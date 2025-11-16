import styled from 'styled-components';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const MemoSection = ({ value, onChange }: Props) => {
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">기타</SectionTitle>
      </SectionTitleWrapper>
      <MemoFieldWrapper>
        <MemoField
          id="memo"
          placeholder={
            '참고할 사항을 입력하세요.\n\n예시) 초보자 가능, 여성 우대, 책임감 있고 긍정적인 보호사 모집'
          }
          value={value}
          maxLength={200}
          onChange={onChange}
        />

        <MemoCount>{value.length}/200</MemoCount>
      </MemoFieldWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 20px 0px 20px;
  gap: 8px;
  box-sizing: border-box;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const SectionTitle = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const MemoField = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
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

const MemoFieldWrapper = styled.div`
  position: relative;
`;
