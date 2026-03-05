import styled from 'styled-components';
import { UserRole } from '@/types/common';

interface InfoItem {
  title: string;
  detail: React.ReactNode;
}

interface InfoDisplayChatProps {
  items: InfoItem[];
  sender: UserRole;
}

const InfoDisplayChat = ({ items, sender }: InfoDisplayChatProps) => {
  return (
    <Container sender={sender}>
      <div className="leftWrapper">
        {items.map((item) => (
          <div key={item.title} className="info-title">
            {item.title}
          </div>
        ))}
      </div>
      <div className="rightWrapper">
        {items.map((item) => (
          <div key={item.title} className="info-detail">
            {item.detail}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default InfoDisplayChat;

const Container = styled.div<{ sender: string }>`
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme, sender }) =>
    sender === 'CAREGIVER' ? theme.colors.white : theme.colors.gray50};
  display: flex;
  white-space: nowrap;

  .leftWrapper,
  .rightWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .leftWrapper {
    width: 64px;
  }

  .rightWrapper {
    align-items: flex-end;
  }

  .info-title {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .info-detail {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
