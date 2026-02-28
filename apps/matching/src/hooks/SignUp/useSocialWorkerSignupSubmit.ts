import { useSignUpMember } from '@/api/signup/socialworker';
import { SignUpPayload } from '@/types/auth';
import { currentUserInfo } from '@repo/common';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

export const useSocialWorkerSignupSubmit = () => {
  const setCurrentUserInfo = useSetRecoilState(currentUserInfo);
  const { mutate, isPending, isError, error } = useSignUpMember();

  const submit = useCallback(
    (
      payload: SignUpPayload,
      opts?: { onSuccess?: () => void; onError?: (e: unknown) => void },
    ) => {
      mutate(payload, {
        onSuccess: () => {
          setCurrentUserInfo({
            realName: payload.realName,
            nickName: payload.nickName,
          });
          opts?.onSuccess?.();
        },
        onError: (e) => {
          opts?.onError?.(e);
        },
      });
    },
    [mutate, setCurrentUserInfo],
  );

  return { submit, isPending, isError, error };
};
