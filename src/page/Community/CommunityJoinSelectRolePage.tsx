import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CommunityJoinSelectRole } from '@/components/Community/JoinCommunity/CommunityJoinSelectRole';
import { AssociationRank } from '@/types/CommunityAssociation';
import { useJoinAssociation } from '@/api/communityAssociation';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';

const CommunityJoinSelectRolePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { associationName } = location.state || {};
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedRank, setSelectedRank] = useState<AssociationRank | null>(
    null,
  );

  const { mutate: joinAssociation } = useJoinAssociation();
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    window.location.href = '/community';
  };

  const handleSubmit = () => {
    if (!id || !selectedRank) return;

    joinAssociation(
      {
        associationId: Number(id),
        associationRank: selectedRank,
      },
      {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
        },
        onError: (err) => console.error('가입 실패', err),
      },
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <CommunityJoinSelectRole
        selectedRank={selectedRank}
        setSelectedRank={setSelectedRank}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        associationName={associationName ?? ''}
      />
      <Modal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose}>
        <ModalLimit
          onClose={handleSuccessModalClose}
          title={`‘${associationName}’\n커뮤니티 가입 신청이 완료되었어요!`}
          detail="협회장의 승인을 받으면 가입이 완료됩니다."
          button="확인"
          handleBtnClick={handleSuccessModalClose}
        />
      </Modal>
    </>
  );
};

export default CommunityJoinSelectRolePage;
