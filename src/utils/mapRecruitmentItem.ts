import { GENDER_EN_TO_KR_1 } from '@/constants/common/gender';
import { DAY_EN_TO_KO } from '@/constants/socialworker/day.socialWorker';
import { ElderMatchingCardDto } from '@/types/Elderly';
import { RecruitmentItem } from '@/types/Socialworker/matching';
import { formatDateTime } from '@/utils/formatTime';

export const mapRecruitmentItemToCardDto = (
  it: RecruitmentItem,
): ElderMatchingCardDto => {
  const r = it.recruitmentInfo;
  const e = it.elderlyInfo;

  const daysText = r.workDays.map((d) => DAY_EN_TO_KO[d]).join(', ');
  const gender = GENDER_EN_TO_KR_1[e.elderlyGender];

  const careTags = r.careTypes ?? [];
  const careDetailMap: Record<string, string[]> = {};

  return {
    id: r.recruitmentId,
    name: e.elderlyName,
    age: e.elderlyAge,
    gender,
    status: it.recruitmentStatus,
    scheduleText: `${daysText} ${r.workStartTime}~${r.workEndTime}`,
    location: e.elderlyLocation || r.workLocation,
    description: r.title,
    autoMatchCount: it.matchingCount,
    applyCount: it.applyCount,
    createdAtText: formatDateTime(r.createdTime),
    careTags,
    careDetailMap,
  };
};

export const mapRecruitmentListToCardDtos = (items: RecruitmentItem[]) =>
  items.map(mapRecruitmentItemToCardDto);
