import styled from 'styled-components';
import { GENDER_EN_TO_KR_1 } from '@/constants/common/gender';
import { MatchingElderlyList } from '@/types/Socialworker/home';
import { Button } from '@/components/common/Button/Button';

interface ElderSectionProps {
  data: MatchingElderlyList[] | undefined;
}

const ElderSection = ({ data }: ElderSectionProps) => {
  if (!data || data.length === 0) {
    return (
      <Elder>
        <div className="none">
          <label className="title">매칭 진행 중인 어르신이 없습니다.</label>
          <label className="detail">
            현재 진행 중인 내역이 없습니다. 매칭을 기다려주세요.
          </label>
        </div>
      </Elder>
    );
  }

  return (
    <Elder>
      {data?.slice(0, 3).map((elderly, index) => (
        <div className="elder" key={index}>
          <InfoWrapper>
            <img
              src={elderly.elderlyDetail.elderlyProfileImageUrl}
              alt={`${elderly.elderlyDetail.elderlyName} 어르신 프로필`}
            />
            <div className="right">
              <label className="name">
                {elderly.elderlyDetail.elderlyName}
              </label>
              <div className="bottom">
                <label className="info">
                  만 {elderly.elderlyDetail.elderlyAge}세
                </label>
                <label className="info">·</label>
                <label className="info">
                  {GENDER_EN_TO_KR_1[elderly.elderlyDetail.elderlyGender]}
                </label>
                <label className="info">·</label>
                <label className="info">
                  공고 {elderly.recruitmentCount}개
                </label>
              </div>
            </div>
          </InfoWrapper>
          <Button
            width="50px"
            height="32px"
            variant="subBlue"
            // onClick={() => handleNavigate()}
          >
            관리
          </Button>
        </div>
      ))}
    </Elder>
  );
};

export default ElderSection;

const Elder = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);

  .elder {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

    &:last-child {
      padding-bottom: 0px;
      border-bottom: none;
    }
  }

  .none {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .bottom {
    display: flex;
    gap: 4px;
  }

  .info {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
