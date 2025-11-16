import { NavBar } from '@/components/common/NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IconClose } from '@/assets/icons/IconClose.svg';
import { SelectElder } from '@/components/SocialWorker/RecruitmentRegister/SelectElder';
import { Button } from '@/components/common/Button/Button';
import { CheckElderInfo } from '@/components/SocialWorker/RecruitmentRegister/CheckElderInfo';
import { RecruitmentWrite } from '@/components/SocialWorker/RecruitmentRegister/RecruitmentWrite';
import { RecruitmentForm } from '@/types/Matching.socialWorker';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { useState } from 'react';
import { useRegisterMatchingRecruitment } from '@/api/matching.socialWorker';
import { RegisterMatchingElderModal } from '@/components/SocialWorker/RegisterMatchingElder/RegisterMatchingElderModal';

type RecruitmentRegisterLocationState = {
  elderlyId?: number;
};

const initialForm: RecruitmentForm = {
  elderlyId: null,
  title: '',
  workDays: [],
  workStartTime: '09:00',
  workEndTime: '18:00',
  careTypes: [],
  workSalaryUnitType: 'HOUR',
  workSalaryAmount: 0,
  description: '',
};

const stepPercents = [35, 70, 100];

export const RecruitmentRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as RecruitmentRegisterLocationState | null;

  const initialElderlyId = state?.elderlyId ?? null;

  const [step, setStep] = useState<0 | 1 | 2>(
    initialElderlyId !== null ? 1 : 0,
  );
  const [recruitmentForm, setRecruitmentForm] = useState<RecruitmentForm>({
    ...initialForm,
    elderlyId: initialElderlyId,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: registerRecruitment, isPending } =
    useRegisterMatchingRecruitment();

  const percent = stepPercents[step];
  const isFinalStepValid =
    !!recruitmentForm.elderlyId &&
    recruitmentForm.title.trim() !== '' &&
    recruitmentForm.workDays.length > 0 &&
    recruitmentForm.workStartTime < recruitmentForm.workEndTime &&
    recruitmentForm.careTypes.length > 0 &&
    recruitmentForm.workSalaryAmount > 0;

  const canNext =
    step === 0
      ? !!recruitmentForm.elderlyId
      : step === 2
        ? isFinalStepValid && !isPending
        : true;
  const goToPrev = () => setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)));

  const openConfirmModal = () => {
    if (!isFinalStepValid || isPending) return;
    setIsModalOpen(true);
  };

  const handleConfirmRegister = async () => {
    if (!isFinalStepValid || isPending) return;
    await registerRecruitment(recruitmentForm);
    window.scrollTo(0, 0);
    navigate('/socialworker/match/social');
  };

  const goToNext = async () => {
    if (step === 0) {
      if (!recruitmentForm.elderlyId) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      openConfirmModal();
    }
  };

  return (
    <>
      <NavBarContainer>
        <NavBar
          left={
            <NavLeft onClick={() => navigate(-1)}>
              <IconClose />
            </NavLeft>
          }
          center={<NavCenter>공고 등록</NavCenter>}
          color="white"
        />
      </NavBarContainer>

      <ProgressBar percent={percent} />
      <PageContent>
        {step === 0 && (
          <SelectElder
            value={recruitmentForm.elderlyId}
            onChange={(elderId) =>
              setRecruitmentForm((prev) => ({
                ...prev,
                elderlyId: prev.elderlyId === elderId ? null : elderId,
              }))
            }
          />
        )}

        {step === 1 && recruitmentForm.elderlyId && (
          <CheckElderInfo
            elderlyId={recruitmentForm.elderlyId}
            onConfirm={goToNext}
          />
        )}

        {step === 2 && (
          <RecruitmentWrite
            value={recruitmentForm}
            onChange={(patch) =>
              setRecruitmentForm((prev) => ({ ...prev, ...patch }))
            }
          />
        )}
      </PageContent>

      <ButtonContainer>
        <Button
          onClick={goToPrev}
          height="52px"
          variant="blue2"
          disabled={step === 0}
        >
          이전
        </Button>
        <Button
          onClick={goToNext}
          height="52px"
          disabled={!canNext}
          variant="blue"
        >
          {step === 2 ? (isPending ? '등록 중…' : '매칭 등록') : '다음'}
        </Button>
      </ButtonContainer>

      {step === 2 && isModalOpen && (
        <RegisterMatchingElderModal
          width="320px"
          onClose={() => setIsModalOpen(false)}
          onCancel={handleConfirmRegister}
        />
      )}
    </>
  );
};
const NavBarContainer = styled.div`
  display: flex;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
`;

const NavLeft = styled.div`
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;

const PageContent = styled.div`
  padding-bottom: 92px;
`;
