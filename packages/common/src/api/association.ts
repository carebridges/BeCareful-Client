'use client';

import { axiosInstance } from './axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/* 협회 탈퇴하기 */
export const useLeaveAssociation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/association/leave');
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['communityAccess'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerProfile'] });
    },
  });
};
