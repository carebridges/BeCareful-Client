import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';
import { getGenderCode } from '@/utils/getGenderCode';

export const useCaregiverBasicInfoForm = () => {
  const { formData, setFormData } = useCaregiverSignUpContext();

  const handleChange =
    (field: 'realName' | 'birthYymmdd' | 'phoneNumber') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

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
    formData.birthYymmdd.trim().length === 6 &&
    (formData.genderCode === 1 || formData.genderCode === 2) &&
    formData.phoneNumber.trim().length > 0;

  return {
    formData,
    setFormData,
    isFormValid,
    handleChange,
    handleBirthAndGenderChange,
  };
};
