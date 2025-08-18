import styled from 'styled-components';
import { ReactComponent as Point } from '@/assets/icons/Point.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

interface ProfileCardProps {
  profileImgURL: string;
  name: string;
  nickname?: string;
  point?: number;
  phoneNumber: string;
  age: number;
  gender: string;
  pointPagePath?: string;
}

const ProfileCard = ({
  profileImgURL,
  name,
  nickname,
  point,
  phoneNumber,
  age,
  gender,
}: ProfileCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <CardContainter>
      <img src={profileImgURL} alt={'프로필 이미지'} />

      <div className="right">
        <NameWrapper>
          <label className="name">{name}</label>
          {point && <label className="nickname">{nickname}</label>}
        </NameWrapper>

        {!point && <label className="nickname">{nickname}</label>}

        {point && (
          <PointWrapper onClick={() => handleNavigate('/socialworker/point')}>
            <Point />
            <label className="point">{point.toLocaleString('ko-KR')}P</label>
            <Chevron />
          </PointWrapper>
        )}

        <InfoWrapper>
          <label className="info">{phoneNumber}</label>
          <label className="info">·</label>
          <label className="info">만 {age}세</label>
          <label className="info">·</label>
          <label className="info">{gender}</label>
        </InfoWrapper>
      </div>
    </CardContainter>
  );
};

export default ProfileCard;

const CardContainter = styled.div`
  padding: 16px 0px;
  display: flex;
  gap: 12px;
  align-items: center;

  div {
    display: flex;
  }

  img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }

  .right {
    flex-direction: column;
    gap: 6px;
  }

  .nickname {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NameWrapper = styled.div`
  gap: 8px;

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const PointWrapper = styled.div`
  gap: 8px;
  align-items: center;
  cursor: pointer;

  .point {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    cursor: pointer;
  }
`;

const Chevron = styled(ChevronRight)`
  path {
    fill: ${({ theme }) => theme.colors.black};
    stroke: ${({ theme }) => theme.colors.black};
  }
`;

const InfoWrapper = styled.div`
  margin-top: 4px;
  gap: 4px;

  .info {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
