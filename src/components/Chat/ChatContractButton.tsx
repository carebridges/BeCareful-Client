import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { ChatRoomContractStatus, ChatRoomStatus } from '@/types/Caregiver/chat';
import {
  AcceptContractChatRequest,
  ChatRequest,
  ConfirmContractChatRequest,
  SenderType,
} from '@/types/common/chat';
import { handleModal } from '@/utils/handleModal';

interface ChatContractButtonProps {
  role: SenderType;
  senderType: SenderType;
  chatRoomStatus: ChatRoomStatus;
  contractStatus: ChatRoomContractStatus;
  lastContractChatId: number;
  chatRoomId: number;
  send: (chatRoomId: number, request: ChatRequest) => void;
}

const ChatContractButton = ({
  role,
  chatRoomStatus,
  contractStatus,
  senderType,
  lastContractChatId,
  chatRoomId,
  send,
}: ChatContractButtonProps) => {
  // 사회복지사 최종 채용 확정
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirm = () => {
    const request: ConfirmContractChatRequest = {
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
    const request: AcceptContractChatRequest = {
      sendRequestType: 'ACCEPT_CONTRACT',
      lastContractChatId,
    };
    send(chatRoomId, request);
    handleModal(setIsCompleteModalOpen, setIsAgreeModalOpen);
  };

  //   const handleEdit = () => {
  //     const request: EditContractChatRequest = {
  //       sendRequestType: 'EDIT_CONTRACT',
  //       workDays: ['MONDAY', 'TUESDAY'],
  //       workStartTime: '09:00',
  //       workEndTime: '18:00',
  //       workSalaryUnitType: 'HOURLY',
  //       workSalaryAmount: 32000,
  //       workStartDate: '2025-12-01',
  //       careTypes: ['BATH', 'MEAL'],
  //     };
  //     send(request);
  //     // onLocalSystemMessage('기관에서 근무 조건을 수정했습니다.', userRole==="CAREGIVER"?"근무 조건 확인 후 동의 버튼을 눌러주세요.":"조율 요청이 들어오면 수정 버튼을 눌러 내용을 반영해 주세요.");
  //   };

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
      {role === 'CAREGIVER' ? (
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
          /* onClick={handleEdit} */
        >
          근무 조건 수정하기
        </Button>
      )}

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
