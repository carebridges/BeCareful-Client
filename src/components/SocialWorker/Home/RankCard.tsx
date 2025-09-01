import styled from 'styled-components';
import { ColorTypes } from '@/style/theme/color';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { InstitutionRank } from '@/types/Community/common';

interface RankStyleProps {
  color: keyof ColorTypes;
  background: keyof ColorTypes;
}

export const RankStyles: Record<InstitutionRank, RankStyleProps> = {
  CENTER_DIRECTOR: { color: 'mainBlue', background: 'subBlue' },
  REPRESENTATIVE: { color: 'mainBlue', background: 'subBlue' },
  SOCIAL_WORKER: {
    color: 'mainGreen',
    background: 'subGreen',
  },
};

interface RankCardProps {
  rank: InstitutionRank;
}

const RankCard = ({ rank }: RankCardProps) => {
  const { color, background } = RankStyles[rank ?? 'SOCIAL_WORKER'];
  return (
    <Rank color={color} background={background}>
      {INSTITUTION_RANK_EN_TO_KR[rank ?? 'SOCIAL_WORKER']}
    </Rank>
  );
};

export default RankCard;

const Rank = styled.div<RankStyleProps>`
  padding: 2px 6px;
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background: ${({ theme, background }) => theme.colors[background]};
`;
