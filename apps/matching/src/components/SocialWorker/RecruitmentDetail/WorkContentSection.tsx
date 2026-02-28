import { styled } from 'styled-components';

type WorkContentSectionProps = {
  careDetailLabel: string;
  description: string;
};

export const WorkContentSection = ({
  careDetailLabel,
  description,
}: WorkContentSectionProps) => {
  return (
    <InfoContainer>
      <Title>근무내용</Title>
      <DetailContainer>
        <DetailContent>
          <p className="type">케어항목</p>
          <p className="answer">
            {careDetailLabel.split('\n').map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </DetailContent>
        <DetailContent>
          <p className="type">기타</p>
          <p className="answer">{description}</p>
        </DetailContent>
      </DetailContainer>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .answer {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .type {
    width: 72px;
  }
`;
