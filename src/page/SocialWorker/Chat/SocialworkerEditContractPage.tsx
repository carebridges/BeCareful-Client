import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import {
  useGetSocialworkerContract,
  usePostSocialworkerContract,
} from '@/api/socialworker';
import { SocialworkerContractEditRequest } from '@/types/Socialworker/chat';
import { CareTypeSection } from '@/components/SocialWorker/RegisterMatchingElder/CareTypeSection';
import { DaySelectSection } from '@/components/SocialWorker/RegisterMatchingElder/DaySelectSection';
import { TimeSelectSection } from '@/components/SocialWorker/RegisterMatchingElder/TimeSelectSection';
import { PaySection } from '@/components/SocialWorker/RegisterMatchingElder/PaySection';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useContractForm } from '@/hooks/Socialworker/useContractForm';
import { formatDaysToEN } from '@/utils/caregiverFormatter';

const SocialworkerEditContractPage = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const location = useLocation();
  const { matchingId } = location.state as { matchingId?: number };

  const { handleGoBack, handleNavigateState } = useHandleNavigate();

  const { data } = useGetSocialworkerContract(Number(contractId));
  // const matchingId = data?.matchingId;
  const { mutate: updateContract } = usePostSocialworkerContract();

  const {
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
  } = useContractForm(data);

  const handleEditBtnClick = async () => {
    if (!matchingId || !Number.isFinite(matchingId)) {
      console.error('유효하지 않은 matchingId');
      return;
    }
    const contractData: SocialworkerContractEditRequest = {
      matchingId: matchingId,
      workDays: formatDaysToEN(selectDay),
      workStartTime: startTime,
      workEndTime: endTime,
      workSalaryUnitType: selectedPayType,
      workSalaryAmount: Number(workSalaryAmount),
      workStartDate: '',
      careTypes: careTypes,
    };
    // console.log(contractData);
    updateContract(contractData, {
      onSuccess: () => {
        handleNavigateState(`/socialworker/chat/${matchingId}`, {
          state: { finalConfirm: true },
        });
      },
    });
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>수정하기</NavCenter>}
        color=""
      />

      <CareTypeSection
        selectedCareTypes={careTypes}
        onChange={handleCareTypeChange}
      />
      <DaySelectSection selectedDays={selectDay} onToggle={handleSelectDay} />
      <TimeSelectSection
        startTime={startTime}
        endTime={endTime}
        setStartTime={(time) => {
          setStartTime(time);
          setIsChanged(true);
        }}
        setEndTime={(time) => {
          setEndTime(time);
          setIsChanged(true);
        }}
      />
      <PaySection
        selectedPayType={selectedPayType}
        onPayTypeChange={(payType) => {
          setSelectedPayType(payType);
          setIsChanged(true);
        }}
        payAmount={workSalaryAmount}
        onAmountChange={(e) => {
          setWorkSalaryAmount(e.target.value);
          setIsChanged(true);
        }}
      />

      <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          프로필 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default SocialworkerEditContractPage;

const Container = styled.div`
  min-height: 100vh;
`;

const NavLeft = styled(ArrowLeft)`
  margin-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
