import { useState } from 'react';
import styled from 'styled-components';
import { CheckBox } from '@/components/common/CheckBox/CheckBox';
import { ReactComponent as ChevronUp } from '@/assets/icons/signup/ChevronUp.svg';
import { ReactComponent as ChevronDown } from '@/assets/icons/signup/ChevronDown.svg';

interface CaregiverAgreeItemProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  select: string;
  guide: string;
  content: React.ReactNode;
  onToggle: (expanded: boolean) => void;
}

export const CaregiverAgreeItem = ({
  id,
  checked,
  onChange,
  select,
  guide,
  content,
  onToggle,
}: CaregiverAgreeItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    onToggle(next);
  };

  return (
    <AgreeItemWrapper>
      <Top onClick={handleToggle}>
        <CheckBox
          id={id}
          checked={checked}
          onChange={onChange}
          label=""
          select={select}
          guide={guide}
          borderRadius=""
        />
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </Top>
      {expanded && <ContentBox>{content}</ContentBox>}
    </AgreeItemWrapper>
  );
};

const AgreeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
`;

const ContentBox = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};
  white-space: pre-line;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  max-height: 200px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;
