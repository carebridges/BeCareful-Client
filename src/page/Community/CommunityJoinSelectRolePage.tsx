import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CommunityJoinSelectRole } from '@/components/Community/JoinCommunity/CommunityJoinSelectRole';
import { AssociationRank } from '@/types/CommunityAssociation';

const CommunityJoinSelectRolePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { associationName } =
    (location.state as { associationName?: string }) || {};

  const [selectedRank, setSelectedRank] = useState<AssociationRank | null>(
    null,
  );

  const handleSubmit = () => {
    if (!id || !selectedRank) return;
    navigate(`/community/join/${id}/accept-terms`, {
      state: { associationName, selectedRank },
    });
  };

  const handleCancel = () => navigate(-1);

  return (
    <>
      <CommunityJoinSelectRole
        selectedRank={selectedRank}
        setSelectedRank={setSelectedRank}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        associationName={associationName ?? ''}
      />
    </>
  );
};

export default CommunityJoinSelectRolePage;
