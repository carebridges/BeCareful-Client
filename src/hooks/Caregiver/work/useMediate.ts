import { useState } from 'react';
import { MatchingRecruitmentMediateRequest } from '@/types/Caregiver/work';
import { formatMediationTypeToEN } from '@/utils/caregiverFormatter';
import { usePostMediateMutation } from '@/hooks/Caregiver/mutation/useApplyMutation';
import { handleModal } from '@/utils/handleModal';

export const useMediate = (recruitmentId: number) => {
  // 근무 조건 조율하기 팝업
  const [isMediateModalOpen, setIsMediateModalOpen] = useState(false);
  const [isCompleteMediateModalOpen, setIsCompleteMediateModalOpen] =
    useState(false);

  // 매칭 공고 근무 조건 조율
  const { mutate: mediateMutation } = usePostMediateMutation(recruitmentId, {
    onSuccessCallback: () => {
      handleModal(setIsCompleteMediateModalOpen, setIsMediateModalOpen);
    },
  });

  // 근무조건 조율 입력 팝업 - 조율하여 지원하기 버튼
  const handleMediate = () => {
    // 조율하여 지원하기 api
    const mediateData: MatchingRecruitmentMediateRequest = {
      mediationTypes: formatMediationTypeToEN(mediationTypes),
      mediationDescription: mediationDescription,
    };
    console.log(mediateData);
    mediateMutation(mediateData);
  };

  // 근무조건 조율하기 필터
  const [mediationTypes, setMediationTypes] = useState<string[]>([]);
  const handleMediationChange = (mediation: string) => {
    setMediationTypes((prev) => {
      if (prev.includes(mediation)) {
        return prev.filter((f) => f !== mediation);
      } else {
        return [...prev, mediation];
      }
    });
  };

  // 근무조건 조율하기 설명
  const [mediationDescription, setMediationDescription] = useState('');
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMediationDescription(e.target.value);
  };

  return {
    isMediateModalOpen,
    setIsMediateModalOpen,
    isCompleteMediateModalOpen,
    setIsCompleteMediateModalOpen,
    mediationTypes,
    mediationDescription,
    handleMediate,
    handleMediationChange,
    handleDescriptionChange,
  };
};
