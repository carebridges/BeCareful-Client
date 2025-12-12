import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { TimeDropdown } from '@/components/common/Dropdown/TimeDropdown';
import { ApplicationDropdown } from '@/components/Caregiver/Mypage/ApplicationDropdown';
import { MatchingCareCard } from '@/page/Matching/MatchingCareCard';
import { useChat } from '@/hooks/useChat';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { DAYS } from '@/constants/common/day';
import { salaryTypes } from '@/constants/common/salary';
import { MATCHING_CARE_TYPE_OPTIONS } from '@/constants/socialworker/careTypes.socialWorker';
import { ContractChatResponse } from '@/types/common/chat';
import { useEditContractForm } from '@/hooks/Socialworker/useEditContractForm';

const SocialworkerEditContractPage = () => {
  const location = useLocation();
  const param = useParams<{ chatRoomId: string }>();
  const chatRoomId = Number(param.chatRoomId);

  const state = location.state as { chat?: ContractChatResponse };
  const contract = state?.chat ?? null;

  const { handleGoBack } = useHandleNavigate();
  const { send } = useChat({ chatRoomId });

  const form = useEditContractForm(contract);

  const years = Array.from({ length: 50 }, (_, i) => `${2025 + i}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const handleEdit = () => {
    const request = form.getRequest();
    send(chatRoomId, request);
    handleGoBack();
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>근무 조건 수정</NavCenter>}
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
              checked={form.workday.includes(day)}
              onChange={form.handleWorkday}
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
            value={form.workStartTime || '00:00'}
            onChange={form.handleWorkStartTime}
          />
          ~
          <TimeDropdown
            width="50%"
            value={form.workEndTime || '00:00'}
            onChange={form.handleWorkEndTime}
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
            initialChecked={form.careTypes.includes(key)}
            onChange={() => form.handleCareTypes(key)}
          />
        ))}
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          급여 <span>*</span>
        </label>
        <label className="guide">
          최저시급 10,030원 이상으로 입력해 주세요.
        </label>
        <PayWrapper>
          <ApplicationDropdown
            title={form.workSalaryType || '시급'}
            contents={salaryTypes}
            selectedContents={[form.workSalaryType]}
            setSelectedContents={(values) =>
              form.setWorkSalaryType(values[0] || '')
            }
          />
          <div className="pay">
            <Pay
              id="pay"
              placeholder="10,030"
              value={form.workSalaryAmount}
              onChange={form.handleWorkSalaryAmount}
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
            width="100%"
            title="연도"
            contents={years}
            selectedContents={form.selectedYear}
            setSelectedContents={form.handleSelectedYear}
            height="48px"
            borderRadius="12px"
          />
          <Dropdown
            width="100%"
            title="월"
            contents={months}
            selectedContents={form.selectedMonth}
            setSelectedContents={form.handleSelectedMonth}
            height="48px"
            borderRadius="12px"
          />
          <Dropdown
            width="100%"
            title="일"
            contents={days}
            selectedContents={form.selectedDay}
            setSelectedContents={form.handleSelectedDay}
            height="48px"
            borderRadius="12px"
          />
        </DateRow>
      </SectionWrapper>

      <Bottom>
        <Button
          height="56px"
          variant={form.isChanged ? 'mainBlue' : 'disabled'}
          disabled={!form.isChanged}
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;

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
