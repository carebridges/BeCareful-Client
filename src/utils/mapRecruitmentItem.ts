import { DAY_MAP, GENDER_MAP } from '@/constants/common/maps';
import { ElderMatchingCardDto } from '@/types/Elderly';
import { RecruitmentItem } from '@/types/Socialworker/matching';
import { formatDateTime } from '@/utils/formatTime';

export const mapRecruitmentItemToCardDto = (
  it: RecruitmentItem,
): ElderMatchingCardDto => {
  const r = it.recruitmentInfo;
  const e = it.elderlyInfo;

  const daysText = r.workDays.map((d) => DAY_MAP.EN_TO_KR[d]).join(', ');
  const gender =
    GENDER_MAP.EN_TO_KR_SHORT[
      e.elderlyGender as keyof typeof GENDER_MAP.EN_TO_KR_SHORT
    ];

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
