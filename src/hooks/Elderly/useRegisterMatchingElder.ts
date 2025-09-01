import { DAY_KO_TO_EN } from '@/constants/socialworker/day.socialWorker';
import { PayCode } from '@/types/Matching.socialWorker';
import { useState } from 'react';

//TODO 전체 구조 개선 필요...
export const useRegisterMatchingForm = (elderlyId: number) => {
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [selectedPayType, setSelectedPayType] = useState<PayCode>('HOUR');

  const [workSalaryAmount, setWorkSalaryAmount] = useState('');
  const [memoContent, setMemoContent] = useState('');

  const handleSelectDay = (id: string) => {
    setSelectDay((prev) =>
      prev.includes(id) ? prev.filter((day) => day !== id) : [...prev, id],
    );
  };

  const handleCareTypeChange = (careType: string) => {
    setCareTypes((prev) =>
      prev.includes(careType)
        ? prev.filter((type) => type !== careType)
        : [...prev, careType],
    );
  };

  const isFormValid =
    title.trim() !== '' &&
    selectDay.length > 0 &&
    startTime !== '' &&
    endTime !== '' &&
    startTime < endTime &&
    careTypes.length > 0 &&
    workSalaryAmount !== '';

  const getPayload = () => ({
    elderlyId,
    title,
    workDays: selectDay.map(
      (day) => DAY_KO_TO_EN[day as keyof typeof DAY_KO_TO_EN],
    ),
    workStartTime: startTime,
    workEndTime: endTime,
    careTypes,
    workSalaryType: selectedPayType,
    workSalaryAmount: Number(workSalaryAmount),

    description: memoContent,
  });

  return {
    title,
    setTitle,
    selectDay,
    handleSelectDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    careTypes,
    handleCareTypeChange,
    selectedPayType,
    setSelectedPayType,
    workSalaryAmount,
    setWorkSalaryAmount,
    memoContent,
    setMemoContent,
    isFormValid,
    getPayload,
  };
};
