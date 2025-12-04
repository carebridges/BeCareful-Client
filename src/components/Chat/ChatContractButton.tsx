import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import {
  AcceptContractChatRequest,
  ChatRequest,
  ConfirmContractChatRequest,
  SenderType,
} from '@/types/common/chat';
import { ChatRoomStatus } from '@/types/Caregiver/chat';
import Modal from '../common/Modal/Modal';
import ModalButtons from '../common/Modal/ModalButtons';

interface ChatContractButtonProps {
  role: SenderType;
  senderType: SenderType;
  status: ChatRoomStatus;
  lastContractChatId: number;
  chatRoomId: number;
  send: (chatRoomId: number, request: ChatRequest) => void;
  onLocalSystemMessage: (title: string, detail: string) => void;
}

const ChatContractButton = ({
  role,
  status,
  senderType,
  lastContractChatId,
  chatRoomId,
  send,
  onLocalSystemMessage,
}: ChatContractButtonProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleAccept = () => {
    const request: AcceptContractChatRequest = {
      sendRequestType: 'ACCEPT_CONTRACT',
      lastContractChatId,
    };
    send(chatRoomId, request);
    onLocalSystemMessage(
      '요양보호사님이 근무 조건에 동의했습니다.',
      role === 'CAREGIVER'
        ? '근무 계약 최종 채용 확정을 기다려 주세요.'
        : '근무 조건 확인 후\n최종 채용하기 버튼을 눌러주세요.',
    );
  };

  const handleConfirm = () => {
    const request: ConfirmContractChatRequest = {
      sendRequestType: 'CONFIRM_MATCHING',
      lastContractChatId,
    };
    send(chatRoomId, request);
    onLocalSystemMessage(
      '최종 채용이 확정되었습니다!',
      '김말숙 어르신을 위한 돌봄 일정이 추가되었습니다.\n이외의 문의사항은 채팅을 이용해주세요',
    );
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

  if (status === '채팅가능' && senderType === 'CAREGIVER') {
    return (
      <Container>
        <div className="ask">문의사항은 채팅을 이용해주세요.</div>
        <Button
          height="40px"
          variant="mainBlue"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          최종 채용 확정하기
        </Button>

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
    <Container>
      <div className="ask">문의사항은 채팅을 이용해주세요.</div>
      {role === 'CAREGIVER' ? (
        <Button
          height="40px"
          variant={status === '채팅가능' ? 'subBlue' : 'disabled'}
          disabled={status !== '채팅가능'}
          onClick={handleAccept}
        >
          근무 조건에 동의합니다
        </Button>
      ) : (
        <Button
          height="40px"
          variant={status === '채팅가능' ? 'subBlue' : 'disabled'}
          disabled={status !== '채팅가능'}
          /* onClick={handleEdit} */
        >
          근무 조건 수정하기
        </Button>
      )}
    </Container>
  );
};

export default ChatContractButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ask {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
