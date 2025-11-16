import styled from 'styled-components';

interface BirthInputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  birth?: string;
  gender?: number;
}

const BirthInputBox = ({ birth }: BirthInputBoxProps) => {
  return (
    <Container>
      <div className="titleWrapper">
        <label className="title">
          주민등록번호 <span>*</span>
        </label>
      </div>
      <ResidentWrapper>
        <InputNotFix>{birth}</InputNotFix>-
        <CircleWrapper>
          <Circle>
            <Dot />
          </Circle>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Dot key={i} />
            ))}
        </CircleWrapper>
      </ResidentWrapper>
    </Container>
  );
};

export default BirthInputBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .titleWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const InputNotFix = styled.div`
  width: 100%;
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.gray50};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ResidentWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const Circle = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.gray50};
`;

const CircleWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.gray600};
  border-radius: 50%;
`;
