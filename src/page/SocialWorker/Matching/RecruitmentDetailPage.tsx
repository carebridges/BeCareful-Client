import { NavBar } from '@/components/common/NavBar/NavBar';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as ThreeDots } from '@/assets/icons/socialworker/matching/IconThreeDots.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import {
  useCloseRecruitment,
  useDeleteRecruitment,
  useRecruitmentDetail,
} from '@/api/matching.socialWorker';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { formatDateTime } from '@/utils/formatTime';
import { translateWorkDaysToKo, sortWorkDays } from '@/utils/formatWorkDays';
import { useState } from 'react';
import { RecruitmentSummarySection } from '@/components/SocialWorker/RecruitmentDetail/RecruitmentSummarySection';
import { ElderInfoSection } from '@/components/SocialWorker/RecruitmentDetail/ElderInfoSection';
import { InstitutionInfoSection } from '@/components/SocialWorker/RecruitmentDetail/InstitutionInfoSection';
import { RecruitmentManageSheet } from '@/components/SocialWorker/RecruitmentDetail/RecruitmentManageSheet';
import { WorkContentSection } from '@/components/SocialWorker/RecruitmentDetail/WorkContentSection';
import { ErrorToast } from '@/components/SocialWorker/RecruitmentDetail/ErrorToast';
import { ServerErrorResponse } from '@/types/common/ServerError';
import axios, { AxiosError } from 'axios';

type SheetOption = 'edit' | 'close' | 'delete';

export const RecruitmentDetailPage = () => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const id = Number(recruitmentId);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SheetOption | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { mutate: closeRecruitment } = useCloseRecruitment(id);
  const { mutate: deleteRecruitment } = useDeleteRecruitment(id);

  const { data, isLoading, isError } = useRecruitmentDetail(id);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerErrorResponse>;
      const message = serverError.response?.data?.message;

      if (message) {
        setToastMessage(message);

        window.setTimeout(() => {
          setToastMessage(null);
        }, 3000);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError || !data) {
    return <ErrorIndicator />;
  }

  const {
    title,
    recruitmentStatus,
    workDays,
    workStartTime,
    workEndTime,
    workSalaryUnitType,
    workSalaryAmount,
    description,
    createdAt,
    elderlyInfo,
    institutionInfo,
  } = data;

  const workDayLabel = translateWorkDaysToKo(sortWorkDays(workDays));

  const salaryUnitLabel = (() => {
    switch (workSalaryUnitType) {
      case 'HOUR':
        return '시급';
      case 'DAY':
        return '일급';
      case 'MONTH':
        return '월급';
      case 'YEAR':
        return '연봉';
      default:
        return '';
    }
  })();

  const careDetailLabel = elderlyInfo.detailCareTypes
    .map(
      (group) =>
        `${group.careType} - ${group.detailCareTypes.join(', ') || '-'}`,
    )
    .join('\n');

  const genderAgeLabel = `${elderlyInfo.age}세 ${
    elderlyInfo.gender === 'FEMALE' ? '여성' : '남성'
  }`;

  const hasInmateLabel = elderlyInfo.hasInmate ? '동거중' : '비동거';
  const hasPetLabel = elderlyInfo.hasPet ? '있음' : '없음';

  const createdDateLabel = formatDateTime(createdAt).split(' ')[0];
  const handleConfirmSheet = () => {
    if (!selectedOption) {
      setIsSheetOpen(false);
      return;
    }

    if (selectedOption === 'edit') {
      //TODO
      setIsSheetOpen(false);
      return;
    }

    if (selectedOption === 'close') {
      closeRecruitment(undefined, {
        onSuccess: () => {
          setIsSheetOpen(false);
          navigate('/socialworker/match/social');
          scrollTo(0, 0);
        },
        onError: handleError,
      });
      return;
    }

    if (selectedOption === 'delete') {
      deleteRecruitment(undefined, {
        onSuccess: () => {
          setIsSheetOpen(false);
          navigate('/socialworker/match/social');
          scrollTo(0, 0);
        },
        onError: handleError,
      });
    }
  };

  return (
    <>
      <Container>
        <NavBarContainer>
          <NavBar
            left={
              <NavLeft onClick={() => navigate(-1)}>
                <ArrowLeft />
              </NavLeft>
            }
            right={
              <NavLeft onClick={() => setIsSheetOpen(true)}>
                <ThreeDots />
              </NavLeft>
            }
            color="white"
          />
        </NavBarContainer>

        <RecruitmentSummarySection
          institutionName={elderlyInfo.institutionName}
          createdDateLabel={createdDateLabel}
          title={title}
          careLevel={elderlyInfo.careLevel}
          recruitmentStatus={recruitmentStatus}
          workDayLabel={workDayLabel}
          workStartTime={workStartTime}
          workEndTime={workEndTime}
          salaryUnitLabel={salaryUnitLabel}
          workSalaryAmount={workSalaryAmount}
        />

        <Gap />

        <ElderInfoSection
          profileImageUrl={elderlyInfo.profileImageUrl}
          name={elderlyInfo.name}
          genderAgeLabel={genderAgeLabel}
          address={elderlyInfo.address}
          healthCondition={elderlyInfo.healthCondition}
          hasInmateLabel={hasInmateLabel}
          hasPetLabel={hasPetLabel}
        />

        <Gap />
        <WorkContentSection
          careDetailLabel={careDetailLabel}
          description={description}
        />

        <Gap />
        <InstitutionInfoSection
          name={institutionInfo.name}
          address={institutionInfo.address}
        />
      </Container>

      <ButtonContainer>
        <Button
          height="52px"
          variant="blue"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(`/socialworker/match/info/${id}`);
          }}
        >
          매칭 내역 보기
        </Button>
      </ButtonContainer>

      <RecruitmentManageSheet
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
        onConfirm={handleConfirmSheet}
      />

      {toastMessage && <ErrorToast text={toastMessage} />}
    </>
  );
};
const Container = styled.div`
  padding-bottom: 120px;
`;

const Gap = styled.p`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const NavBarContainer = styled.div`
  padding: 0 20px;
`;

const NavLeft = styled.div`
  cursor: pointer;
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
