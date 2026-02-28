import { styled } from 'styled-components';

type InstitutionInfoSectionProps = {
  name: string;
  address: string;
};

export const InstitutionInfoSection = ({
  name,
  address,
}: InstitutionInfoSectionProps) => {
  return (
    <InfoContainer>
      <Title>기관정보</Title>
      <DetailContainer>
        <DetailContent>
          <p className="type">기관명</p>
          <p className="answer">{name}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">주소</p>
          <p className="answer">{address}</p>
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
