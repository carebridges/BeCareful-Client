import styled from 'styled-components';
import ChatBubble from '@/components/Chat/ChatRoom/ChatBubble';
import ChatContractButton from '@/components/Chat/ChatRoom/ChatContractButton';
import ChatGuide from '@/components/Chat/ChatRoom/ChatGuide';
import {
  ChatResponse,
  ChatRoomContractStatus,
  ChatRoomStatus,
  OtherUserProfile,
  StatusMessage,
} from '@/types/chat';
import { UserRole } from '@/types/common';
import { formatDateLabel, groupByDate } from '@/utils/format/date';

interface ChatRoomProps {
  chat: ChatResponse[];
  role: UserRole;
  lastContractChatId: number | null;
  chatRoomId: number;
  other: OtherUserProfile;
  chatRoomStatus: ChatRoomStatus;
  contractStatus: ChatRoomContractStatus;
  status: StatusMessage;
}

const ChatRoom = ({
  chat,
  role,
  lastContractChatId,
  chatRoomId,
  other,
  chatRoomStatus,
  contractStatus,
  status,
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
                other={other}
                role={role}
                chatRoomId={chatRoomId}
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
                    />
                  )}
              </ChatBubble>
            );
          })}
        </ChatWrapper>
      ))}
      {(contractStatus === '채용완료' || chatRoomStatus !== '채팅가능') && (
        <ChatGuide title={status.title} detail={status.detail} />
      )}
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
