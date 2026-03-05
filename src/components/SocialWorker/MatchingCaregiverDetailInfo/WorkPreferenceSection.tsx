import {
  DetailContent,
  DetailContentContainer,
  Title,
} from '@/components/SocialWorker/MatchingCaregiverDetailInfo/MatchingCaregiverDetailInfo.styles';
import { DAY_MAP, TIME_MAP } from '@/constants/common/maps';

interface WorkLocation {
  siDo: string;
  siGuGun: string;
  eupMyeonDong: string;
}

interface WorkPreferenceSectionProps {
  data: {
    careTypes: string[];
    workDays: (keyof typeof DAY_MAP.EN_TO_KR)[];
    workTimes: (keyof typeof TIME_MAP.EN_TO_KR)[];
    workSalaryAmount: number;
    workLocations: WorkLocation[];
  };
}

export const WorkPreferenceSection = ({ data }: WorkPreferenceSectionProps) => {
  return (
    <>
      <Title>희망 근무조건</Title>
      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">케어항목</span>
          <span>{data.careTypes.join(', ')}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무요일</span>
          <span>
            {data.workDays.map((d) => DAY_MAP.EN_TO_KR[d]).join(', ')}
          </span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무시간</span>
          <span>
            {data.workTimes.map((t) => TIME_MAP.EN_TO_KR[t]).join(', ')}
          </span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">희망급여</span>
          <span>{data.workSalaryAmount.toLocaleString()}원</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무지역</span>
          <span>
            {data.workLocations
              .map((loc) => `${loc.siDo} ${loc.siGuGun} ${loc.eupMyeonDong}`)
              .join(', ')}
          </span>
        </DetailContent>
      </DetailContentContainer>
    </>
  );
};
