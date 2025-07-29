import styled from 'styled-components';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/loading.json';

export const LoadingIndicator = () => {
  return (
    <Wrapper>
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        style={{ width: 50, height: 50 }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
`;
