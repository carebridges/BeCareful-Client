import { useEffect, useState } from 'react';
import { SALARY_EN_TO_KR } from '@/constants/common/salary';
import { DAY_EN_TO_KR } from '@/constants/common/day';
import { TIME_EN_TO_KR } from '@/constants/common/time';
import { WorkApplication } from '@/types/Caregiver/common';

export const useApplicationForm = (data: WorkApplication | undefined) => {
  // 희망 급여 관련 상태
  const [payType, setPayType] = useState('시급');
  const [pay, setPay] = useState('');
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const format = input.replace(/[^0-9]/g, '');
    const amount = Number(format);

    if (!isNaN(amount) && format !== '') {
      setPay(amount.toLocaleString('ko-KR'));
    } else {
      setPay('');
    }
  };

  // 근무 요일
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const handleSelectDay = (id: string) => {
    setSelectDay((prev) => {
      if (prev.includes(id)) {
        return prev.filter((day) => day !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 근무 시간
  const [selectTime, setSelectTime] = useState<string[]>([]);
  const handleSelectTime = (id: string) => {
    setSelectTime((prev) => {
      if (prev.includes(id)) {
        return prev.filter((time) => time !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 근무 유형
  const [selectCaretype, setSelectCaretype] = useState<string[]>([]);
  const handleSelectCaretype = (id: string) => {
    setSelectCaretype((prev) => {
      if (prev.includes(id)) {
        return prev.filter((care) => care !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    if (data) {
      setPayType(SALARY_EN_TO_KR[data.workSalaryUnitType]);
      setPay(data.workSalaryAmount.toLocaleString('ko-KR'));
      setSelectDay(data.workDays.map((day) => DAY_EN_TO_KR[day]));
      setSelectTime(data.workTimes.map((time) => TIME_EN_TO_KR[time]));
      setSelectCaretype(data.careTypes);
    }
  }, [data]);

  return {
    payType,
    setPayType,
    pay,
    selectTime,
    selectDay,
    selectCaretype,
    handleAmountChange,
    handleSelectTime,
    handleSelectDay,
    handleSelectCaretype,
  };
};
