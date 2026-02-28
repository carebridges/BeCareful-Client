'use client';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import IconPolygon6 from '../../../assets/icons/IconPolygon6.svg';

interface MiddleDropdownProps {
  title: string;
  contents: string[];
  selectedContents: string[];
  setSelectedContents: (selectedContents: string[]) => void;
}

export const MiddleDropdown = ({
  title,
  contents,
  selectedContents,
  setSelectedContents,
}: MiddleDropdownProps) => {
  const [open, setOpen] = useState(false);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  const outsideClickHandler = (e: MouseEvent) => {
    if (
      selectContainerRef.current &&
      !selectContainerRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler);
    return () => document.removeEventListener('click', outsideClickHandler);
  }, []);

  const handleToggleMiddleDropdown = () => setOpen((prev) => !prev);

  const handleSelectContent = (content: string) => {
    setSelectedContents([content]);
  };

  const selectedLabel =
    selectedContents.length > 0 ? selectedContents[0] : title;

  return (
    <MiddleDropdowns ref={selectContainerRef}>
      <MiddleDropdownHeader onClick={handleToggleMiddleDropdown}>
        <MiddleDropdownLabel>{selectedLabel}</MiddleDropdownLabel>
        <IconWrapper>
          <IconPolygon6 />
        </IconWrapper>
      </MiddleDropdownHeader>
      {open && (
        <MiddleDropdownExpandContent>
          {contents.map((content) => (
            <MiddleDropdownItem
              key={content}
              onClick={() => {
                handleSelectContent(content);
                setOpen(false);
              }}
              selected={selectedContents.includes(content)}
            >
              {content}
            </MiddleDropdownItem>
          ))}
        </MiddleDropdownExpandContent>
      )}
    </MiddleDropdowns>
  );
};

const MiddleDropdowns = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 4px;
`;

const MiddleDropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6.2px;

  width: 70px;
  height: 46px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const MiddleDropdownLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const MiddleDropdownExpandContent = styled.div`
  position: absolute;
  top: 52px;
  left: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  box-sizing: border-box;
  border-radius: 8px;

  width: 90px;
  overflow: hidden;
`;

const MiddleDropdownItem = styled.button<{ selected: boolean }>`
  display: flex;
  padding: 16px;
  height: 48px;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.mainBlue : theme.colors.gray900};

  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  path {
    fill: ${({ theme }) => theme.colors.gray900};
  }
`;
