import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { UserRole } from '@/types/common/chat';

export const useNavigationActions = (role: UserRole) => {
  const { handleNavigate } = useHandleNavigate();

  const handleServiceTerms = () => {
    if (role === 'CAREGIVER') {
      window.open(
        'https://rainy-forgery-133.notion.site/2cabddcf357e80588363ec0b856460d9',
        '_blank',
      );
    } else {
      window.open(
        'https://rainy-forgery-133.notion.site/2cabddcf357e80368affccbbd010f349',
        '_blank',
      );
    }
  };

  const handlePrivacyPolicy = () => {
    if (role === 'CAREGIVER') {
      window.open(
        'https://rainy-forgery-133.notion.site/2cabddcf357e804980e2e1d82755e0e2',
        '_blank',
      );
    } else {
      window.open(
        'https://rainy-forgery-133.notion.site/2cabddcf357e80f19953e9bdddf7b6f0',
        '_blank',
      );
    }
  };

  const handleThirdPartyConsent = () => {
    if (role === 'CAREGIVER') {
      window.open(
        'https://rainy-forgery-133.notion.site/3-2cabddcf357e80c6bceaf4ba94a7b0a1',
        '_blank',
      );
    } else {
      window.open(
        'https://rainy-forgery-133.notion.site/3-2cabddcf357e808ebb95d24dca70b31f',
        '_blank',
      );
    }
  };

  const handleMarketingAgree = () => {
    if (role === 'CAREGIVER') {
      window.open(
        'https://rainy-forgery-133.notion.site/2cabddcf357e807d8c5dfd3517c019ca',
        '_blank',
      );
    } else {
      window.open(
        'https://rainy-forgery-133.notion.site/2cabddcf357e80babb63ea0d801c999c',
        '_blank',
      );
    }
  };

  const handleBlock = () => {
    if (role === 'CAREGIVER') {
      handleNavigate('/caregiver/my/block');
    } else {
      handleNavigate('/socialworker/my/block');
    }
  };

  const handlePasswordChange = () => {
    window.open('http://pf.kakao.com/_xgaxapn/chat', '_blank');
  };

  return {
    handleServiceTerms,
    handlePrivacyPolicy,
    handleThirdPartyConsent,
    handleMarketingAgree,

    handleBlock,

    handlePasswordChange,
  };
};
