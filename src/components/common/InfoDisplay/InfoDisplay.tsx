import styled from 'styled-components';

export interface InfoItem {
  title: string;
  detail: React.ReactNode;
}

interface InfoDisplayProps {
  items: InfoItem[];
  gapRow?: string;
  gapColumn?: string;
  width?: string;
  isChat?: boolean;
}

const InfoDisplay = ({
  items,
  gapRow,
  gapColumn,
  width,
  isChat,
}: InfoDisplayProps) => {
  return (
    <Container row={gapRow} column={gapColumn} width={width} isChat={isChat}>
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

export default InfoDisplay;

const Container = styled.div<{
  row?: string;
  column?: string;
  width?: string;
  isChat?: boolean;
}>`
  display: flex;
  gap: ${({ row }) => row || '32px'};

  justify-content: ${({ isChat }) => (isChat ? 'space-between' : 'flex-start')};
  background: ${({ isChat, theme }) => (isChat ? theme.colors.gray50 : '')};
  padding: ${({ isChat }) => (isChat ? '12px' : '')};
  border-radius: ${({ isChat }) => (isChat ? '8px' : '')};

  .leftWrapper,
  .rightWrapper {
    display: flex;
    flex-direction: column;
    gap: ${({ column }) => column || '8px'};
  }

  .leftWrapper {
    width: ${({ width }) => width || 'auto'};
  }

  .rightWrapper {
    flex: 1;
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
