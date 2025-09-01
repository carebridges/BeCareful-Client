import styled from 'styled-components';
import { ReactComponent as Caregiver } from '@/assets/icons/socialworker/home/Caregiver.svg';
import { ReactComponent as Applicant } from '@/assets/icons/socialworker/home/Applicant.svg';
import { ReactComponent as ApplyRate } from '@/assets/icons/socialworker/home/ApplyRate.svg';
import { ApplicationStatistics } from '@/types/Socialworker/home';

interface ApplySectionProps {
  data: ApplicationStatistics | undefined;
}

const ApplySection = ({ data }: ApplySectionProps) => {
  return (
    <Apply>
      <div className="apply">
        <div className="left">
          <label className="apply-title">현재 지원한 요양보호사</label>
          <label className="number">
            {data?.averageAppliedCaregiver}
            <span className="unit">명</span>
          </label>
        </div>
        <Caregiver />
      </div>

      <div className="bottom">
        <div className="apply">
          <div className="left">
            <label className="apply-title">
              평균
              <br />
              지원자
            </label>
            <label className="number">
              {data?.appliedCaregiverCount}
              <span className="unit">명</span>
            </label>
          </div>
          <Applicant />
        </div>

        <div className="apply">
          <div className="left">
            <label className="apply-title">
              평균
              <br />
              지원률
            </label>
            <label className="number">
              {data?.averageApplyingRate}
              <span className="unit">%</span>
            </label>
          </div>
          <ApplyRate />
        </div>
      </div>
    </Apply>
  );
};

export default ApplySection;

const Apply = styled.div`
  flex-direction: column;
  gap: 8px;

  .bottom {
    gap: 10px;
    justify-content: space-between;
  }

  .apply {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 16px;
    gap: 10px;
    justify-content: space-between;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  .left {
    flex-direction: column;
    gap: 10px;
  }
`;
