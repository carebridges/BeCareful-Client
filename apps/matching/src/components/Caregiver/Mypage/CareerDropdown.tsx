import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as IconPolygon5 } from '@repo/ui/src/assets/icons/IconPolygon5.svg';

interface CareerDropdownProps {
  title: string;
  contents: string[];
  selectedContents: string[];
  setSelectedContents: (selectedContents: string[]) => void;
}

export const CareerDropdown = ({
  title,
  contents,
  selectedContents,
  setSelectedContents,
}: CareerDropdownProps) => {
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

  const handleToggleDropdown = () => setOpen((prev) => !prev);

  const handleSelectContent = (content: string) => {
    setSelectedContents([content]);
  };

  const selectedLabel =
    selectedContents.length > 0 ? selectedContents[0] : title;

  return (
    <Dropdowns ref={selectContainerRef}>
      <DropdownHeader onClick={handleToggleDropdown}>
        <DropdownLabel>{selectedLabel}</DropdownLabel>
        <IconWrapper>
          <IconPolygon5 />
        </IconWrapper>
      </DropdownHeader>
      {open && (
        <DropdownExpandContent>
          {contents.map((content) => (
            <DropdownItem
              key={content}
              onClick={() => {
                handleSelectContent(content);
                setOpen(false);
              }}
              selected={selectedContents.includes(content)}
            >
              {content}
            </DropdownItem>
          ))}
        </DropdownExpandContent>
      )}
    </Dropdowns>
  );
};

const Dropdowns = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 4px;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  height: 52px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const DropdownLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;
`;

const DropdownExpandContent = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 100%;
  overflow: hidden;
`;

const DropdownItem = styled.button<{ selected: boolean }>`
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

const IconWrapper = styled.div<{ pressed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  path {
    fill: ${({ theme, pressed }) =>
      pressed ? theme.colors.mainBlue : theme.colors.gray900};
  }
`;
