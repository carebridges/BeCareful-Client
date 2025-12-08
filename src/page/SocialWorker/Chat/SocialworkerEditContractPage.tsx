import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { TimeDropdown } from '@/components/common/Dropdown/TimeDropdown';
import { ApplicationDropdown } from '@/components/Caregiver/Mypage/ApplicationDropdown';
import { MatchingCareCard } from '@/page/Matching/MatchingCareCard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { DAY_EN_TO_KR, DAYS } from '@/constants/common/day';
import { SALARY_KR_TO_EN, salaryTypes } from '@/constants/common/salary';
import { MATCHING_CARE_TYPE_OPTIONS } from '@/constants/socialworker/careTypes.socialWorker';
import {
  ContractChatResponse,
  EditContractChatRequest,
} from '@/types/common/chat';
import { formatDaysToEN } from '@/utils/caregiverFormatter';

type LocationState = { chat?: ContractChatResponse };

const SocialworkerEditContractPage = () => {
  const location = useLocation();
  const chatRoomId = useParams<{ chatRoomId: string }>();
  const roomId = Number(chatRoomId);
  const state = location.state as LocationState | null;

  const { handleGoBack } = useHandleNavigate();

  const [contract] = useState<ContractChatResponse | null>(state?.chat ?? null);

  const [isChanged, setIsChanged] = useState(false);

  const [workday, setWorkday] = useState<string[]>([]);
  const [workStartTime, setWorkStartTime] = useState('');
  const [workEndTime, setWorkEndTime] = useState('');
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [workSalaryType, setWorkSalaryType] = useState('시급');
  const [workSalaryAmount, setWorkSalaryAmount] = useState('');
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);

  useEffect(() => {
    if (contract) {
      setWorkday(contract.workDays.map((day) => DAY_EN_TO_KR[day]));
      setWorkStartTime(contract.workStartTime);
      setWorkEndTime(contract.workEndTime);
      setCareTypes(contract.careTypes);
      // setPayType(SALARY_EN_TO_KR[chat.workSalaryUnitType]);
      setWorkSalaryAmount(contract.workSalaryAmount.toLocaleString('ko-KR'));
      const [startYear, startMonth, startDate] =
        contract.workStartDate.split('-');
      setSelectedYear([startYear]);
      setSelectedMonth([startMonth]);
      setSelectedDay([startDate]);
    }
  }, [contract]);

  const years = Array.from({ length: 50 }, (_, i) => `${2025 + i}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const handleSelectDay = (id: string) => {
    setWorkday((prev) => {
      if (prev.includes(id)) {
        return prev.filter((day) => day !== id);
      } else {
        return [...prev, id];
      }
    });
    setIsChanged(true);
  };

  const handleStartTime = (t: string) => {
    setWorkStartTime(t);
    setIsChanged(true);
  };

  const handleEndTime = (t: string) => {
    setWorkEndTime(t);
    setIsChanged(true);
  };

  const handleCareTypeChange = (careType: string) => {
    setCareTypes((prev) => {
      const exists = prev.includes(careType);
      const next = exists
        ? prev.filter((type) => type !== careType)
        : [...prev, careType];

      return next;
    });
    setIsChanged(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const format = input.replace(/[^0-9]/g, '');
    const amount = Number(format);

    if (!isNaN(amount) && format !== '') {
      setWorkSalaryAmount(amount.toLocaleString('ko-KR'));
    } else {
      setWorkSalaryAmount('');
    }
    setIsChanged(true);
  };

  const handleEdit = () => {
    const year = selectedYear[0];
    const month = selectedMonth[0]?.padStart(2, '0');
    const day = selectedDay[0]?.padStart(2, '0');

    const request: EditContractChatRequest = {
      sendRequestType: 'EDIT_CONTRACT',
      workDays: formatDaysToEN(workday),
      workStartTime: workStartTime,
      workEndTime: workEndTime,
      workSalaryUnitType: SALARY_KR_TO_EN[workSalaryType],
      workSalaryAmount: Number(workSalaryAmount.replaceAll(',', '')),
      workStartDate: `${year}-${month}-${day}`,
      careTypes: careTypes,
    };

    console.log(request);
    // send(roomId, request);
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>근무 조건 수정</NavCenter>}
        color="white"
      />

      <SectionWrapper>
        <label className="title">
          근무요일 <span>*</span>
        </label>
        <label className="guide">중복선택 가능</label>
        <SelectWrapper gap="4px">
          {DAYS.map((day) => (
            <CheckBoxSelect
              key={day}
              id={day}
              label={day}
              checked={workday.includes(day)}
              onChange={handleSelectDay}
              width="100%"
              height="42px"
            />
          ))}
        </SelectWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          근무시간 <span>*</span>
        </label>
        <TimeBoxContainer>
          <TimeDropdown
            width="50%"
            value={workStartTime || '00:00'}
            onChange={handleStartTime}
          />
          ~
          <TimeDropdown
            width="50%"
            value={workEndTime || '00:00'}
            onChange={handleEndTime}
          />
        </TimeBoxContainer>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          케어항목 <span>*</span>
        </label>
        <label className="guide">여러 개 선택 가능</label>
        {MATCHING_CARE_TYPE_OPTIONS.map(({ key, title, icon: Icon }) => (
          <MatchingCareCard
            key={key}
            title={title}
            Icon={Icon}
            initialChecked={careTypes.includes(key)}
            onChange={() => handleCareTypeChange(key)}
          />
        ))}
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          급여 <span>*</span>
          <label className="guide">
            최저시급 10,030원 이상으로 입력해 주세요.
          </label>
        </label>
        <PayWrapper>
          <ApplicationDropdown
            title={workSalaryType || '시급'}
            contents={salaryTypes}
            selectedContents={[workSalaryType]}
            setSelectedContents={(values) => setWorkSalaryType(values[0] || '')}
          />
          <div className="pay">
            <Pay
              id="pay"
              placeholder="10,030"
              value={workSalaryAmount}
              onChange={handleAmountChange}
            />
            <label className="count">원</label>
          </div>
        </PayWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          근무시작일 <span>*</span>
        </label>
        <DateRow>
          <Dropdown
            title="연도"
            contents={years}
            selectedContents={selectedYear}
            setSelectedContents={setSelectedYear}
          />
          <Dropdown
            title="월"
            contents={months}
            selectedContents={selectedMonth}
            setSelectedContents={setSelectedMonth}
          />
          <Dropdown
            title="일"
            contents={days}
            selectedContents={selectedDay}
            setSelectedContents={setSelectedDay}
          />
        </DateRow>
      </SectionWrapper>

      <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEdit}
        >
          수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default SocialworkerEditContractPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .guide {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const SelectWrapper = styled.div<{ gap: string }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => (gap ? gap : '8px')};
`;

const TimeBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const PayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;

  .pay {
    position: relative;
    width: 100%;
    display: flex;
  }

  .count {
    position: absolute;
    right: 16px;
    top: 16px;
  }
`;

const Pay = styled.input`
  width: 100%;
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
