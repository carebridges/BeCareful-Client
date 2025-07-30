import styled from 'styled-components';
import { ReactComponent as KakaoIcon } from '@/assets/icons/onboarding/Kakao.svg';

export const KakaoButton = () => {
  const handleClick = () => {
    const redirectUri = encodeURIComponent(window.location.origin);
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    window.location.href = `${baseUrl}/oauth2/authorization/kakao?redirectUri=${redirectUri}`;
  };

  return (
    <KakaoContainer onClick={handleClick}>
      <KakaoIcon />
      <ButtonText>카카오로 시작하기</ButtonText>
    </KakaoContainer>
  );
};

const KakaoContainer = styled.button`
  display: flex;
  width: 100%;
  height: 52px;

  padding: 17px 16px;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  background: var(--kakao, #fee500);
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  &:active {
    transform: scale(0.99);
  }
`;

const ButtonText = styled.span`
  margin: 0 auto;
`;
