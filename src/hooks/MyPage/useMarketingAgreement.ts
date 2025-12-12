import { useCallback, useEffect, useState } from 'react';
import { UserRole } from '@/types/common/chat';
import {
  useGetCaregiverMarketingInfo,
  usePatchCaregiverMarketingInfo,
} from '@/api/caregiver';
import {
  useGetSocialMarketingInfo,
  usePatchSocialMarketingInfo,
} from '@/api/socialworker';

export const useMarketingAgreement = (role: UserRole) => {
  const [isMarketingAgree, setIsMarketingAgree] = useState(false);
  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);

  const { data: caregiverData } = useGetCaregiverMarketingInfo();
  const { data: socialworkerData } = useGetSocialMarketingInfo();

  const data = role === 'CAREGIVER' ? caregiverData : socialworkerData;

  useEffect(() => {
    if (data) setIsMarketingAgree(data.isAgreedToReceiveMarketingInfo);
  }, [data]);

  const { mutate: caregiverMarketingAgree } = usePatchCaregiverMarketingInfo();
  const { mutate: socialMarketingAgree } = usePatchSocialMarketingInfo();

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
