import styled from 'styled-components';

interface BelongCardProps {
  title: string;
  rank: string;
}

const BelongCard = ({ title, rank }: BelongCardProps) => {
  return (
    <CardContainer>
      <label className="title">{title}</label>
      <div className="rank">{rank}</div>
    </CardContainer>
  );
};

export default BelongCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .rank {
    align-self: flex-start;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
