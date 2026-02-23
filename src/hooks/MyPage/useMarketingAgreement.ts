import { useCallback, useEffect, useState } from 'react';
import { UserRole } from '@/types/common';
import {
  useCaregiverMarketing,
  useUpdateCaregiverMarketing,
} from '@/api/user/caregiver';
import {
  useSocialworkerMarketing,
  useUpdateSocialMarketing,
} from '@/api/user/socialworker';

export const useMarketingAgreement = (role: UserRole) => {
  const [isMarketingAgree, setIsMarketingAgree] = useState(false);
  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);

  const { data: caregiverData } = useCaregiverMarketing(role === 'CAREGIVER');
  const { data: socialworkerData } = useSocialworkerMarketing(
    role === 'SOCIAL_WORKER',
  );

  const data = role === 'CAREGIVER' ? caregiverData : socialworkerData;

  useEffect(() => {
    if (data) setIsMarketingAgree(data.isAgreedToReceiveMarketingInfo);
  }, [data]);

  const { mutate: caregiverMarketingAgree } = useUpdateCaregiverMarketing();
  const { mutate: socialMarketingAgree } = useUpdateSocialMarketing();

  const handleMarketingClick = useCallback(async () => {
    const nextAgreementStatus = !isMarketingAgree;

    const updateMarketingAgree =
      role === 'CAREGIVER' ? caregiverMarketingAgree : socialMarketingAgree;

    updateMarketingAgree(
      {
        isAgreedToReceiveMarketingInfo: nextAgreementStatus,
      },
      {
        onSuccess: () => {
          setIsMarketingAgree(nextAgreementStatus);
          setIsAgreeModalOpen(true);
        },
      },
    );
  }, [isMarketingAgree, role, caregiverMarketingAgree, socialMarketingAgree]);

  return {
    isMarketingAgree,
    isAgreeModalOpen,
    setIsAgreeModalOpen,
    handleMarketingClick,
  };
};
