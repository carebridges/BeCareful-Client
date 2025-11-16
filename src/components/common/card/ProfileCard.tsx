import styled from 'styled-components';
import { ReactComponent as ChevronIcon } from '@/assets/icons/ChevronRightProfile.svg';

interface ProfileCardProps {
  profileImgURL: string;
  name: string;
  nickname?: string;
  chevronClick?: () => void;
  phoneNumber: string;
  age: number;
  gender: string;
}

const ProfileCard = ({
  profileImgURL,
  name,
  nickname,
  chevronClick,
  phoneNumber,
  age,
  gender,
}: ProfileCardProps) => {
  return (
    <CardContainter>
      <img src={profileImgURL} alt={'프로필 이미지'} />

      <div className="right">
        <NameWrapper>
          <label className="name">{name}</label>
          {nickname && <label className="nickname">{nickname}</label>}
          {chevronClick && <Chevron onClick={chevronClick} />}
        </NameWrapper>

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

  img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .nickname {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Chevron = styled(ChevronIcon)`
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 4px;

  .info {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
