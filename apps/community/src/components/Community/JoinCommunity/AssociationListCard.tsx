'use client';

import { AssociationListItem } from '@/components/Community/JoinCommunity/AssociationListItem';
import { styled } from 'styled-components';

interface AssociationList {
  id: number;
  name: string;
  establishedYear: string;
  memberCount: number;
  thumbnailUrl?: string;
}

interface AssociationListCardProps {
  associations: AssociationList[];
  title: string;
}

export const AssociationListCard = ({
  associations,
  title,
}: AssociationListCardProps) => {
  return (
    <CardWrapper>
      <CountWrapper>{title}</CountWrapper>
      <CardListWrapper>
        {associations.map((item) => (
          <AssociationListItem
            id={item.id}
            key={item.id}
            name={item.name}
            establishedYear={item.establishedYear}
            memberCount={item.memberCount}
            thumbnailUrl={item.thumbnailUrl}
          />
        ))}
      </CardListWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardListWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 24px 20px 12px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.03);
  margin: 0 20px;
`;

const CountWrapper = styled.div`
  display: flex;
  padding: 16px 20px 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray700};
`;
