import { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  tabs: { name: string; content: React.ReactNode }[];
  currentTab?: number;
  onTabChange?: (index: number) => void;
}

export const Tab = ({ tabs, currentTab, onTabChange }: TabProps) => {
  const [internalTab, setInternalTab] = useState(0);

  const isControlled = currentTab !== undefined && onTabChange !== undefined;
  const selectedTab = isControlled ? currentTab : internalTab;

  const selectTabHandler = (index: number) => {
    if (isControlled) {
      onTabChange(index);
    } else {
      setInternalTab(index);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <TabContainer>
        <TabItems>
          {tabs.map((item, index) => (
            <TabItem
              key={index}
              className={index === selectedTab ? 'active' : ''}
              onClick={() => selectTabHandler(index)}
            >
              <TabText className={index === selectedTab ? 'active' : ''}>
                {item.name}
              </TabText>
            </TabItem>
          ))}
        </TabItems>
      </TabContainer>
      <TabContent>{tabs[selectedTab].content}</TabContent>
    </div>
  );
};

const TabContainer = styled.div`
  display: flex;
  padding: 6px;
  box-sizing: border-box;

  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
`;

const TabItems = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  gap: 4px;
`;

const TabItem = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100%;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 6px;

  &.active {
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  }
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
`;

const TabText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &.active {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  &:not(.active) {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const TabContent = styled.div`
  margin-top: 16px;
`;
