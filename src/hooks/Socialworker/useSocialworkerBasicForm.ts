import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { SocialworkerMyEditResponse } from '@/types/Socialworker/mypage';
import { useNicknameValidation } from '@/hooks/SignUp/useNicknameValidation';
import { getGenderCode } from '@/utils/getGenderCode';

export const useSocialworkerBasicForm = (
  data: SocialworkerMyEditResponse | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameChanged, setNicknameChanged] = useState(false);
  const [birth, setBirth] = useState('');
  const [genderCode, setGenderCode] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [institutionId, setInstitutionId] = useState(0);
  const [institutionName, setInstitutionName] = useState('');
  const [rank, setRank] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name);
      setNickname(data.nickName);
      setBirth(data.birthday);
      setGenderCode(data.genderCode);
      setPhoneNumber(data.phoneNumber);
      setInstitutionId(data.institutionInfo.institutionId);
      setInstitutionName(data.institutionInfo.name);
      setRank(data.institutionRank);
    }
  }, [data]);

  const handleChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'name':
        setName(value);
        setIsChanged(true);
        break;
      case 'nickname':
        resetMessage();
        setNickname(value);
        setNicknameChanged(value !== data?.nickName);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        setIsChanged(true);
        break;
      case 'rank':
        setRank(value);
        setIsChanged(true);
        break;
      default:
        break;
    }
  };

  const { message, state, checkNickname, resetMessage } =
    useNicknameValidation();
  const handleCheckDuplicate = () => {
    if (!nicknameChanged || !nickname) {
      return;
    }
    checkNickname(nickname);
  };
  const isDuplicateCheckButtonEnabled = useMemo(() => {
    // 1. 닉네임이 비어있지 않아야 함
    if (!nickname) return false;
    // 2. 현재 닉네임이 원래 내 닉네임과 달라야 함
    if (!nicknameChanged) return false;
    // 3. 현재 닉네임이 이미 유효성 검사/중복 확인에 성공한 상태가 아니어야 함
    if (state === 'success') return false;

    return true;
  }, [nickname, nicknameChanged, state]);

  useEffect(() => {
    if (state === 'success') {
      setIsChanged(true);
    }
  }, [state]);

  const handleBirthAndGenderChange = (birth: string, genderCode: string) => {
    setBirth(birth);
    setGenderCode(getGenderCode(genderCode));
    setIsChanged(true);
  };

  return {
    name,
    nickname,
    nicknameChanged,
    birth,
    genderCode,
    phoneNumber,
    institutionId,
    institutionName,
    rank,
    setName,
    setNickname,
    setBirth,
    setGenderCode,
    setPhoneNumber,
    setInstitutionId,
    setInstitutionName,
    nicknameValidation: { message, state, checkNickname, resetMessage },
    isDuplicateCheckButtonEnabled,
    handleChange,
    handleCheckDuplicate,
    handleBirthAndGenderChange,
  };
};
