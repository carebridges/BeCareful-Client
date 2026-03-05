import { useEffect, useMemo, useState } from 'react';
import { useWorkApplicationToggleMutation } from '@/hooks/Caregiver/mutation/useWorkApplicationToggleMutation';
import {
  formatCaretype,
  formatDaysToKR,
  formatLocation,
  formatTimeToKR,
} from '@/utils/format/domain';
import { useWorkApplication } from '@/api/user/caregiver';

export const useApplicationData = () => {
  // 신청서 조회
  const { data: applicationData } = useWorkApplication();
  const [isToggleChecked, setIsToggleChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsToggleChecked(!!applicationData?.workApplicationDto);
  }, [applicationData]);

  const { mutate: toggleWorkApplication } = useWorkApplicationToggleMutation({
    onSuccessCallback: (newIsActive) => setIsToggleChecked(newIsActive),
  });

  const handleToggleChange = () => {
    if (applicationData?.workApplicationDto) {
      toggleWorkApplication(isToggleChecked);
    } else {
      setIsModalOpen(true);
    }
  };

  const applyInfo = useMemo(() => {
    const application = applicationData?.workApplicationDto;

    return [
      {
        title: '케어항목',
        detail: application ? formatCaretype(application.careTypes, 2) : '-',
      },
      {
        title: '근무요일',
        detail: application ? formatDaysToKR(application.workDays) : '-',
      },
      {
        title: '근무시간',
        detail: application ? formatTimeToKR(application.workTimes) : '-',
      },
      {
        title: '희망급여',
        detail: application
          ? `${application.workSalaryAmount.toLocaleString('ko-KR')}원`
          : '-',
      },
      {
        title: '근무지역',
        detail: application
          ? formatLocation(application.workLocations, 2)
          : '-',
      },
    ];
  }, [applicationData]);

  return {
    applicationData,
    isToggleChecked,
    handleToggleChange,
    applyInfo,
    isModalOpen,
    setIsModalOpen,
  };
};
