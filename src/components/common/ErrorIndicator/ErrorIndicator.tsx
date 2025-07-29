import styled from 'styled-components';
import Lottie from 'lottie-react';
import errorAnimation from '@/assets/lotties/error.json';

export const ErrorIndicator = () => {
  return (
    <Wrapper>
      <Lottie
        animationData={errorAnimation}
        loop={true}
        autoplay
        style={{ width: 80, height: 80 }}
      />
      <Message>오류가 발생했습니다</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
