import styled from 'styled-components';

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
          <label className="nickname">{nickname}</label>
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

  .nickname {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
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
