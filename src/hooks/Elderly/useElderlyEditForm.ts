import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateElderly } from '@/api/matching/elderly';
import { ElderDetailResponse, ElderlyRegisterPayload } from '@/types/elderly';
import { CareLevel, CareTypeKey, Gender, WorkLocation } from '@/types/common';

const parseAddress = (address: string) => {
  const parts = address.split(' ');
  const [siDo = '', siGuGun = '', eupMyeonDong = '', ...rest] = parts;

  return {
    siDo,
    siGuGun,
    eupMyeonDong,
    detailAddress: rest.join(' '),
  };
};

type UseElderlyEditFormParams = {
  elderlyId: number;
  elderlyInfo: ElderDetailResponse['elderlyInfo'] | undefined;
};

export const useElderlyEditForm = ({
  elderlyId,
  elderlyInfo,
}: UseElderlyEditFormParams) => {
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

  const [selectedArea, setSelectedArea] = useState<WorkLocation | null>(null);
  const [detailAddress, setDetailAddress] = useState('');

  const [healthCondition, setHealthCondition] = useState('');

  const [selectedCare, setSelectedCare] = useState<CareTypeKey | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const { mutate: updateElderly } = useUpdateElderly(elderlyId);

  useEffect(() => {
    if (!elderlyInfo) return;

    setName(elderlyInfo.name);
    setBirth(elderlyInfo.birthDate);

    setGender(elderlyInfo.gender as Gender);
    setSelectedGrade(elderlyInfo.careLevel as CareLevel);

    setHealthCondition(elderlyInfo.healthCondition ?? '');

    sethasInmate(elderlyInfo.hasInmate ? '있음' : '없음');
    sethasPet(elderlyInfo.hasPet ? '있음' : '없음');

    setProfileImagePreviewUrl(elderlyInfo.profileImageUrl ?? null);

    const allDetails =
      elderlyInfo.detailCareTypes?.flatMap((c) => c.detailCareTypes ?? []) ??
      [];
    setSelectedDetails(allDetails);

    const firstCareType = elderlyInfo.detailCareTypes?.[0]?.careType;
    if (firstCareType) {
      setSelectedCare(firstCareType as CareTypeKey);
    }

    if (elderlyInfo.address) {
      const { siDo, siGuGun, eupMyeonDong, detailAddress } = parseAddress(
        elderlyInfo.address,
      );

      const area: WorkLocation = {
        siDo,
        siGuGun,
        eupMyeonDong,
      } as WorkLocation;

      setSelectedArea(area);
      setDetailAddress(detailAddress);
    }
  }, [elderlyInfo]);

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
      detailCareTypeList: selectedDetails as CareTypeKey[],
    };

    updateElderly(payload, {
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
