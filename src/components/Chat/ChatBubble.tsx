import { ChatResponse, SenderType } from '@/types/common/chat';
import { formatTimeLabel } from '@/utils/formatTime';
import styled from 'styled-components';
import ChatContract from './ChatContract';
import ChatGuide from './ChatGuide';

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
    <Container className={isMyChat ? 'right' : 'left'}>
      {isMyChat ? (
        <Content role={role}>
          {chat.chatType === 'TEXT' && <div>{chat.text}</div>}

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

          {chat.chatType === 'SYSTEM_INFO' && <ChatGuide guide={chat} />}
        </Content>
      ) : (
        <div className="bubble">
          <img className="profile" alt="프로필 이미지" src={profileImg} />
          <div className="center">
            <div className="name">
              {name}
              {role === 'SOCIAL_WORKER' && ' 요양보호사'}
            </div>
            <Content role={role}>
              {chat.chatType === 'TEXT' && <div>{chat.text}</div>}

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

              {chat.chatType === 'SYSTEM_INFO' && <ChatGuide guide={chat} />}
            </Content>
          </div>
        </div>
      )}
      <div className="time">
        {formatTimeLabel(chat.sentTime || new Date().toISOString())}
      </div>
    </Container>
  );
};

export default ChatBubble;

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;

  .left {
    justify-content: flex-start;
  }

  .right {
    justify-content: flex-end;
    flex-direction: row-reverse;
  }

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

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Content = styled.div<{ role: string }>`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 12px 0 12px 12px;
  background: ${({ theme, role }) =>
    role === 'CAREGIVER' ? theme.colors.mainBlue : theme.colors.white};
  color: ${({ theme, role }) =>
    role === 'CAREGIVER' ? theme.colors.white : theme.colors.gray900};
`;
