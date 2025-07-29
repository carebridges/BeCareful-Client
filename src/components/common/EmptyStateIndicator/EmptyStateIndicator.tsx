import styled from 'styled-components';
import Lottie from 'lottie-react';
import emptyAnimation from '@/assets/lotties/empty.json';

export const EmptyStateIndicator = ({ message }: { message: string }) => {
  return (
    <Wrapper>
      <Lottie
        animationData={emptyAnimation}
        autoplay
        loop
        style={{ width: 80, height: 80 }}
      />
      <Message>{message}</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
`;
