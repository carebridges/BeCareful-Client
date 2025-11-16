import { styled } from 'styled-components';
import { ReactComponent as Pencil } from '@/assets/icons/IconPencil.svg';
import { Link } from 'react-router-dom';

export const FloatingPostButton = () => {
  return (
    <ButtonContainer
      to="/socialworker/recruitment/new"
      onClick={() => window.scrollTo(0, 0)}
    >
      <ButtonWrapper>
        <Pencil />
        공고 등록
      </ButtonWrapper>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Link)`
  display: flex;
  position: fixed;
  bottom: 77px;
  right: 20px;
  z-index: 1000;
  text-decoration: none;
`;

const ButtonWrapper = styled.button`
  display: flex;
  gap: 8px;
  height: 46px;
  padding: 17px 16px;
  border-radius: 25px;

  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};

  &:active {
    transform: scale(0.98);
  }
`;
