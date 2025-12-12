import { useCallback, useEffect, useState } from 'react';
import {
  ContractChatResponse,
  EditContractChatRequest,
} from '@/types/common/chat';
import { DAY_EN_TO_KR } from '@/constants/common/day';
import { formatDaysToEN } from '@/utils/caregiverFormatter';
import { SALARY_EN_TO_KR, SALARY_KR_TO_EN } from '@/constants/common/salary';

export const useEditContractForm = (contract: ContractChatResponse | null) => {
  const [workday, setWorkday] = useState<string[]>([]);
  const [workStartTime, setWorkStartTime] = useState('');
  const [workEndTime, setWorkEndTime] = useState('');
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [workSalaryType, setWorkSalaryType] = useState('시급');
  const [workSalaryAmount, setWorkSalaryAmount] = useState('');
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!contract) return;

    setWorkday(contract.workDays.map((day) => DAY_EN_TO_KR[day]));
    setWorkStartTime(contract.workStartTime.slice(0, 5));
    setWorkEndTime(contract.workEndTime.slice(0, 5));
    setCareTypes(contract.careTypes);
    setWorkSalaryType(SALARY_EN_TO_KR[contract.workSalaryUnitType]);
    setWorkSalaryAmount(contract.workSalaryAmount.toLocaleString('ko-KR'));
    const [startYear, startMonth, startDate] =
      contract.workStartDate.split('-');
    setSelectedYear([startYear]);
    setSelectedMonth([startMonth]);
    setSelectedDay([startDate]);
  }, [contract]);

  const handleWorkday = useCallback((id: string) => {
    setWorkday((prev) => {
      const next = prev.includes(id)
        ? prev.filter((day) => day !== id)
        : [...prev, id];

      if (
        next.length !== prev.length ||
        !next.every((item) => prev.includes(item))
      ) {
        setIsChanged(true);
      }
      return next;
    });
  }, []);

  const handleWorkStartTime = useCallback(
    (t: string) => {
      // 값이 실제로 변경되었을 때만 업데이트 및 isChanged = true
      if (t !== workStartTime) {
        setWorkStartTime(t);
        setIsChanged(true);
      }
    },
    [workStartTime],
  );

  const handleWorkEndTime = useCallback(
    (t: string) => {
      // 값이 실제로 변경되었을 때만 업데이트 및 isChanged = true
      if (t !== workEndTime) {
        setWorkEndTime(t);
        setIsChanged(true);
      }
    },
    [workEndTime],
  );

  const handleCareTypes = useCallback((careType: string) => {
    setCareTypes((prev) => {
      const exists = prev.includes(careType);
      const next = exists
        ? prev.filter((type) => type !== careType)
        : [...prev, careType];

      // 배열 내용이 실제로 변경되었는지 확인 (순서 무관)
      if (
        next.length !== prev.length ||
        !next.every((item) => prev.includes(item))
      ) {
        setIsChanged(true);
      }
      return next;
    });
  }, []);

  const handleWorkSalaryAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const format = input.replace(/[^0-9]/g, '');
      const amount = Number(format);

      const newAmountString =
        !isNaN(amount) && format !== '' ? amount.toLocaleString('ko-KR') : '';

      // 값이 실제로 변경되었을 때만 업데이트 및 isChanged = true
      if (newAmountString !== workSalaryAmount) {
        setWorkSalaryAmount(newAmountString);
        setIsChanged(true);
      }
    },
    [workSalaryAmount],
  );

  const handleSelectedYear = useCallback(
    (newYearArray: string[]) => {
      // 값이 실제로 변경되었을 때만 업데이트 및 isChanged = true
      if (selectedYear[0] !== newYearArray[0]) {
        setSelectedYear(newYearArray);
        setIsChanged(true);
      }
    },
    [selectedYear],
  );

  // 월 선택 핸들러
  const handleSelectedMonth = useCallback(
    (newMonthArray: string[]) => {
      // 값이 실제로 변경되었을 때만 업데이트 및 isChanged = true
      if (selectedMonth[0] !== newMonthArray[0]) {
        setSelectedMonth(newMonthArray);
        setIsChanged(true);
      }
    },
    [selectedMonth],
  );

  // 일 선택 핸들러
  const handleSelectedDay = useCallback(
    (newDayArray: string[]) => {
      // 값이 실제로 변경되었을 때만 업데이트 및 isChanged = true
      if (selectedDay[0] !== newDayArray[0]) {
        setSelectedDay(newDayArray);
        setIsChanged(true);
      }
    },
    [selectedDay],
  );

  const getRequest = useCallback((): EditContractChatRequest => {
    const year = selectedYear[0] ?? '';
    const month = selectedMonth[0]?.padStart(2, '0');
    const day = selectedDay[0]?.padStart(2, '0');

    return {
      sendRequestType: 'EDIT_CONTRACT',
      workDays: formatDaysToEN(workday),
      workStartTime: workStartTime,
      workEndTime: workEndTime,
      workSalaryUnitType: SALARY_KR_TO_EN[workSalaryType],
      workSalaryAmount: Number(workSalaryAmount.replaceAll(',', '')),
      workStartDate: `${year}-${month}-${day}`,
      careTypes: careTypes,
    };
  }, [
    workday,
    workStartTime,
    workEndTime,
    careTypes,
    workSalaryType,
    workSalaryAmount,
    selectedYear,
    selectedMonth,
    selectedDay,
  ]);

  return {
    workday,
    workStartTime,
    workEndTime,
    careTypes,
    workSalaryType,
    workSalaryAmount,
    selectedYear,
    selectedMonth,
    selectedDay,

    handleWorkday,
    handleWorkStartTime,
    handleWorkEndTime,
    handleCareTypes,
    setWorkSalaryType,
    handleWorkSalaryAmount,
    handleSelectedYear,
    handleSelectedMonth,
    handleSelectedDay,

    isChanged,
    setIsChanged,

    getRequest,
  };
};
