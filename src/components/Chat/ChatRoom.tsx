import styled from 'styled-components';
import ChatBubble from '@/components/Chat/ChatBubble';
import ChatContractButton from '@/components/Chat/ChatContractButton';
import ChatGuide from '@/components/Chat/ChatGuide';
import { formatDateLabel, groupByDate } from '@/utils/formatTime';
import { ChatResponse, ChatRequest, SenderType } from '@/types/common/chat';
import { ChatRoomContractStatus, ChatRoomStatus } from '@/types/Caregiver/chat';

interface ChatRoomProps {
  chat: ChatResponse[];
  role: SenderType;
  lastContractChatId: number | null;
  chatRoomId: number;
  send: (chatRoomId: number, request: ChatRequest) => void;
  profileImg: string;
  name: string;
  elderlyName: string;
  caregiverName?: string;
  caregiverPhoneNumber?: string;
  chatRoomStatus: ChatRoomStatus;
  contractStatus: ChatRoomContractStatus;
  statusTitle: string;
  statusDetail: string;
}

const ChatRoom = ({
  chat,
  role,
  lastContractChatId,
  chatRoomId,
  send,
  profileImg,
  name,
  elderlyName,
  caregiverName,
  caregiverPhoneNumber,
  chatRoomStatus,
  contractStatus,
  statusTitle,
  statusDetail,
}: ChatRoomProps) => {
  const chatGroupByDate = groupByDate(chat);

  return (
    <Container
      top={chatRoomStatus !== '채팅가능' || contractStatus === '채용완료'}
    >
      {Object.keys(chatGroupByDate).map((date) => (
        <ChatWrapper key={date}>
          <div className="date">{formatDateLabel(date)}</div>
          {chatGroupByDate[date].map((chat, index) => {
            return (
              <ChatBubble
                key={index}
                chat={chat}
                isMyChat={chat.senderType === role}
                profileImg={profileImg}
                name={name}
                role={role}
                elderlyName={elderlyName}
                caregiverName={caregiverName}
                caregiverPhoneNumber={caregiverPhoneNumber}
              >
                {chat.chatType === 'CONTRACT' &&
                  lastContractChatId === chat.chatId && (
                    <ChatContractButton
                      role={role}
                      chat={chat}
                      chatRoomStatus={chatRoomStatus}
                      contractStatus={contractStatus}
                      senderType={chat.senderType}
                      lastContractChatId={lastContractChatId}
                      chatRoomId={chatRoomId}
                      send={send}
                    />
                  )}
              </ChatBubble>
            );
          })}
          {(contractStatus === '채용완료' || chatRoomStatus !== '채팅가능') && (
            <ChatGuide title={statusTitle} detail={statusDetail} />
          )}
        </ChatWrapper>
      ))}
    </Container>
  );
};

export default ChatRoom;

const Container = styled.div<{ top: boolean }>`
  padding: 20px 20px 84px 20px;
  padding-top: ${({ top }) => (top ? '188px' : '124px')};
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .date {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
