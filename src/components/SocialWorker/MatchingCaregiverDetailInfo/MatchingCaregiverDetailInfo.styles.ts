import { styled } from 'styled-components';

export const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

export const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

export const DetailContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: nowrap;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  .highlight {
    color: ${({ theme }) => theme.colors.gray500};
    min-width: 72px;
  }
  .point {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
