import { SocialworkerContractResponse } from '@/types/Socialworker/chat';
import { useEffect, useState } from 'react';

export const useContractForm = (
  data: SocialworkerContractResponse | undefined,
) => {
  const [isChanged, setIsChanged] = useState(false);

  const [selectDay, setSelectDay] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [selectedPayType, setSelectedPayType] = useState<
    'HOUR' | 'DAY' | 'MONTH' | 'YEAR'
  >('HOUR');
  const [workSalaryAmount, setWorkSalaryAmount] = useState('');

  useEffect(() => {
    if (data) {
      setSelectDay(data.workDays);
      setStartTime(data.workStartTime);
      setEndTime(data.workEndTime);
      const extractedCareTypes = data.careInfoList.map(
        (careInfo) => careInfo.careType,
      );
      setCareTypes(extractedCareTypes);
      setWorkSalaryAmount(data.workSalaryAmount.toString());
    }
  }, [data]);

  const handleSelectDay = (id: string) => {
    setSelectDay((prev) =>
      prev.includes(id) ? prev.filter((day) => day !== id) : [...prev, id],
    );
    setIsChanged(true);
  };

  const handleCareTypeChange = (careType: string) => {
    setCareTypes((prev) =>
      prev.includes(careType)
        ? prev.filter((type) => type !== careType)
        : [...prev, careType],
    );
    setIsChanged(true);
  };

  return {
    selectDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedPayType,
    setSelectedPayType,
    workSalaryAmount,
    setWorkSalaryAmount,
    careTypes,
    handleCareTypeChange,
    handleSelectDay,
    isChanged,
    setIsChanged,
  };
};
