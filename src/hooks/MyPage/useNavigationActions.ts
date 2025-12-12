import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { UserRole } from '@/types/common/chat';

export const useNavigationActions = (role: UserRole) => {
  const { handleNavigate } = useHandleNavigate();

  const handleService = () => {
    window.location.href =
      'https://rainy-forgery-133.notion.site/2b4bddcf357e80648d61e37bce082f77';
  };

  const handlePrivacy = () => {
    window.location.href =
      'https://rainy-forgery-133.notion.site/2b4bddcf357e80648d61e37bce082f77';
  };

  const handleBlock = () => {
    if (role === 'CAREGIVER') {
      handleNavigate('/caregiver/my/block');
    } else {
      handleNavigate('/socialworker/my/block');
    }
  };

  const handlePasswordChange = () => {
    window.location.href = 'http://pf.kakao.com/_xgaxapn/chat';
  };

  return { handleService, handlePrivacy, handleBlock, handlePasswordChange };
};
