import styled from 'styled-components';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { SocialworkerChatList } from '@/types/Socialworker/chat';
import { textTruncateFormat } from '@/utils/formatText';

interface ChatListCardProps {
  chat: SocialworkerChatList;
}

const SocialworkerChatCard = ({ chat }: ChatListCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <Container
      onClick={() => handleNavigate(`/socialworker/chat/${chat.matchingId}`)}
    >
      <img src={chat.caregiverInfo.profileImageUrl} />
      <div className="left">
        <label className="caregiver">
          {chat.caregiverInfo.name} 요양보호사
        </label>
        <label className="recent">
          {textTruncateFormat(chat.recentChat, 30)}
        </label>
        <div className="elderWrapper">
          <label className="elder">{chat.elderlyInfo.elderlyName} 어르신</label>
          <label className="elder">|</label>
          <label className="elder">{chat.elderlyInfo.elderlyAge}세</label>
          <label className="elder">|</label>
          <label className="elder">
            {GENDER_EN_TO_KR_2[chat.elderlyInfo.elderlyGender]}
          </label>
        </div>
      </div>
      <div className="right">
        <label className="time">{chat.time}</label>
        {/* {chat.unreadCount > 0 && (
          <label className="unread">{chat.unreadCount}</label>
        )} */}
      </div>
    </Container>
  );
};

export default SocialworkerChatCard;

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
  }

  .elder {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
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
