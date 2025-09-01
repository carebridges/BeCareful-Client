import styled from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { ASSOCIATION_RANK_EN_TO_KR } from '@/constants/common/associationRank';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { Application } from '@/types/Community/association';
import {
  useJoinRequestAccept,
  useJoinRequestReject,
} from '@/api/communityAssociation';

interface MemberRequestCardProps {
  request: Application;
}

const MemberRequestCard = ({ request }: MemberRequestCardProps) => {
  const memberInfo = [
    { title: '기관명', detail: request.institutionName },
    {
      title: '직급',
      detail: INSTITUTION_RANK_EN_TO_KR[request.institutionRank],
    },
  ];

  const { mutate: acceptRequest } = useJoinRequestAccept(
    request.joinApplicationId,
  );
  const { mutate: rejectRequest } = useJoinRequestReject(
    request.joinApplicationId,
  );

  return (
    <CardContainer>
      <Top>
        <Left>
          <div className="top">
            <label className="name">{request.name}</label>
            <label className="rank">
              {ASSOCIATION_RANK_EN_TO_KR[request.associationRank]}
            </label>
          </div>
          <InfoDisplay items={memberInfo} gapRow="12px" gapColumn="5px" />
        </Left>
        <img src={request.institutionImageUrl} alt="이미지" />
      </Top>

      <Buttons>
        <Button height="52px" variant="subBlue" onClick={() => rejectRequest()}>
          가입 반려하기
        </Button>
        <Button
          height="52px"
          variant="mainBlue"
          onClick={() => acceptRequest()}
        >
          가입 승인하기
        </Button>
      </Buttons>
    </CardContainer>
  );
};

export default MemberRequestCard;

const CardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

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

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;
