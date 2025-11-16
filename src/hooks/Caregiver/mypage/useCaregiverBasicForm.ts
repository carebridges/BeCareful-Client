import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CaregiverInfo } from '@/types/Caregiver/mypage';
import { PostcodeData } from '@/types/daum-postcode';

export const useCaregiverBasicForm = (
  data: CaregiverInfo | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEduChecked, setIsEduChecked] = useState(false);
  const [isCarChecked, setIsCarChecked] = useState(false);

  // 주소 관련
  const [streetAddress, setStreetAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setBirth(data.birthday);
      setPhoneNumber(data.phoneNumber);
      setStreetAddress(data.address.streetAddress);
      setDetailAddress(data.address.detailAddress);
      setIsEduChecked(data.caregiverDetailInfo.completeDementiaEducation);
      setIsCarChecked(data.caregiverDetailInfo.havingCar);
    }
  }, [data]);

  const handleAddressComplete = (data: PostcodeData) => {
    setStreetAddress(data.roadAddress);
    setIsChanged(true);
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDetailAddress(e.target.value);
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
    name,
    birth,
    phoneNumber,
    isEduChecked,
    isCarChecked,
    handleEduToggleChange,
    handleCarToggleChange,
    streetAddress,
    detailAddress,
    isAddressModalOpen,
    setIsAddressModalOpen,
    handleAddressComplete,
    handleDetailAddressChange,
  };
};
