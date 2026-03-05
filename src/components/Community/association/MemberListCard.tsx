import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import {
  ASSOCIATION_RANK_MAP,
  INSTITUTION_RANK_MAP,
} from '@/constants/common/maps';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { AssociationMember } from '@/types/association';

interface MemberListCardProps {
  member: AssociationMember;
  onClick?: () => void;
}

const MemberListCard = ({ member, onClick }: MemberListCardProps) => {
  const { associationId } = useParams<{ associationId: string }>();

  const { handleNavigate } = useHandleNavigate();

  const memberInfo = [
    { title: '전화번호', detail: member.phoneNumber },
    { title: '기관명', detail: member.institutionName },
    {
      title: '직급',
      detail: INSTITUTION_RANK_MAP.EN_TO_KR[member.institutionRank],
    },
  ];

  return (
    <CardContainer
      onClick={
        onClick
          ? onClick
          : () =>
              handleNavigate(
                `/community/${associationId}/members/${member.memberId}`,
              )
      }
    >
      <Left>
        <div className="top">
          <label className="name">{member.name}</label>
          <label className="rank">
            {ASSOCIATION_RANK_MAP.EN_TO_KR[member.associationRank]}
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
