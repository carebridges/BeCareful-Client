import { styled } from 'styled-components';
import Lottie from 'lottie-react';
import emptyAnimation from '@/assets/lotties/empty.json';

interface ComingSoonModalProps {
  width: string;
}

export const ComingSoonModal = ({ width }: ComingSoonModalProps) => {
  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalMiddleContainer>
          <Lottie
            animationData={emptyAnimation}
            autoplay
            loop
            style={{ width: 60, height: 60 }}
          />
          <span>
            매칭하기 서비스가 준비 중입니다.
            <br />곧 만나보실 수 있어요!
          </span>
        </ModalMiddleContainer>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 57px;
  z-index: 1000;
`;

const ModalContent = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 12px;
  width: ${({ width }) => width};

  position: relative;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.25);
`;

const ModalMiddleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 20px 40px 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray700};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
