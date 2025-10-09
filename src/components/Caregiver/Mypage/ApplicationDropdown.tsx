import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as IconPolygon6 } from '@/assets/icons/IconPolygon6.svg';

interface SmallDropdownProps {
  title: string;
  contents: string[];
  selectedContents: string[];
  setSelectedContents: (selectedContents: string[]) => void;
  pressed?: boolean;
}

export const ApplicationDropdown = ({
  title,
  contents,
  selectedContents,
  setSelectedContents,
  pressed = false,
}: SmallDropdownProps) => {
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

  const handleToggleSmallDropdown = () => setOpen((prev) => !prev);

  const handleSelectContent = (content: string) => {
    setSelectedContents([content]);
  };

  const selectedLabel =
    selectedContents.length > 0 ? selectedContents[0] : title;

  return (
    <SmallDropdowns ref={selectContainerRef}>
      <SmallDropdownHeader
        onClick={handleToggleSmallDropdown}
        pressed={pressed}
      >
        <SmallDropdownLabel pressed={pressed}>
          {selectedLabel}
        </SmallDropdownLabel>
        <IconWrapper pressed={pressed}>
          <IconPolygon6 />
        </IconWrapper>
      </SmallDropdownHeader>
      {open && (
        <SmallDropdownExpandContent>
          {contents.map((content) => (
            <SmallDropdownItem
              key={content}
              onClick={() => {
                handleSelectContent(content);
                setOpen(false);
              }}
              selected={selectedContents.includes(content)}
            >
              {content}
            </SmallDropdownItem>
          ))}
        </SmallDropdownExpandContent>
      )}
    </SmallDropdowns>
  );
};

const SmallDropdowns = styled.div`
  width: 22.5%;
  min-width: 60px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 4px;
`;

const SmallDropdownHeader = styled.div<{ pressed?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border-radius: 12px;
  border: 1px solid
    ${({ theme, pressed }) =>
      pressed ? theme.colors.white : theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const SmallDropdownLabel = styled.div<{ pressed?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, pressed }) =>
    pressed ? theme.colors.mainBlue : theme.colors.gray900};
`;

const SmallDropdownExpandContent = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 2;

  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  border-radius: 8px;

  overflow: hidden;
`;

const SmallDropdownItem = styled.button<{ selected: boolean }>`
  height: 48px;
  padding: 16px;
  display: flex;
  justify-content: center;

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

const IconWrapper = styled.div<{ pressed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  path {
    fill: ${({ theme, pressed }) =>
      pressed ? theme.colors.mainBlue : theme.colors.gray900};
  }
`;
