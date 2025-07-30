import styled from 'styled-components';
import { ReactComponent as ElderList } from '@/assets/icons/elderly/ElderList.svg';
import { useNavigate } from 'react-router-dom';

interface ElderMatchingCardProps {
  recruitmentId: number;
  name: string;
  age: number;
  gender: string;
  matchingCount: number;
  applicantCount: number;
}

export const ElderMatchingCard = ({
  recruitmentId,
  name,
  age,
  gender,
  matchingCount,
  applicantCount,
}: ElderMatchingCardProps) => {
  const navigate = useNavigate();
  return (
    <CardContainer
      onClick={() => navigate(`/socialworker/matching/info/${recruitmentId}`)}
    >
      <PersonWrapper>
        <InfoWrapper>
          <NameWrapper>
            <label className="name">{name}</label>
            <AgeGenderWrapper>
              <label className="detail">{age}세</label>
              <Border />
              <label className="detail">{gender}</label>
            </AgeGenderWrapper>
          </NameWrapper>
          <LabelWrapper>
            <Label>
              <label className="label-title">매칭결과</label>
              <label className="label-detail">{matchingCount}건</label>
            </Label>
            <LabelApply>
              지원자가 <span className="highlight">{applicantCount}</span>명
              있어요!
            </LabelApply>
          </LabelWrapper>
        </InfoWrapper>
        <PersonImg>
          <ElderList />
        </PersonImg>
      </PersonWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 24px 20px;
  height: 76px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;

  &:active {
    transform: scale(0.99);
    transition: transform 0.1s ease-in-out;
  }
`;

const PersonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const AgeGenderWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  .label-title {
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .label-detail {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const LabelApply = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const PersonImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
`;
