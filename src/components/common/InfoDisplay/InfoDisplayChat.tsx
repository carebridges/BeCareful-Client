import styled from 'styled-components';

interface InfoItem {
  title: string;
  detail: React.ReactNode;
}

interface InfoDisplayChatProps {
  items: InfoItem[];
  role: string;
}

const InfoDisplayChat = ({ items, role }: InfoDisplayChatProps) => {
  return (
    <Container role={role}>
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

const Container = styled.div<{ role: string }>`
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme, role }) =>
    role === 'CAREGIVER' ? theme.colors.white : theme.colors.gray50};
  display: flex;
  justify-content: space-between;

  .leftWrapper,
  .rightWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
