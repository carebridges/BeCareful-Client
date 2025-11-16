import { RecruitmentForm } from '@/types/Matching.socialWorker';
import { styled } from 'styled-components';
import { TitleInputSection } from '@/components/SocialWorker/RegisterMatchingElder/TitleInputSection';
import { DaySelectSection } from '@/components/SocialWorker/RegisterMatchingElder/DaySelectSection';
import { TimeSelectSection } from '@/components/SocialWorker/RegisterMatchingElder/TimeSelectSection';
import { CareTypeSection } from '@/components/SocialWorker/RegisterMatchingElder/CareTypeSection';
import { PaySection } from '@/components/SocialWorker/RegisterMatchingElder/PaySection';
import { MemoSection } from '@/components/SocialWorker/RegisterMatchingElder/MemoSection';
import { useRecruitmentWrite } from '@/hooks/Socialworker/useRecruitmentWrite';

type Props = {
  value: RecruitmentForm;
  onChange: (patch: Partial<RecruitmentForm>) => void;
};

export const RecruitmentWrite = ({ value, onChange }: Props) => {
  const {
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
  } = useRecruitmentWrite({ value, onChange });
  return (
    <>
      <TitleSection>
        어르신 공고를 작성해 주세요.
        <div className="subtitle">어르신의 상세 공고 정보를 입력해 주세요.</div>
      </TitleSection>

      <TitleInputSection title={title} setTitle={handleTitleChange} />

      <DaySelectSection selectedDays={selectDay} onToggle={handleSelectDay} />

      <TimeSelectSection
        startTime={startTime}
        endTime={endTime}
        setStartTime={handleStartTime}
        setEndTime={handleEndTime}
      />

      <CareTypeSection
        selectedCareTypes={careTypes}
        onChange={handleCareTypeChange}
      />

      <PaySection
        selectedPayType={selectedPayType}
        onPayTypeChange={handlePayTypeChange}
        payAmount={workSalaryAmount}
        onAmountChange={handlePayAmountChange}
      />

      <MemoSection value={memoContent} onChange={handleMemoChange} />
    </>
  );
};

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px 0 20px;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  .subtitle {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
