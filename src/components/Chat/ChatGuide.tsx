import styled from 'styled-components';
import React from 'react';
import { SystemInfo } from '@/types/common/chat';

interface ChatGuideProps {
  guide: SystemInfo;
}

const ChatGuide = ({ guide }: ChatGuideProps) => {
  return (
    <Container>
      <div className="blue">{guide.title}</div>
      <div className="gray">
        {guide.detail.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export default ChatGuide;

const Container = styled.div`
  padding: 20px 0;
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
