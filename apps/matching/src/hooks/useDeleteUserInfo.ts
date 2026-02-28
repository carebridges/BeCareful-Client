'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { currentUserInfo } from '@repo/common';

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
