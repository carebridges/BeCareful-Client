'use client';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CommunityJoinSelectRole } from '@/components/Community/JoinCommunity/CommunityJoinSelectRole';
import { AssociationRank } from '@repo/common';
import { useParams, useRouter } from 'next/navigation';

const CommunityJoinSelectRolePage = () => {
  const navigate = useNavigate();
  const router = useRouter();

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

  const handleCancel = () => router.back();

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
