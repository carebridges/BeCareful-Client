import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CaregiverInfo } from '@/types/Caregiver/mypage';

export const useCaregiverBasicForm = (
  data: CaregiverInfo | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEduChecked, setIsEduChecked] = useState(false);
  const [isCarChecked, setIsCarChecked] = useState(false);

  useEffect(() => {
    if (data) {
      setPhoneNumber(data.phoneNumber);
      setIsEduChecked(data.caregiverDetailInfo.completeDementiaEducation);
      setIsCarChecked(data.caregiverDetailInfo.havingCar);
    }
  }, [data]);

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setIsChanged(true);
  };

  const handleEduToggleChange = () => {
    setIsEduChecked((prevChecked) => !prevChecked);
    setIsChanged(true);
  };

  const handleCarToggleChange = () => {
    setIsCarChecked((prevChecked) => !prevChecked);
    setIsChanged(true);
  };

  return {
    phoneNumber,
    isEduChecked,
    isCarChecked,
    handlePhoneNumber,
    handleEduToggleChange,
    handleCarToggleChange,
  };
};
