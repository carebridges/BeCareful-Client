import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { Association_Rank_Mapping } from '@/constants/associationRank';
import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import { Member } from '@/types/Community/association';

interface MemberListCardProps {
  member: Member;
}

const MemberListCard = ({ member }: MemberListCardProps) => {
  const { associationId } = useParams<{ associationId: string }>();

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
    scrollTo(0, 0);
  };

  const memberInfo = [
    { title: '전화번호', detail: member.phoneNumber },
    { title: '기관명', detail: member.institutionName },
    { title: '직급', detail: Institution_Rank_Mapping[member.institutionRank] },
  ];

  return (
    <CardContainer
      onClick={() =>
        handleNavigate(`/community/${associationId}/members/${member.memberId}`)
      }
    >
      <Left>
        <div className="top">
          <label className="name">{member.name}</label>
          <label className="rank">
            {Association_Rank_Mapping[member.associationRank]}
          </label>
        </div>
        <InfoDisplay items={memberInfo} gapRow="12px" gapColumn="5px" />
      </Left>
      <img src={member.institutionImageUrl} />
    </CardContainer>
  );
};

export default MemberListCard;

const CardContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .top {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .rank {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
