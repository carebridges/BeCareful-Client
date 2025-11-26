import { styled } from 'styled-components';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { Button } from '@/components/common/Button/Button';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useState, useEffect } from 'react';

const MODAL_WIDTH = '312px';

export const NetworkGuardModal = () => {
  const { isOnline, refreshStatus } = useNetworkStatus();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setDismissed(false);
    }
  }, [isOnline]);

  if (isOnline || dismissed) return null;

  const handleClose = () => {
    setDismissed(true);
  };

  const handleRetry = () => {
    refreshStatus();
  };

  return (
    <Overlay>
      <ModalContent $width={MODAL_WIDTH}>
        <ModalTopContainer>
          <ModalCloseButton aria-label="닫기" onClick={handleClose}>
            <ModalClose />
          </ModalCloseButton>
        </ModalTopContainer>
        <ModalMiddleContainer>
          <span>인터넷 연결을 확인하세요.</span>
          <span className="highlight">
            스마트폰의 네트워크 연결 상태를 확인하신 후 다시 시도해주세요.
          </span>
        </ModalMiddleContainer>
        <ModalBottomContainer>
          <Button onClick={handleClose} height="52px" variant="blue2">
            종료
          </Button>
          <Button onClick={handleRetry} height="52px" variant="blue">
            다시 시도
          </Button>
        </ModalBottomContainer>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgb(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 1000;
`;

const ModalContent = styled.div<{ $width: string }>`
  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 12px;
  width: ${({ $width }) => $width};

  margin-bottom: 28px;
  position: relative;
`;

const ModalTopContainer = styled.div`
  display: flex;
  padding: 16px 20px;
  justify-content: flex-end;
  align-items: center;
`;

const ModalMiddleContainer = styled.div`
  display: flex;
  padding: 0px 20px 8px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ModalBottomContainer = styled.div`
  display: flex;
  padding: 16px 20px 20px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ModalCloseButton = styled.div`
  cursor: pointer;
`;
