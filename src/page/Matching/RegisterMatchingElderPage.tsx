import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';

import { Button } from '@/components/common/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleInputSection } from '@/components/SocialWorker/RegisterMatchingElder/TitleInputSection';
import { DaySelectSection } from '@/components/SocialWorker/RegisterMatchingElder/DaySelectSection';
import { TimeSelectSection } from '@/components/SocialWorker/RegisterMatchingElder/TimeSelectSection';
import { CareTypeSection } from '@/components/SocialWorker/RegisterMatchingElder/CareTypeSection';
import { PaySection } from '@/components/SocialWorker/RegisterMatchingElder/PaySection';
import { MemoSection } from '@/components/SocialWorker/RegisterMatchingElder/MemoSection';
import { useRegisterMatchingForm } from '@/hooks/Elderly/useRegisterMatchingElder';
import { useRegisterMatchingRecruitment } from '@/api/matching.socialWorker';
import { useState } from 'react';
import { RegisterMatchingElderModal } from '@/components/SocialWorker/RegisterMatchingElder/RegisterMatchingElderModal';

export const RegisterMatchingElderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const elderlyId = location.state?.elderlyId;
  const {
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
  } = useRegisterMatchingForm(elderlyId);
  const navigate = useNavigate();
  const { mutate: registerMatchingRecruitment } =
    useRegisterMatchingRecruitment();

  const handleSubmit = () => {
    const payload = getPayload();
    registerMatchingRecruitment(payload, {
      onSuccess: (data) => {
        navigate(`/matching/info/${data}`);
      },
      onError: (error) => {
        console.error('공고 등록 실패:', error);
        alert('공고 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate(-1)}>
          <IconArrowLeft />
        </IconContainer>
        매칭 등록
        <HideIconContainer />
      </TopContainer>

      <TitleInputSection title={title} setTitle={setTitle} />
      <DaySelectSection selectedDays={selectDay} onToggle={handleSelectDay} />
      <TimeSelectSection
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
      <CareTypeSection
        selectedCareTypes={careTypes}
        onChange={handleCareTypeChange}
      />
      <PaySection
        selectedPayType={selectedPayType}
        onPayTypeChange={setSelectedPayType}
        payAmount={workSalaryAmount}
        onAmountChange={(e) => setWorkSalaryAmount(e.target.value)}
      />
      <MemoSection
        value={memoContent}
        onChange={(e) => setMemoContent(e.target.value)}
      />
      <Border />
      <Button
        variant={isFormValid ? 'blue' : 'disabled'}
        height="52px"
        style={{ margin: '20px 0px' }}
        onClick={handleOpenModal}
        disabled={!isFormValid}
      >
        매칭 등록하기
      </Button>
      {isModalOpen && (
        <RegisterMatchingElderModal
          width="80%"
          onClose={handleCloseModal}
          onCancel={handleSubmit}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0px 16px auto 16px;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const HideIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
  margin-top: 40px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
