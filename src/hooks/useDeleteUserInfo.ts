import { currentUserInfo } from '@/recoil/currentUserInfo';
import { useSetRecoilState } from 'recoil';
import { useHandleNavigate } from './useHandleNavigate';

export const useDeleteUserInfo = () => {
  const setUserInfo = useSetRecoilState(currentUserInfo);
  const { handleNavigate } = useHandleNavigate();

  const deleteUserInfo = () => {
    localStorage.removeItem('currentUserInfo');
    setUserInfo({
      realName: '',
      nickName: '',
      institutionRank: '',
      associationRank: '',
    });
    handleNavigate('/');
  };

  return deleteUserInfo;
};
