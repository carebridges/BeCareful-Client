import { StatusTag } from '@/components/common/Tag/StatusTag';
import { Tag } from '@/components/common/Tag/Tag';
import { RecruitmentItem } from '@/types/Socialworker/matching';
import { formatHHMM, formatDateTime, shortenYear } from '@/utils/formatTime';
import { sortWorkDays, translateWorkDaysToKo } from '@/utils/formatWorkDays';
import { ReactComponent as IconMap } from '@/assets/icons/caregiver/IconMap.svg';
import { ReactComponent as IconTime } from '@/assets/icons/caregiver/IconTime.svg';

import { styled } from 'styled-components';
export interface ElderMatchingCardData {
  recruitmentInfo: RecruitmentItem['recruitmentInfo'];
  elderlyInfo: RecruitmentItem['elderlyInfo'];
  matchingCount: number;
  applyCount: number;
}

interface ElderMatchingCardProps {
  data: RecruitmentItem;
  onClick?: (id: number) => void;
}

export const ElderMatchingCard = ({
  data,
  onClick,
}: ElderMatchingCardProps) => {
  const {
    recruitmentInfo: r,
    elderlyInfo: e,
    matchingCount,
    applyCount,
  } = data;

  //TODO.... 리팩토링 예정...
  const id = r.recruitmentId;
  const name = e.elderlyName;
  const age = e.elderlyAge;
  const gender = e.elderlyGender === 'MALE' ? '남' : '여';
  const status = r.recruitmentStatus === '모집중' ? '매칭중' : '공고마감';

  const daysKo = translateWorkDaysToKo(sortWorkDays(r.workDays));
  const scheduleText = `${daysKo} ${formatHHMM(r.workStartTime)}~${formatHHMM(r.workEndTime)}`;

  const location = e.elderlyLocation ?? r.elderlyInfo.address;
  const description = r.title;

  const createdAtText = shortenYear(formatDateTime(r.createdAt));

  const allTags =
    r.elderlyInfo.detailCareTypes?.flatMap((c) => [
      c.careType,
      ...(c.detailCareTypes ?? []),
    ]) ?? [];
  const displayTags = allTags.slice(0, 3);
  const hasMore = allTags.length > 3;

  return (
    <ElderCardContainer onClick={() => onClick?.(id)}>
      <ElderInfo>
        <InfoStatus>
          <Info>
            <strong>{name}</strong>
            <DetailInfo>
              {age}세 {gender}
            </DetailInfo>
          </Info>
          <StatusTag status={status} />
        </InfoStatus>
        <InfoDetails>
          <div className="title">{description}</div>
          <TagContainer>
            {displayTags.map((t) => (
              <Tag key={t} label={t} />
            ))}
            {hasMore && <Tag key="more" label="..." />}
          </TagContainer>
        </InfoDetails>
      </ElderInfo>

      <ElderTimeLocation>
        <div>
          <IconMap />
          {scheduleText}
        </div>
        <div>
          <IconTime />
          {location}
        </div>
      </ElderTimeLocation>

      <ElderApplyTime>
        <ApplyInfo>
          <div>
            자동 매칭 <span className="count"> {matchingCount} </span>명 ·
            지원자 <span className="count"> {applyCount} </span>명
          </div>
        </ApplyInfo>

        <div className="time">{createdAtText}</div>
      </ElderApplyTime>
    </ElderCardContainer>
  );
};

const ElderCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 20px 28px 20px;
  box-sizing: border-box;
  width: 100%;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const ElderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const ElderTimeLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray800};

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ElderApplyTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .time {
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

const InfoStatus = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DetailInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
`;

const ApplyInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray800};

  .count {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
