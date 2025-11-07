import { useGetAssociationList } from '@/api/communityAssociation';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { AssociationListCard } from '@/components/Community/JoinCommunity/AssociationListCard';
import { CommunityNotFound } from '@/components/Community/JoinCommunity/CommunityNotFound';
import { AssociationWholeList } from '@/types/CommunityAssociation';
import { styled } from 'styled-components';

interface Props {
  keyword: string;
}

export const CommunitySearchList = ({ keyword }: Props) => {
  const trimmed = keyword.trim();
  const isSearching = trimmed.length > 0;

  const { data, isLoading, isError } = useGetAssociationList();
  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorIndicator />;

  const raw = data.associationResponseList ?? [];

  const associations = raw.map((item: AssociationWholeList) => ({
    id: item.associationId,
    name: item.associationName,

    establishedYear:
      item.associationEstablishedYear && item.associationEstablishedYear > 0
        ? `${item.associationEstablishedYear}년`
        : '-',
    memberCount: item.associationMemberCount,
    thumbnailUrl: item.associationProfileImageUrl || undefined,
  }));

  const filtered = isSearching
    ? associations.filter((a) => a.name.includes(trimmed))
    : associations;

  const title = isSearching
    ? `${filtered.length}건`
    : `전체 ${associations.length}개`;

  if (isSearching && filtered.length === 0) {
    return (
      <>
        <ResultCountText>0건</ResultCountText>
        <CommunityNotFound />
      </>
    );
  }

  return <AssociationListCard title={title} associations={filtered} />;
};

const ResultCountText = styled.div`
  padding: 16px 20px 0;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray700};
`;
