'use client';

import { styled } from 'styled-components';
import ModalClose from '@repo/ui/src/assets/icons/signup/ModalClose.svg';
import { Button } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useNavigate, useLocation } from 'react-router-dom';

interface CommunityJoinRequestModalProps {
  width: string;
  associationName: string;
  associationId: number;
  onClose: () => void;
}

export const CommunityJoinRequestModal = ({
  width,
  associationName,
  associationId,
  onClose,
}: CommunityJoinRequestModalProps) => {
  const navigate = useNavigate();
  const router = useRouter();

  const handleCancel = () => {
    router.back();
    router.back();
  };

  // TODO : navigate 관련
  const handleApply = () => {
    navigate(`/community/join/${associationId}/role`, {
      state: { associationName },
    });
  };

  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalTopContainer>
          <ModalCloseButton onClick={onClose}>
            <ModalClose />
          </ModalCloseButton>
        </ModalTopContainer>
        <ModalMiddleContainer>
          <span>
            ‘{associationName}’
            <br />
            커뮤니티에 가입하시겠습니까?
          </span>
          <span className="highlight">
            아래 '가입하기'를 누르면 가입 신청이 가능해요.
          </span>
        </ModalMiddleContainer>
        <ModalBottomContainer>
          <Button variant="blue2" height="52px" onClick={handleCancel}>
            나가기
          </Button>

          <Button variant="blue" height="52px" onClick={handleApply}>
            가입하기
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
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
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
