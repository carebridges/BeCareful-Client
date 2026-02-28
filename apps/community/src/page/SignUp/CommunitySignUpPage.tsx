'use client';

import { CommunityModal } from '@/components/SignUp/CommunityFunnel/CommunityExitModal';
import { CommunityFunnel } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';

import { useState } from 'react';

export const CommunitySignUpPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDone = () => {
    console.log('생성 완료');
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  return (
    <>
      <CommunityFunnel onDone={handleDone} onCancel={handleCancel} />
      {showModal && (
        <CommunityModal
          width="312px"
          onClose={() => setShowModal(false)}
          recruitmentId={null}
        />
      )}
    </>
  );
};
