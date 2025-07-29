import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Chat } from '@/assets/icons/ChatNewBlack.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import {
  Gender_Mapping,
  Salary_Type_Mapping,
} from '@/constants/caregiverMapping';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';
import { dayFormat } from '@/utils/caregiver';

interface CaregiverWorkDetailProps {
  work: MatchingRecruitmentResponse;
  date?: string;
}

const CaregiverWorkDetail = ({ work, date }: CaregiverWorkDetailProps) => {
  const navigate = useNavigate();

  const chatNew = false;

  const workInfo = [
    {
      title: '장기요양등급',
      detail: work.elderlyInfo.careLevel,
    },
    {
      title: '근무요일',
      detail: dayFormat(work.recruitmentInfo.workDays),
    },
    {
      title: '근무시간',
      detail: `${work.recruitmentInfo.workStartTime} ~ ${work.recruitmentInfo.workEndTime}`,
    },
    {
      title: Salary_Type_Mapping[work.recruitmentInfo.workSalaryUnitType],
      detail: work.recruitmentInfo.workSalaryAmount.toLocaleString('ko-KR'),
    },
  ];

  const elderlyInfo = [
    {
      title: '나이/성별',
      detail: `${work.elderlyInfo.age}세 ${Gender_Mapping[work.elderlyInfo.gender]}`,
    },
    {
      title: '주소',
      detail: work.elderlyInfo.address,
    },
    {
      title: '건강상태',
      detail: work.elderlyInfo.healthCondition,
    },
    {
      title: '거주형태',
      detail: work.elderlyInfo.hasInmate ? '동거중' : '독거중',
    },
    {
      title: '애완동물',
      detail: work.elderlyInfo.hasPet ? '있음' : '없음',
    },
  ];

  const workContentInfo = [
    {
      title: '케어항목',
      detail: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {work.recruitmentInfo.careTypes.map((caretype) => (
            <label key={caretype.careType} className="detail">
              {caretype.careType} - {caretype.detailCareTypes}
            </label>
          ))}
        </div>
      ),
    },
    {
      title: '기타',
      detail: work.recruitmentInfo.description,
    },
  ];

  const institutionInfo = [
    {
      title: '기관명',
      detail: work.institutionInfo.institutionName,
    },
    {
      title: '주소',
      detail: work.institutionInfo.institutionOpenYear,
    },
  ];

  return (
    <Container style={{ marginBottom: date ? '' : '92px' }}>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('-1');
              window.scrollTo(0, 0);
            }}
          />
        }
        right={
          <NavRight
            onClick={() => {
              navigate('/caregiver/chatlist');
              window.scrollTo(0, 0);
            }}
          >
            {chatNew ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="white"
      />

      <WorkInfoWrapper>
        <div className="top">
          <ApplyDate>
            <label className="institution">
              {work.recruitmentInfo.institutionName}
            </label>
            {date && (
              <label className="date">{date.replace(/-/g, '.')} 신청</label>
            )}
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

        <InfoDisplay
          width="72px"
          gapColumn="8px"
          gapRow="20px"
          items={workInfo}
        />
      </WorkInfoWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">어르신 정보</label>

        <div className="info">
          <img src={work.elderlyInfo.profileImageUrl} />
          <label className="section-title">{work.elderlyInfo.name}</label>
        </div>

        <InfoDisplay
          width="56px"
          gapColumn="8px"
          gapRow="24px"
          items={elderlyInfo}
        />
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">근무 내용</label>

        <InfoDisplay
          width="56px"
          gapColumn="8px"
          gapRow="24px"
          items={workContentInfo}
        />
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">기관 정보</label>

        <InfoDisplay
          width="56px"
          gapColumn="8px"
          gapRow="24px"
          items={institutionInfo}
        />
      </SectionWrapper>
    </Container>
  );
};

export default CaregiverWorkDetail;

const Container = styled.div`
  margin: auto 20px;

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

const NavRight = styled.div`
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
