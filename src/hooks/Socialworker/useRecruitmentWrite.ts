import { useState } from 'react';
import { RecruitmentForm } from '@/types/Matching.socialWorker';
import {
  DAY_EN_TO_KO,
  DAY_KO_TO_EN,
} from '@/constants/socialworker/day.socialWorker';

type WorkDayEnum = RecruitmentForm['workDays'][number];

export type UseRecruitmentWriteFormParams = {
  value: RecruitmentForm;
  onChange: (patch: Partial<RecruitmentForm>) => void;
};

export const useRecruitmentWrite = ({
  value,
  onChange,
}: UseRecruitmentWriteFormParams) => {
  const [selectDay, setSelectDay] = useState<string[]>(
    value.workDays ? value.workDays.map((d) => DAY_EN_TO_KO[d]) : [],
  );

  const [title, setTitle] = useState(value.title ?? '');
  const [startTime, setStartTime] = useState(value.workStartTime ?? '09:00');
  const [endTime, setEndTime] = useState(value.workEndTime ?? '18:00');
  const [careTypes, setCareTypes] = useState<string[]>(value.careTypes ?? []);
  const [selectedPayType, setSelectedPayType] = useState<
    RecruitmentForm['workSalaryUnitType']
  >(value.workSalaryUnitType ?? 'HOUR');
  const [workSalaryAmount, setWorkSalaryAmount] = useState(
    value.workSalaryAmount ? String(value.workSalaryAmount) : '',
  );
  const [memoContent, setMemoContent] = useState(value.description ?? '');

  const handleTitleChange = (t: string) => {
    setTitle(t);
    onChange({ title: t });
  };

  const handleSelectDay = (id: string) => {
    setSelectDay((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((day) => day !== id) : [...prev, id];

      const workDaysEnum = next
        .map((ko) => DAY_KO_TO_EN[ko as keyof typeof DAY_KO_TO_EN])
        .filter(Boolean) as WorkDayEnum[];

      onChange({ workDays: workDaysEnum });
      return next;
    });
  };

  const handleStartTime = (t: string) => {
    setStartTime(t);
    onChange({ workStartTime: t });
  };

  const handleEndTime = (t: string) => {
    setEndTime(t);
    onChange({ workEndTime: t });
  };

  const handleCareTypeChange = (careType: string) => {
    setCareTypes((prev) => {
      const exists = prev.includes(careType);
      const next = exists
        ? prev.filter((type) => type !== careType)
        : [...prev, careType];

      onChange({ careTypes: next });
      return next;
    });
  };

  const handlePayTypeChange = (next: RecruitmentForm['workSalaryUnitType']) => {
    setSelectedPayType(next);
    onChange({ workSalaryUnitType: next });
  };

  const handlePayAmountChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const raw = e.target.value;
    setWorkSalaryAmount(raw);
    onChange({ workSalaryAmount: raw === '' ? 0 : Number(raw) });
  };

  const handleMemoChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    const text = e.target.value;
    setMemoContent(text);
    onChange({ description: text });
  };

  return {
    selectDay,
    title,
    startTime,
    endTime,
    careTypes,
    selectedPayType,
    workSalaryAmount,
    memoContent,

    handleTitleChange,
    handleSelectDay,
    handleStartTime,
    handleEndTime,
    handleCareTypeChange,
    handlePayTypeChange,
    handlePayAmountChange,
    handleMemoChange,
  };
};
//TODO 리팩토링 예정....
