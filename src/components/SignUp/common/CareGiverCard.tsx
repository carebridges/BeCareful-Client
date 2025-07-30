import { styled } from 'styled-components';
import { ReactComponent as RedHeart } from '@/assets/icons/signup/RedHeart.svg';

interface CareGiverCardProps {
  pressed: boolean;
}

export const CareGiverCard = ({ pressed }: CareGiverCardProps) => {
  return (
    <RoleCardWrapper>
      <RoleCardContainer $pressed={pressed}>
        <IconContainer>
          <RedHeart />
        </IconContainer>

        <RoleCardText>
          <RoleCardHeader>
            <span className="highlight">요양보호사</span> <span>로 가입</span>
          </RoleCardHeader>

          <span>어르신을 직접 케어하고 돌봄 서비스를 제공합니다.</span>
        </RoleCardText>
      </RoleCardContainer>
    </RoleCardWrapper>
  );
};

const RoleCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RoleCardContainer = styled.div<{ $pressed: boolean }>`
  will-change: background-color, border;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 16px;

  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  background-color: ${({ theme, $pressed }) =>
    $pressed ? '#fff7f6' : theme.colors.white};
  border: 2px solid
    ${({ theme, $pressed }) =>
      $pressed ? theme.colors.mainOrange : theme.colors.gray50};

  transition:
    background-color 0.3s ease,
    border 0.3s ease;
`;

const RoleCardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  word-wrap: break-word;

  span:last-child {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const RoleCardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  .highlight {
    color: ${({ theme }) => theme.colors.mainOrange};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const IconContainer = styled.div`
  display: flex;
  margin-right: 16px;
`;
