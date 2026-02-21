import styled from 'styled-components';
import { GENDER_MAP } from '@/constants/common/maps';
import { SocialworkerChatList } from '@/types/Socialworker/chat';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { formatTextTruncate } from '@/utils/format/text';

interface ChatListCardProps {
  chat: SocialworkerChatList;
}

const ChatListCardSocialworker = ({ chat }: ChatListCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <Container
      onClick={() => handleNavigate(`/socialworker/chat/${chat.chatRoomId}`)}
    >
      <img src={chat.caregiverProfileImageUrl} />
      <div className="left">
        <label className="caregiver">{chat.caregiverName} 요양보호사</label>
        <label className="recent">
          {formatTextTruncate(chat.recentChat, 30)}
        </label>
        <div className="elderWrapper">
          <label className="elder">{chat.elderlyName} 어르신</label>
          <span className="border">|</span>
          <label className="elder">{chat.elderlyAge}세</label>
          <span className="border">|</span>
          <label className="elder">
            {GENDER_MAP.EN_TO_KR_FULL[chat.elderlyGender]}
          </label>
        </div>
      </div>
      <div className="right">
        <label className="time">{chat.lastSendTime}</label>
        {chat.unreadCount > 0 && (
          <label className="unread">{chat.unreadCount}</label>
        )}
        {chat.isContractAccepted && <label className="accept">승인중</label>}
      </div>
    </Container>
  );
};

export default ChatListCardSocialworker;

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

  .caregiver {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .elderWrapper {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .elder {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }

  .border {
    color: ${({ theme }) => theme.colors.gray50};
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

  .accept {
    color: ${({ theme }) => theme.colors.mainGreen};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
