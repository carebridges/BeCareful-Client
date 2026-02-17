import { useCallback } from 'react';
import { UserRole } from '@/types/common/chat';
import { useDeleteUserInfo } from '@/hooks/useDeleteUserInfo';
import { useCaregiverLogout, useDeleteCaregiver } from '@/api/user/caregiver';
import {
  useDeleteSocialworker,
  useSocialworkerLogout,
} from '@/api/user/socialworker';

export const useUserAuthActions = (role: UserRole) => {
  const { mutate: caregiverLogout } = useCaregiverLogout();
  const { mutate: caregiverLeave } = useDeleteCaregiver();
  const { mutate: socialworkerLogout } = useSocialworkerLogout();
  const { mutate: socialworkerLeave } = useDeleteSocialworker();

  const deleteUserInfo = useDeleteUserInfo();

  const handleLogout = useCallback(() => {
    const logout = role === 'CAREGIVER' ? caregiverLogout : socialworkerLogout;
    logout(undefined, { onSuccess: deleteUserInfo });
  }, [role, caregiverLogout, socialworkerLogout, deleteUserInfo]);

  const handleLeave = useCallback(() => {
    const leave = role === 'CAREGIVER' ? caregiverLeave : socialworkerLeave;
    leave(undefined, { onSuccess: deleteUserInfo });
  }, [role, caregiverLeave, socialworkerLeave, deleteUserInfo]);

  return { handleLogout, handleLeave };
};
