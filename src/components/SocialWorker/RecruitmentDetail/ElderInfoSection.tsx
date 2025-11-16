import { styled } from 'styled-components';

type ElderInfoSectionProps = {
  profileImageUrl: string;
  name: string;
  genderAgeLabel: string;
  address: string;
  healthCondition: string;
  hasInmateLabel: string;
  hasPetLabel: string;
};

export const ElderInfoSection = ({
  profileImageUrl,
  name,
  genderAgeLabel,
  address,
  healthCondition,
  hasInmateLabel,
  hasPetLabel,
}: ElderInfoSectionProps) => {
  return (
    <InfoContainer>
      <Title>어르신 정보</Title>
      <ElderProfile>
        <ProfileImage src={profileImageUrl} alt={name} />
        <span>{name}</span>
      </ElderProfile>

      <DetailContainer>
        <DetailContent>
          <p className="type">나이/성별</p>
          <p className="answer">{genderAgeLabel}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">주소</p>
          <p className="answer">{address}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">건강상태</p>
          <p className="answer">{healthCondition}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">거주형태</p>
          <p className="answer">{hasInmateLabel}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">반려동물</p>
          <p className="answer">{hasPetLabel}</p>
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

const ElderProfile = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin-right: 8px;
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
