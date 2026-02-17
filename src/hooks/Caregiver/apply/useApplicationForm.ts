import { useEffect, useState } from 'react';
import { DAY_MAP, SALARY_MAP, TIME_MAP } from '@/constants/common/maps';
import { WorkApplication } from '@/types/Caregiver/common';

export const useApplicationForm = (data: WorkApplication | undefined) => {
  // 희망 급여 관련 상태
  const [payType, setPayType] = useState('시급');
  const [pay, setPay] = useState('');
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const format = e.target.value.replace(/[^0-9]/g, '');
    const amount = Number(format);

    setPay(
      !isNaN(amount) && format !== '' ? amount.toLocaleString('ko-KR') : '',
    );
  };

  // 근무 요일
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const handleSelectDay = (id: string) => {
    setSelectDay((prev) =>
      prev.includes(id) ? prev.filter((day) => day !== id) : [...prev, id],
    );
  };

  // 근무 시간
  const [selectTime, setSelectTime] = useState<string[]>([]);
  const handleSelectTime = (id: string) => {
    setSelectTime((prev) =>
      prev.includes(id) ? prev.filter((time) => time !== id) : [...prev, id],
    );
  };

  // 근무 유형
  const [selectCaretype, setSelectCaretype] = useState<string[]>([]);
  const handleSelectCaretype = (id: string) => {
    setSelectCaretype((prev) =>
      prev.includes(id) ? prev.filter((care) => care !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (data) {
      setPayType(SALARY_MAP.EN_TO_KR[data.workSalaryUnitType]);
      setPay(data.workSalaryAmount.toLocaleString('ko-KR'));
      setSelectDay(data.workDays.map((day) => DAY_MAP.EN_TO_KR[day]));
      setSelectTime(data.workTimes.map((time) => TIME_MAP.EN_TO_LONG[time]));
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
