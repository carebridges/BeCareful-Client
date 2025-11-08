import { CommunityAgreeField } from '@/types/CommunityAssociation';
import { useState, useMemo, useCallback } from 'react';

export interface AgreeState {
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

const INITIAL: AgreeState = {
  isAgreedToTerms: false,
  isAgreedToCollectPersonalInfo: false,
  isAgreedToReceiveMarketingInfo: false,
};

export const useCommunityAgree = () => {
  const [agreeState, setAgreeState] = useState<AgreeState>(INITIAL);
  const [expanded, setExpanded] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const requiredAgreed = useMemo(
    () =>
      agreeState.isAgreedToTerms && agreeState.isAgreedToCollectPersonalInfo,
    [agreeState],
  );
  const isAllAgreed = useMemo(
    () => requiredAgreed && agreeState.isAgreedToReceiveMarketingInfo,
    [requiredAgreed, agreeState.isAgreedToReceiveMarketingInfo],
  );

  const handleCheckboxChange = useCallback(
    (field: CommunityAgreeField) => (checked: boolean) => {
      setAgreeState((prev) => ({ ...prev, [field]: checked }));
    },
    [],
  );

  const handleAgreeAll = useCallback(() => {
    setAgreeState({
      isAgreedToTerms: true,
      isAgreedToCollectPersonalInfo: true,
      isAgreedToReceiveMarketingInfo: true,
    });
  }, []);

  return {
    agreeState,
    setAgreeState,
    expanded,
    setExpanded,
    requiredAgreed,
    isAllAgreed,
    handleCheckboxChange,
    handleAgreeAll,
  };
};
