import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { SALARY_EN_TO_KR } from '@/constants/common/salary';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';
import { formatDaysToKR } from '@/utils/caregiverFormatter';
import { formatDateTime } from '@/utils/formatTime';

interface CaregiverWorkDetailProps {
  work: MatchingRecruitmentResponse;
}

const CaregiverWorkDetail = ({ work }: CaregiverWorkDetailProps) => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const workInfo = [
    {
      title: '장기요양등급',
      detail: work.recruitmentInfo.elderlyInfo.careLevel,
    },
    {
      title: '근무요일',
      detail: formatDaysToKR(work.recruitmentInfo.workDays),
    },
    {
      title: '근무시간',
      detail: `${work.recruitmentInfo.workStartTime} ~ ${work.recruitmentInfo.workEndTime}`,
    },
    {
      title: SALARY_EN_TO_KR[work.recruitmentInfo.workSalaryUnitType],
      detail: `${work.recruitmentInfo.workSalaryAmount.toLocaleString('ko-KR')}원`,
    },
  ];

  const elderlyInfo = [
    {
      title: '나이/성별',
      detail: `${work.recruitmentInfo.elderlyInfo.age}세 ${GENDER_EN_TO_KR_2[work.recruitmentInfo.elderlyInfo.gender]}`,
    },
    {
      title: '주소',
      detail: work.recruitmentInfo.elderlyInfo.address,
    },
    {
      title: '건강상태',
      detail: work.recruitmentInfo.elderlyInfo.healthCondition,
    },
    {
      title: '거주형태',
      detail: work.recruitmentInfo.elderlyInfo.hasInmate ? '동거중' : '독거중',
    },
    {
      title: '애완동물',
      detail: work.recruitmentInfo.elderlyInfo.hasPet ? '있음' : '없음',
    },
  ];

  const workCareInfo = [
    {
      title: '케어항목',
      detail: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {work.recruitmentInfo.elderlyInfo.detailCareTypes.map((caretype) => (
            <label key={caretype.careType} className="detail">
              {caretype.careType} - {caretype.detailCareTypes}
            </label>
          ))}
        </div>
      ),
    },
  ];

  const workExtraInfo = [
    {
      title: '기타',
      detail: work.recruitmentInfo.description,
    },
  ];

  const institutionInfo = [
    {
      title: '기관명',
      detail: work.recruitmentInfo.institutionInfo.name,
    },
    {
      title: '주소',
      detail: work.recruitmentInfo.institutionInfo.address,
    },
  ];

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        right={
          <NavRight onClick={() => handleNavigate('/caregiver/chat')}>
            {work.hasNewChat ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="white"
      />

      <WorkInfoWrapper>
        <div className="top">
          <ApplyDate>
            <label className="institution">
              {work.recruitmentInfo.institutionInfo.name}
            </label>
            <label className="date">
              {formatDateTime(work.recruitmentInfo.createdAt, true)}
            </label>
          </ApplyDate>

          <label className="work-title">{work.recruitmentInfo.title}</label>

          {(work.matchingResultStatus === '높음' ||
            work.isHotRecruitment ||
            work.isHourlySalaryTop) && (
            <Tags>
              {work.matchingResultStatus === '높음' && (
                <label className="tag">적합도 높음</label>
              )}
              {work.isHotRecruitment && <label className="tag">인기공고</label>}
              {work.isHourlySalaryTop && (
                <label className="tag">시급 TOP</label>
              )}
            </Tags>
          )}
        </div>

        <InfoDisplay width="72px" gapRow="20px" items={workInfo} />
      </WorkInfoWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">어르신 정보</label>
        <div className="info">
          <img src={work.recruitmentInfo.elderlyInfo.profileImageUrl} />
          <label className="section-title">
            {work.recruitmentInfo.elderlyInfo.name}
          </label>
        </div>
        <InfoDisplay width="56px" gapRow="24px" items={elderlyInfo} />
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">근무 내용</label>
        <InfoDisplay width="56px" gapRow="24px" items={workCareInfo} />
        {work.recruitmentInfo.description && (
          <InfoDisplay width="56px" gapRow="24px" items={workExtraInfo} />
        )}
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">기관 정보</label>
        <InfoDisplay width="56px" gapRow="24px" items={institutionInfo} />
      </SectionWrapper>
    </Container>
  );
};

export default CaregiverWorkDetail;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 92px;

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavRight = styled(ChatNew)`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
`;

const WorkInfoWrapper = styled.div`
  padding-bottom: 32px;
  flex-direction: column;
  gap: 16px;

  .top {
    flex-direction: column;
    gap: 8px;
  }

  .work-title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const ApplyDate = styled.div`
  gap: 6px;

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }

  .institution {
    color: ${({ theme }) => theme.colors.gray500};
  }

  .date {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Tags = styled.div`
  gap: 6px;

  .tag {
    padding: 4px 8px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;

  .section-title {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .info {
    gap: 10px;
    align-items: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }
`;

const Border = styled.div`
  width: 100vw;
  height: 5px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
