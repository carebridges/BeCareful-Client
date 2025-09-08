import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { SocialworkerMyEditResponse } from '@/types/Socialworker/mypage';
import { AgreementValues } from '@/types/Socialworker/common';

export const useAgreementStateForm = (
  data: SocialworkerMyEditResponse | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [agreementStates, setAgreementStates] = useState({
    isAgreedToTerms: false,
    isAgreedToCollectPersonalInfo: false,
    isAgreedToReceiveMarketingInfo: false,
  });

  useEffect(() => {
    if (data) {
      setAgreementStates({
        isAgreedToTerms: data.isAgreedToTerms,
        isAgreedToCollectPersonalInfo: data.isAgreedToCollectPersonalInfo,
        isAgreedToReceiveMarketingInfo: data.isAgreedToReceiveMarketingInfo,
      });
    }
  }, [data]);

  const handleAgreementChange = useCallback(
    (updatedAgreements: AgreementValues) => {
      setAgreementStates(updatedAgreements);
      setIsChanged(
        updatedAgreements.isAgreedToTerms &&
          updatedAgreements.isAgreedToCollectPersonalInfo,
      );
    },
    [setIsChanged],
  );

  return {
    agreementStates,
    handleAgreementChange,
  };
};
