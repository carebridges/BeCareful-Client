import { ChatResponse, ChatRequest, SenderType } from '@/types/common/chat';
import { formatDateLabel, groupByDate } from '@/utils/formatTime';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import ChatContractButton from './ChatContractButton';
import { ChatRoomStatus } from '@/types/Caregiver/chat';

interface ChatRoomProps {
  chat: ChatResponse[];
  role: SenderType;
  lastContractChatId: number | null;
  chatRoomId: number;
  send: (chatRoomId: number, request: ChatRequest) => void;
  onLocalSystemMessage: (title: string, detail: string) => void;
  profileImg: string;
  name: string;
  elderlyName: string;
  caregiverName?: string;
  caregiverPhoneNumber?: string;
  status: ChatRoomStatus;
}

const ChatRoom = ({
  chat,
  role,
  lastContractChatId,
  chatRoomId,
  send,
  onLocalSystemMessage,
  profileImg,
  name,
  elderlyName,
  caregiverName,
  caregiverPhoneNumber,
  status,
}: ChatRoomProps) => {
  const chatGroupByDate = groupByDate(chat);

  return (
    <Container>
      {Object.keys(chatGroupByDate).map((date) => (
        <ChatWrapper key={date}>
          <div className="date">{formatDateLabel(date)}</div>
          {chatGroupByDate[date].map((chat) => {
            return (
              <ChatBubble
                key={chat.sentTime}
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
                      status={status}
                      senderType={chat.senderType}
                      lastContractChatId={lastContractChatId}
                      chatRoomId={chatRoomId}
                      send={send}
                      onLocalSystemMessage={onLocalSystemMessage}
                    />
                  )}
              </ChatBubble>
            );
          })}
        </ChatWrapper>
      ))}
    </Container>
  );
};

export default ChatRoom;

const Container = styled.div`
  padding: 20px 20px 84px 20px;
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
