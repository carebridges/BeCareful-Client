import { useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useQueryClient } from '@tanstack/react-query';

export const useDeleteUserInfo = () => {
  const setUserInfo = useSetRecoilState(currentUserInfo);

  const queryClient = useQueryClient();
  const { handleNavigate } = useHandleNavigate();

  const deleteUserInfo = () => {
    localStorage.removeItem('currentUserInfo');

    setUserInfo({
      realName: '',
      nickName: '',
    });

    queryClient.clear();

    handleNavigate('/');
  };

  return deleteUserInfo;
};
