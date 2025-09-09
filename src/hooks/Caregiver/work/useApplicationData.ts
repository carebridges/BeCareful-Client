import { useEffect, useMemo, useState } from 'react';
import { useWorkApplicationToggleMutation } from '@/hooks/Caregiver/mutation/useWorkApplicationToggleMutation';
import {
  formatCaretype,
  formatDaysToKR,
  formatLocation,
  formatTimeToKR,
} from '@/utils/caregiverFormatter';
import { useApplicationQuery } from '@/api/caregiver';

export const useApplicationData = () => {
  // 신청서 조회
  const { data: applicationData } = useApplicationQuery();
  const [isToggleChecked, setIsToggleChecked] = useState(false);

  useEffect(() => {
    if (applicationData?.workApplicationDto) {
      setIsToggleChecked(true);
    } else {
      setIsToggleChecked(false);
    }
  }, [applicationData]);

  const { mutate: toggleWorkApplication } = useWorkApplicationToggleMutation({
    onSuccessCallback: (newIsActive) => {
      setIsToggleChecked(newIsActive);
    },
  });

  const handleToggleChange = () => {
    toggleWorkApplication(isToggleChecked);
  };

  const applyInfo = useMemo(() => {
    return [
      {
        title: '케어항목',
        detail: applicationData?.workApplicationDto
          ? formatCaretype(applicationData.workApplicationDto.careTypes, 2)
          : '-',
      },
      {
        title: '근무요일',
        detail: applicationData?.workApplicationDto
          ? formatDaysToKR(applicationData.workApplicationDto.workDays)
          : '-',
      },
      {
        title: '근무시간',
        detail: applicationData?.workApplicationDto
          ? formatTimeToKR(applicationData.workApplicationDto.workTimes)
          : '-',
      },
      {
        title: '희망급여',
        detail: applicationData?.workApplicationDto
          ? `${applicationData.workApplicationDto.workSalaryAmount.toLocaleString('ko-KR')}원`
          : '-',
      },
      {
        title: '근무지역',
        detail: applicationData?.workApplicationDto
          ? formatLocation(applicationData.workApplicationDto.workLocations, 2)
          : '-',
      },
    ];
  }, [applicationData]);

  return {
    applicationData,
    isToggleChecked,
    handleToggleChange,
    applyInfo,
  };
};
