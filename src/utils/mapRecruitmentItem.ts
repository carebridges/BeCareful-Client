import { GENDER_EN_TO_KR_1 } from '@/constants/common/gender';
import { DAY_EN_TO_KO } from '@/constants/socialworker/day.socialWorker';
import { ElderMatchingCardDto } from '@/types/Elderly';
import { RecruitmentItem } from '@/types/Socialworker/matching';
import { formatDateTime } from '@/utils/formatTime';

export const mapRecruitmentItemToCardDto = (
  it: RecruitmentItem,
): ElderMatchingCardDto => {
  const r = it.recruitmentInfo;
  const e = r.elderlyInfo;

  const daysText = r.workDays.map((d) => DAY_EN_TO_KO[d]).join(', ');
  const gender = GENDER_EN_TO_KR_1[e.gender];

  const careTags = (e.detailCareTypes ?? []).map((c) => c.careType);
  const careDetailMap = Object.fromEntries(
    (e.detailCareTypes ?? []).map((c) => [c.careType, c.detailCareTypes ?? []]),
  );

  return {
    id: r.recruitmentId,
    name: e.name,
    age: e.age,
    gender,
    status: r.recruitmentStatus,
    scheduleText: `${daysText} ${r.workStartTime}~${r.workEndTime}`,
    location: e.address,
    description: r.description,
    autoMatchCount: it.matchingCount,
    applyCount: it.applyCount,
    createdAtText: formatDateTime(r.createdAt),
    careTags,
    careDetailMap,
  };
};

export const mapRecruitmentListToCardDtos = (items: RecruitmentItem[]) =>
  items.map(mapRecruitmentItemToCardDto);
