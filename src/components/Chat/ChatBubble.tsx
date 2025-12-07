import styled from 'styled-components';
import ChatContract from '@/components/Chat/ChatContract';
import ChatGuide from '@/components/Chat/ChatGuide';
import { formatTimeLabel } from '@/utils/formatTime';
import { ChatResponse, SenderType } from '@/types/common/chat';

interface ChatBubbleProps {
  chat: ChatResponse;
  isMyChat: boolean;
  profileImg?: string;
  name?: string;
  role: SenderType;
  children?: React.ReactNode;
  elderlyName?: string;
  caregiverName?: string;
  caregiverPhoneNumber?: string;
}

const ChatBubble = ({
  chat,
  isMyChat,
  profileImg,
  name,
  role,
  children,
  elderlyName,
  caregiverName,
  caregiverPhoneNumber,
}: ChatBubbleProps) => {
  return (
    <Container isMyChat={isMyChat}>
      {isMyChat ? (
        <>
          <Content sender={chat.senderType ?? ''} isMyChat={isMyChat}>
            {chat.chatType === 'TEXT' && (
              <div className="text">{chat.text}</div>
            )}

            {chat.chatType === 'CONTRACT' && (
              <ChatContract
                contract={chat}
                elderName={elderlyName ?? ''}
                caregiverName={caregiverName}
                caregiverPhoneNumber={caregiverPhoneNumber}
                role={role}
              />
            )}
            {children}

            {chat.chatType === 'SYSTEM_INFO' && (
              <ChatGuide title={chat.title} detail={chat.detail} />
            )}
          </Content>
          <div className="time">
            {formatTimeLabel(chat.sentTime || new Date().toISOString())}
          </div>
        </>
      ) : (
        <div className="bubble">
          <img className="profile" alt="프로필 이미지" src={profileImg} />
          <div className="center">
            <div className="name">
              {name}
              {role === 'SOCIAL_WORKER' && ' 요양보호사'}
            </div>
            <div className="chat">
              <Content sender={chat.senderType ?? ''} isMyChat={isMyChat}>
                {chat.chatType === 'TEXT' && (
                  <div className="text">{chat.text}</div>
                )}

                {chat.chatType === 'CONTRACT' && (
                  <ChatContract
                    contract={chat}
                    elderName={elderlyName ?? ''}
                    caregiverName={caregiverName}
                    caregiverPhoneNumber={caregiverPhoneNumber}
                    role={role}
                  />
                )}
                {children}

                {chat.chatType === 'SYSTEM_INFO' && (
                  <ChatGuide title={chat.title} detail={chat.detail} />
                )}
              </Content>
              <div className="time">
                {formatTimeLabel(chat.sentTime || new Date().toISOString())}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ChatBubble;

const Container = styled.div<{ isMyChat: boolean }>`
  display: flex;
  flex-direction: ${({ isMyChat }) => (isMyChat ? 'row-reverse' : '')};
  gap: 8px;
  align-items: flex-end;

  .time {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .bubble {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  .profile {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .center {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .chat {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Content = styled.div<{ sender: string; isMyChat: boolean }>`
  padding: 16px;
  border-radius: ${({ isMyChat }) =>
    isMyChat ? '12px 0 12px 12px' : '0 12px 12px 12px'};
  background: ${({ theme, sender }) =>
    sender === 'CAREGIVER' ? theme.colors.mainBlue : theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .text {
    max-width: 200px;
    color: ${({ theme, sender }) =>
      sender === 'CAREGIVER' ? theme.colors.white : theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  @media (min-width: 400px) {
    .text {
      max-width: 250px;
    }
  }

  @media (min-width: 768px) {
    .text {
      max-width: 280px;
    }
  }

  @media (min-width: 1024px) {
    .text {
      max-width: 320px;
    }
  }
`;
