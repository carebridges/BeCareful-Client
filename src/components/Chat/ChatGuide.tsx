import styled from 'styled-components';

interface ChatGuideProps {
  title: string;
  detail: string;
  top?: boolean;
}

const ChatGuide = ({ title, detail, top = false }: ChatGuideProps) => {
  return (
    <Container top={top}>
      <div className="blue">{title}</div>
      <div className="gray">{detail}</div>
    </Container>
  );
};

export default ChatGuide;

const Container = styled.div<{ top: boolean }>`
  padding: ${({ top }) => (top ? '10px 0' : '20px 0')};
  display: flex;
  flex-direction: column;
  gap: 8px;

  text-align: center;

  .blue {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .gray {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
