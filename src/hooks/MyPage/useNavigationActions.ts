import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { UserRole } from '@/types/common/chat';

export const useNavigationActions = (role: UserRole) => {
  const { handleNavigate } = useHandleNavigate();

  const openUrl = (url: string) => window.open(url, '_blank');

  const handleServiceTerms = () => {
    openUrl(
      role === 'CAREGIVER'
        ? 'https://rainy-forgery-133.notion.site/2cabddcf357e80588363ec0b856460d9'
        : 'https://rainy-forgery-133.notion.site/2cabddcf357e80368affccbbd010f349',
    );
  };

  const handlePrivacyPolicy = () => {
    openUrl(
      role === 'CAREGIVER'
        ? 'https://rainy-forgery-133.notion.site/2cabddcf357e804980e2e1d82755e0e2'
        : 'https://rainy-forgery-133.notion.site/2cabddcf357e80f19953e9bdddf7b6f0',
    );
  };

  const handleThirdPartyConsent = () => {
    openUrl(
      role === 'CAREGIVER'
        ? 'https://rainy-forgery-133.notion.site/3-2cabddcf357e80c6bceaf4ba94a7b0a1'
        : 'https://rainy-forgery-133.notion.site/3-2cabddcf357e808ebb95d24dca70b31f',
    );
  };

  const handleMarketingAgree = () => {
    openUrl(
      role === 'CAREGIVER'
        ? 'https://rainy-forgery-133.notion.site/2cabddcf357e807d8c5dfd3517c019ca'
        : 'https://rainy-forgery-133.notion.site/2cabddcf357e80babb63ea0d801c999c',
    );
  };

  const handleBlock = () => {
    handleNavigate(
      role === 'CAREGIVER' ? '/caregiver/my/block' : '/socialworker/my/block',
    );
  };

  const handlePasswordChange = () => {
    openUrl('http://pf.kakao.com/_xgaxapn/chat');
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
