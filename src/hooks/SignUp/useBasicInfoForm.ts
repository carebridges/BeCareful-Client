import { useCommonSignUpContext } from '@/contexts/CommonSocialWorkerSignUpContext';
import { useSignUpContext } from '@/contexts/KakaoSocialWorkerSignUpContext';
import { useNicknameValidation } from '@/hooks/SignUp/useNicknameValidation';
import { getGenderCode } from '@/utils/format/text';

type BasicInfoField = 'realName' | 'nickName' | 'birthYymmdd' | 'phoneNumber';

export const useBasicInfoFormCore = <
  T extends {
    realName: string;
    nickName: string;
    birthYymmdd: string;
    genderCode: number;
    phoneNumber: string;
  },
>(
  formData: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { message, state, checkNickname, resetMessage } =
    useNicknameValidation();

  const isNicknameValid = state === 'success';

  const handleChange =
    (field: BasicInfoField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === 'nickName') resetMessage();
    };

  const handleCheckDuplicate = () => checkNickname(formData.nickName);

  const handleBirthAndGenderChange = (
    birthDate: string,
    genderChar: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      birthYymmdd: birthDate,
      genderCode: getGenderCode(genderChar),
    }));
  };

  const isFormValid =
    formData.realName.trim().length > 0 &&
    formData.nickName.trim().length > 0 &&
    formData.birthYymmdd.trim().length === 6 &&
    formData.genderCode > 0 &&
    formData.phoneNumber.trim().length > 0 &&
    isNicknameValid;

  return {
    formData,
    isFormValid,
    handleChange,
    handleCheckDuplicate,
    handleBirthAndGenderChange,
    message,
    state,
  };
};

export const useCommonBasicInfoForm = () => {
  const { formData, setFormData } = useCommonSignUpContext();
  return useBasicInfoFormCore(formData, setFormData);
};

export const useKakaoBasicInfoForm = () => {
  const { formData, setFormData } = useSignUpContext();
  return useBasicInfoFormCore(formData, setFormData);
};
