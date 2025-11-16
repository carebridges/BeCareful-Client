import { ReactComponent as RoundPlus } from '@/assets/icons/IconRoundPlus.svg';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const NewElderRegistrationCard = () => {
  const navigate = useNavigate();
  return (
    <CardContainer
      onClick={() => {
        navigate('/socialworker/elderly/new');
        scrollTo(0, 0);
      }}
    >
      <Icon>
        <RoundPlus />
      </Icon>
      <Text>새 어르신 등록하기</Text>
      <Space />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);

  &:active {
    transform: scale(0.98);
  }
`;

const Icon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const Space = styled.div`
  width: 24px;
`;
