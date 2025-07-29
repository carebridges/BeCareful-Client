import { useRegisterElderly } from '@/api/elderly';
import {
  AreaSocial,
  CareLevel,
  CareType,
  ElderlyRegisterPayload,
  Gender,
} from '@/types/Elderly';
import { useState } from 'react';

export const useElderlyRegisterForm = () => {
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [inmate, setInmate] = useState<'있음' | '없음' | ''>('');
  const [pet, setPet] = useState<'있음' | '없음' | ''>('');

  const [selectedGrade, setSelectedGrade] = useState<CareLevel | ''>('');

  const [selectedArea, setSelectedArea] = useState<AreaSocial | null>(null);
  const [detailAddress, setDetailAddress] = useState('');

  const [healthCondition, setHealthCondition] = useState('');

  const [selectedCare, setSelectedCare] = useState<CareType | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const { mutate: registerElderly } = useRegisterElderly();
  const isValid =
    name !== '' &&
    birth !== '' &&
    gender !== '' &&
    inmate !== '' &&
    pet !== '' &&
    selectedGrade !== '' &&
    selectedArea !== null &&
    detailAddress !== '' &&
    healthCondition !== '' &&
    selectedDetails.length > 0;

  const handleSubmit = async () => {
    if (!isValid) {
      //TODO
      return;
    }

    const payload: ElderlyRegisterPayload = {
      name,
      birthday: birth,
      inmate: inmate === '있음',
      pet: pet === '있음',
      gender,
      careLevel: selectedGrade,
      siDo: selectedArea.siDo,
      siGuGun: selectedArea.siGuGun,
      eupMyeonDong: selectedArea.eupMyeonDong,
      detailAddress,
      profileImageUrl,
      healthCondition,
      detailCareTypeList: selectedDetails as CareType[],
    };

    registerElderly(payload);
  };

  return {
    profileImageUrl,
    setProfileImageUrl,
    name,
    setName,
    birth,
    setBirth,
    gender,
    setGender,
    inmate,
    setInmate,
    pet,
    setPet,
    selectedGrade,
    setSelectedGrade,
    selectedArea,
    setSelectedArea,
    detailAddress,
    setDetailAddress,
    healthCondition,
    setHealthCondition,
    selectedCare,
    setSelectedCare,
    selectedDetails,
    setSelectedDetails,
    handleSubmit,
    isValid,
  };
};
