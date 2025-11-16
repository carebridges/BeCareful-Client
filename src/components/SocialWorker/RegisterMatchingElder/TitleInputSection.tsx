import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import styled from 'styled-components';

interface Props {
  title: string;
  setTitle: (value: string) => void;
}

export const TitleInputSection = ({ title, setTitle }: Props) => {
  return (
    <TitleContainer>
      <div className="name">
        <span>제목</span>
        <span className="highlight">*</span>
      </div>
      <PlainInputBox
        state="default"
        placeholder="공고 제목을 입력하세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        width="100%"
        guide=""
      />
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  padding: 40px 20px 0px 20px;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  flex-direction: column;
  box-sizing: border-box;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .name {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
`;
