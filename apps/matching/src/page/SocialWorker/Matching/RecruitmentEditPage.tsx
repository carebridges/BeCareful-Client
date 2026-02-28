import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IconClose } from '@repo/ui/src/assets/icons/IconClose.svg';
import { RecruitmentWrite } from '@/components/SocialWorker/RecruitmentRegister/RecruitmentWrite';
import { useEffect, useState } from 'react';
import {
  useRecruitmentDetail,
  useEditRecruitment,
} from '@/api/matching/socialworker';
import { MIN_WAGE } from '@/constants/common/maps';
import { RecruitmentForm } from '@/types/matching';
import { Button, ErrorIndicator, LoadingIndicator, NavBar } from '@repo/ui';

export const RecruitmentEditPage = () => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const id = Number(recruitmentId);

  const { data, isLoading, isError } = useRecruitmentDetail(id);

  const [recruitmentForm, setRecruitmentForm] =
    useState<RecruitmentForm | null>(null);

  const { mutateAsync: editRecruitment, isPending } = useEditRecruitment(id);

  useEffect(() => {
    if (!data) return;

    setRecruitmentForm({
      elderlyId: null,
      title: data.title,
      workDays: data.workDays,
      workStartTime: data.workStartTime,
      workEndTime: data.workEndTime,
      careTypes: data.elderlyInfo.detailCareTypes.map(
        (group) => group.careType,
      ),
      workSalaryUnitType: data.workSalaryUnitType ?? 'HOUR',
      workSalaryAmount: data.workSalaryAmount,
      description: data.description,
    });
  }, [data]);

  if (isLoading || !recruitmentForm) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;

  const isFinalStepValid =
    recruitmentForm.title.trim() !== '' &&
    recruitmentForm.workDays.length > 0 &&
    recruitmentForm.workStartTime < recruitmentForm.workEndTime &&
    recruitmentForm.careTypes.length > 0 &&
    recruitmentForm.workSalaryAmount > 0;

  const handleSubmit = async () => {
    if (!isFinalStepValid || isPending) return;
    await editRecruitment(recruitmentForm);

    if (recruitmentForm.workSalaryAmount < MIN_WAGE) {
      alert('최저시급은 10,030원 이상으로 입력해야 합니다.');
      return;
    }

    window.scrollTo(0, 0);
    navigate(`/socialworker/recruitment/${id}`);
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
          center={<NavCenter>공고 수정</NavCenter>}
        />
      </NavBarContainer>

      <PageContent>
        <RecruitmentWrite
          value={recruitmentForm}
          onChange={(patch) =>
            setRecruitmentForm((prev) => (prev ? { ...prev, ...patch } : prev))
          }
        />
      </PageContent>

      <ButtonContainer>
        <Button
          onClick={handleSubmit}
          height="52px"
          disabled={!isFinalStepValid || isPending}
          variant="blue"
        >
          {isPending ? '수정 중…' : '공고 수정'}
        </Button>
      </ButtonContainer>
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
