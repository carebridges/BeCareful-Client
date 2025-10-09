import styled from 'styled-components';
import { colors } from '@/style/theme/color';
import { RecruitmentStatistics } from '@/types/Socialworker/home';

type ColorKey = keyof typeof colors;

interface MatchingSectionProps {
  data: RecruitmentStatistics | undefined;
}

const MatchingSection = ({ data }: MatchingSectionProps) => {
  return (
    <Matching>
      <div className="matching">
        <Circle color="mainGreen" />
        <label className="status">진행중</label>
        <label className="number">
          {data?.recruitmentProcessingCount}
          <span className="unit">건</span>
        </label>
      </div>

      <div className="matching">
        <Circle color="mainOrange" />
        <label className="status">최근 완료</label>
        <label className="number">
          {data?.recentlyCompletedCount}
          <span className="unit">건</span>
        </label>
      </div>

      <div className="matching">
        <Circle color="mainBlue" />
        <label className="status">전체 매칭</label>
        <label className="number">
          {data?.totalRecruitmentCompletedCount}
          <span className="unit">건</span>
        </label>
      </div>
    </Matching>
  );
};

export default MatchingSection;

const Matching = styled.div`
  display: flex;
  gap: 8px;

  .matching {
    width: 100%;
    padding: 20px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  .status {
    margin-bottom: 2px;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .number {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .unit {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Circle = styled.div<{ color: ColorKey }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, color }) => theme.colors[color]};
`;
