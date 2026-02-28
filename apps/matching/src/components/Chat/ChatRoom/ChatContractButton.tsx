import styled from 'styled-components';
import { useState } from 'react';
import {
  AcceptContractRequest,
  ChatResponse,
  ChatRoomContractStatus,
  ChatRoomStatus,
  ConfirmContractRequest,
} from '@/types/chat';
import { handleModal } from '@/utils/handleModal';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useChat } from '@/hooks/useChat';
import { UserRole } from '@repo/common';
import { Button, Modal, ModalButtons, ModalLimit } from '@repo/ui';

interface ChatContractButtonProps {
  role: UserRole;
  chat: ChatResponse;
  senderType: UserRole;
  chatRoomStatus: ChatRoomStatus;
  contractStatus: ChatRoomContractStatus;
  lastContractChatId: number;
  chatRoomId: number;
}

const ChatContractButton = ({
  role,
  chat,
  chatRoomStatus,
  contractStatus,
  senderType,
  lastContractChatId,
  chatRoomId,
}: ChatContractButtonProps) => {
  const { handleNavigateState } = useHandleNavigate();
  const { send } = useChat({ chatRoomId });

  // 사회복지사 최종 채용 확정
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirm = () => {
    const request: ConfirmContractRequest = {
      sendRequestType: 'CONFIRM_MATCHING',
      lastContractChatId,
    };
    send(chatRoomId, request);
    setIsConfirmModalOpen(false);
  };

  // 요양보호사 근무 조건 동의
  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleAccept = () => {
    const request: AcceptContractRequest = {
      sendRequestType: 'ACCEPT_CONTRACT',
      lastContractChatId,
    };
    send(chatRoomId, request);
    handleModal(setIsCompleteModalOpen, setIsAgreeModalOpen);
  };

  if (contractStatus === '근무조건동의') {
    return (
      <Container sender={senderType}>
        <div className="ask">문의사항은 채팅을 이용해주세요.</div>
        {role === 'SOCIAL_WORKER' && senderType === 'CAREGIVER' && (
          <Button
            height="40px"
            variant={chatRoomStatus === '채팅가능' ? 'subBlue' : 'disabled'}
            onClick={() => setIsConfirmModalOpen(true)}
          >
            최종 채용 확정하기
          </Button>
        )}

        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
        >
          <ModalButtons
            onClose={() => setIsConfirmModalOpen(false)}
            title="최종 채용을 확정하시겠습니까?"
            detail="최종 채용시 요양보호사에게 근무 확정 알림이 가요."
            left="취소"
            right="최종 채용하기"
            handleLeftBtnClick={() => setIsConfirmModalOpen(false)}
            handleRightBtnClick={handleConfirm}
          />
        </Modal>
      </Container>
    );
  }

  return (
    <Container sender={senderType}>
      <div className="ask">문의사항은 채팅을 이용해주세요.</div>
      {contractStatus !== '채용완료' &&
        (role === 'CAREGIVER' ? (
          <Button
            height="40px"
            variant={chatRoomStatus === '채팅가능' ? 'subBlue' : 'disabled'}
            disabled={chatRoomStatus !== '채팅가능'}
            onClick={() => setIsAgreeModalOpen(true)}
          >
            근무 조건에 동의합니다
          </Button>
        ) : (
          <Button
            height="40px"
            variant={chatRoomStatus === '채팅가능' ? 'subBlue' : 'disabled'}
            disabled={chatRoomStatus !== '채팅가능'}
            onClick={() =>
              handleNavigateState(`edit`, {
                state: { chat },
              })
            }
          >
            근무 조건 수정하기
          </Button>
        ))}

      <Modal
        isOpen={isAgreeModalOpen}
        onClose={() => setIsAgreeModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsAgreeModalOpen(false)}
          title="근무 조건에 동의하시겠습니까?"
          detail={
            '근무 조건 동의시 더이상 조율이 불가능하며,\n기관 담당자에게 근무 확정 요청 알림이 가요.'
          }
          left="취소"
          right="동의하기"
          handleLeftBtnClick={() => setIsAgreeModalOpen(false)}
          handleRightBtnClick={handleAccept}
        />
      </Modal>

      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      >
        <ModalLimit
          onClose={() => setIsCompleteModalOpen(false)}
          title="근무 조건에 동의하셨습니다!"
          detail={
            '기관 담당자에게 근무 확정 알림을 전송했어요.\n최종 채용 확정을 기다려 주세요.'
          }
          button="채팅방으로 이동하기"
          handleBtnClick={() => setIsCompleteModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default ChatContractButton;

const Container = styled.div<{ sender: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ask {
    text-align: center;
    color: ${({ theme, sender }) =>
      sender === 'CAREGIVER' ? theme.colors.white : theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
