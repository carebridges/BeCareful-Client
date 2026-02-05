import { useSignUpContext } from '@/contexts/KakaoSocialWorkerSignUpContext';
import { useState } from 'react';

export const useInstitutionSearchForKakao = () => {
  const { setFormData, goToNext, goToPrev } = useSignUpContext();

  const [institutionName, setInstitutionName] = useState('');
  const [institutionId, setInstitutionId] = useState<number | null>(null);
  const [isRegisteringInstitution, setIsRegisteringInstitution] =
    useState(false);

  const handleRegisterComplete = (newInstitutionId: number) => {
    setFormData((prev) => ({
      ...prev,
      nursingInstitutionId: newInstitutionId,
    }));
    setIsRegisteringInstitution(false);
    goToNext();
  };

  const handleRegisterCancel = () => {
    setIsRegisteringInstitution(false);
    goToPrev();
  };

  const handleNext = () => {
    if (!institutionId) return;
    setFormData((prev) => ({
      ...prev,
      nursingInstitutionId: institutionId,
    }));
    goToNext();
  };

  return {
    institutionName,
    setInstitutionName,
    setInstitutionId,
    institutionId,
    isRegisteringInstitution,
    handleClickRegisterInstitution: () => setIsRegisteringInstitution(true),
    handleRegisterComplete,
    handleRegisterCancel,
    handleNext,
  };
};
