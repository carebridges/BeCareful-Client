import { useRegisterElderly } from '@/api/elderly';
import { AreaSocial } from '@/types/common/matching';
import {
  CareLevel,
  CareType,
  ElderlyRegisterPayload,
  Gender,
} from '@/types/Elderly';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useElderlyRegisterForm = () => {
  const navigate = useNavigate();
  const [profileImageTempKey, setProfileImageTempKey] = useState('default');
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<
    string | null
  >(null);
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [hasInmate, sethasInmate] = useState<'있음' | '없음' | ''>('');
  const [hasPet, sethasPet] = useState<'있음' | '없음' | ''>('');

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
    hasInmate !== '' &&
    hasPet !== '' &&
    selectedGrade !== '' &&
    selectedArea !== null &&
    detailAddress !== '' &&
    healthCondition !== '' &&
    selectedDetails.length > 0;

  const handleSubmit = async () => {
    if (!isValid || !selectedArea) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const payload: ElderlyRegisterPayload = {
      name,
      birthday: birth,
      hasInmate: hasInmate === '있음',
      hasPet: hasPet === '있음',
      gender: gender as Gender,
      careLevel: selectedGrade as CareLevel,
      residentialLocation: {
        siDo: selectedArea.siDo,
        siGuGun: selectedArea.siGuGun,
        eupMyeonDong: selectedArea.eupMyeonDong,
      },
      detailAddress,
      profileImageTempKey,
      healthCondition,
      detailCareTypeList: selectedDetails as CareType[],
    };

    registerElderly(payload, {
      onSuccess: () => {
        navigate('/socialworker/elderly');
        window.scrollTo(0, 0);
      },
    });
  };

  return {
    profileImageTempKey,
    setProfileImageTempKey,
    profileImagePreviewUrl,
    setProfileImagePreviewUrl,
    name,
    setName,
    birth,
    setBirth,
    gender,
    setGender,
    hasInmate,
    sethasInmate,
    hasPet,
    sethasPet,
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
