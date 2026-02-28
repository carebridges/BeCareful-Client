'use client';
import { styled } from 'styled-components';
import ModalClose from '../../assets/icons/signup/ModalClose.svg';
import { Button } from '../common';

interface UnblockConfirmModalProps {
  width: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const UnblockConfirmModal = ({
  width,
  onClose,
  onCancel,
  onConfirm,
}: UnblockConfirmModalProps) => {
  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalTopContainer>
          <ModalCloseButton onClick={onClose}>
            <ModalClose />
          </ModalCloseButton>
        </ModalTopContainer>
        <ModalMiddleContainer>
          <span>차단을 해제하시겠습니까?</span>
          <span className="highlight">
            이제 상대방의 게시글과 채팅을 다시 볼 수 있습니다.
          </span>
        </ModalMiddleContainer>
        <ModalBottomContainer>
          <Button variant="gray50" height="52px" onClick={onCancel}>
            취소
          </Button>
          <Button variant="mainOrange" height="52px" onClick={onConfirm}>
            해제하기
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
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

const ModalContent = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 12px;
  width: ${({ width }) => width};

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
    color: ${({ theme }) => theme.colors.mainOrange};
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
