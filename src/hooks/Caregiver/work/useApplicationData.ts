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
  const { data: applicationData, error: applicationError } =
    useApplicationQuery();
  if (applicationError) {
    console.log('getApplication 에러: ', applicationError);
  }

  const [isToggleChecked, setIsToggleChecked] = useState(false);

  useEffect(() => {
    if (applicationData) {
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
        detail: applicationData
          ? formatCaretype(applicationData.careTypes, 2)
          : '-',
      },
      {
        title: '근무요일',
        detail: applicationData
          ? formatDaysToKR(applicationData.workDays)
          : '-',
      },
      {
        title: '근무시간',
        detail: applicationData
          ? formatTimeToKR(applicationData.workTimes)
          : '-',
      },
      {
        title: '희망급여',
        detail: applicationData
          ? `${applicationData.workSalaryAmount.toLocaleString('ko-KR')}원`
          : '-',
      },
      {
        title: '근무지역',
        detail: applicationData
          ? formatLocation(applicationData.workLocations, 2)
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
