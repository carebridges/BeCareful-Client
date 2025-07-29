import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { ASSOCIATION_JOIN_RANKS_LABELS } from '@/constants/associationRank';
import { AssociationRank } from '@/types/CommunityAssociation';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useNavigate } from 'react-router-dom';

interface CommunityJoinSelectRoleProps {
  selectedRank: AssociationRank | null;
  setSelectedRank: (rank: AssociationRank) => void;
  onSubmit: () => void;
  onCancel: () => void;
  associationName: string;
}

export const CommunityJoinSelectRole = ({
  selectedRank,
  setSelectedRank,
  onSubmit,
  onCancel,
  associationName,
}: CommunityJoinSelectRoleProps) => {
  const navigate = useNavigate();
  return (
    <>
      <IconContainer>
        <IconArrowLeft onClick={() => navigate(-1)} />
      </IconContainer>
      <Wrapper>
        <HeaderSection>
          <Title>
            {associationName}의<br />
            회원 유형을 알려주세요.<span className="highlight"> *</span>
          </Title>
        </HeaderSection>

        <CardContainer>
          {Object.entries(ASSOCIATION_JOIN_RANKS_LABELS).map(
            ([value, label]) => (
              <CheckCard
                key={value}
                pressed={selectedRank === value}
                text={label}
                onClick={() => setSelectedRank(value as AssociationRank)}
              />
            ),
          )}
        </CardContainer>

        <ButtonContainer>
          <Button variant="blue2" height="52px" onClick={onCancel}>
            나가기
          </Button>
          <Button
            variant={selectedRank ? 'blue' : 'gray'}
            height="52px"
            onClick={onSubmit}
            disabled={!selectedRank}
          >
            가입 신청하기
          </Button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px 0 20px;
`;

const Title = styled.h1`
  height: 100%;
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 55px 20px;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;
