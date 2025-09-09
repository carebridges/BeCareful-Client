import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface TimeDropdownProps {
  width: string;
  value: string;
  onChange: (e: string) => void;
}

export const TimeDropdown = ({
  width,
  value = '00:00',
  onChange,
}: TimeDropdownProps) => {
  const [selectedHour, setSelectedHour] = useState(value.split(':')[0] || '00');
  const [selectedMinute, setSelectedMinute] = useState(
    value.split(':')[1] || '00',
  );
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );

  useEffect(() => {
    if (hourRef.current) {
      const middleIndex = Math.floor(hours.length / 2);
      hourRef.current.scrollTop =
        (hours.indexOf(selectedHour) - middleIndex) * 40;
    }
    if (minuteRef.current) {
      const middleIndex = Math.floor(minutes.length / 2);
      minuteRef.current.scrollTop =
        (minutes.indexOf(selectedMinute) - middleIndex) * 40;
    }
  }, [selectedHour, selectedMinute]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
    onChange(`${hour}:${selectedMinute}`);
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);
    onChange(`${selectedHour}:${minute}`);
  };

  return (
    <DropdownContainer width={width} ref={dropdownRef}>
      <TimeDropdownHeader onClick={() => setIsOpen(!isOpen)}>
        <TimeDropdownLabel>
          {`${selectedHour}시 ${selectedMinute}분`}
        </TimeDropdownLabel>
      </TimeDropdownHeader>
      {isOpen && (
        <DropdownMenu>
          <ScrollContainer>
            <ScrollableColumn ref={hourRef}>
              {hours.map((hour, index) => (
                <React.Fragment key={hour}>
                  <TimeItem
                    selected={hour === selectedHour}
                    onClick={() => handleHourChange(hour)}
                  >
                    {hour}
                  </TimeItem>
                  {index < hours.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </ScrollableColumn>
            <MiddleSeparator>:</MiddleSeparator>
            <ScrollableColumn ref={minuteRef}>
              {minutes.map((minute, index) => (
                <React.Fragment key={minute}>
                  <TimeItem
                    selected={minute === selectedMinute}
                    onClick={() => handleMinuteChange(minute)}
                  >
                    {minute}
                  </TimeItem>
                  {index < minutes.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </ScrollableColumn>
          </ScrollContainer>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div<{ width: string }>`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
`;

const TimeDropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray300};
`;

const TimeDropdownLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  width: 147px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;

  z-index: 1;
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollableColumn = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  overflow-y: auto;
  width: 50%;

  scrollbar-color: ${({ theme }) => theme.colors.gray300} transparent;
`;

const TimeItem = styled.div<{ selected: boolean }>`
  padding: 10px 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.gray900 : theme.colors.gray500};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const MiddleSeparator = styled.div`
  padding: 0 12px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray300};
  margin: 2px 0;
`;
