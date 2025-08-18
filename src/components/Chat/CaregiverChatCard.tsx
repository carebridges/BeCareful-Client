import styled from 'styled-components';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { CaregiverChatList } from '@/types/Caregiver/chat';
import { textTruncateFormat } from '@/utils/formatText';

interface ChatListCardProps {
  chat: CaregiverChatList;
}

const CaregiverChatCard = ({ chat }: ChatListCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <Container
      onClick={() => handleNavigate(`/caregiver/chat/${chat.matchingId}`)}
    >
      <img src={chat.nursingInstitutionProfileImageUrl} />
      <div className="left">
        <label className="institution">{chat.nursingInstitutionName}</label>
        <label className="recent">
          {textTruncateFormat(chat.recentChat, 30)}
        </label>
      </div>
      <div className="right">
        <label className="time">{chat.lastSendTime}</label>
        {chat.unreadCount > 0 && (
          <label className="unread">{chat.unreadCount}</label>
        )}
      </div>
    </Container>
  );
};

export default CaregiverChatCard;

const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    object-fit: cover;
  }

  .left {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 2px;
  }

  .institution {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .recent {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .time {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }

  .unread {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mainBlue};

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
