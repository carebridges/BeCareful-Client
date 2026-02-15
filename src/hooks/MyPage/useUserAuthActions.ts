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

  const logout = useCallback(() => {
    if (role === 'CAREGIVER') {
      return caregiverLogout;
    } else {
      return socialworkerLogout;
    }
  }, [role, caregiverLogout, socialworkerLogout]);

  // role에 따라 적절한 탈퇴 mutate 함수 선택
  const leave = useCallback(() => {
    if (role === 'CAREGIVER') {
      return caregiverLeave;
    } else {
      return socialworkerLeave;
    }
  }, [role, caregiverLeave, socialworkerLeave]);

  const handleLogout = useCallback(() => {
    logout()(undefined, {
      onSuccess: deleteUserInfo,
    });
  }, [logout, deleteUserInfo]);

  const handleLeave = useCallback(() => {
    leave()(undefined, {
      onSuccess: deleteUserInfo,
    });
  }, [leave, deleteUserInfo]);

  return { handleLogout, handleLeave };
};
