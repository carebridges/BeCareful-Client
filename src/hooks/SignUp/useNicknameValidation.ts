import { checkNicknameDuplicate } from '@/api/signupFunnel';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type ValidationState = 'default' | 'error' | 'success';

export const useNicknameValidation = () => {
  const [message, setMessage] = useState('');
  const [state, setState] = useState<ValidationState>('default');

  const validateFormat = (nickname: string) => {
    const regex = /^[A-Za-z0-9가-힣]{4,12}$/;
    return regex.test(nickname);
  };

  const { mutate: checkNickname } = useMutation({
    mutationFn: checkNicknameDuplicate,
    onMutate: () => {
      setMessage('');
      setState('default');
    },
    onSuccess: (isDuplicate) => {
      if (isDuplicate) {
        setMessage('* 이미 존재하는 닉네임입니다.');
        setState('error');
      } else {
        setMessage('* 사용 가능한 닉네임입니다.');
        setState('success');
      }
    },
    onError: () => {
      setMessage('* 닉네임 중복 확인 중 오류가 발생했습니다.');
      setState('error');
    },
  });

  const checkNicknameWithFormat = (nickname: string) => {
    if (!validateFormat(nickname)) {
      setMessage('* 닉네임은 한글, 영문, 숫자 조합 4~12자여야 합니다. ');
      setState('error');
      return;
    }
    checkNickname(nickname);
  };

  const resetMessage = () => {
    setMessage(
      '* 한글, 영문, 숫자를 포함한 4~12자로 입력하세요. (특수문자 불가)',
    );
    setState('default');
  };

  return {
    message,
    state,
    checkNickname: checkNicknameWithFormat,
    resetMessage,
  };
};
