'use client';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalWrapper = styled.div`
  border-radius: 12px;
  position: relative;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 만약 isOpen이 false이면 null을 반환하여 모달을 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      {/* stopPropagation: 모달 내부 클릭해도 모달 닫히지 않도록 */}
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  );
};
