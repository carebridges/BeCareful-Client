import { useAllInstitutions } from '@/hooks/SignUp/useAllInstitutions';
import { Institution } from '@/types/SocialSignUp';
import { useState, useMemo, useRef, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '@/assets/icons/signup/SearchIcon.svg';
import { styled } from 'styled-components';

export const InstitutionRegisterNameInput = ({
  onInstitutionSelect,
  onChangeText,
}: {
  onInstitutionSelect: (name: string, id?: number, address?: string) => void;
  onChangeText?: (text: string) => void;
}) => {
  const institutions = useAllInstitutions();
  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = term.trim();
    if (!q) return [];
    return institutions.filter((i) => i.institutionName.includes(q));
  }, [term, institutions]);

  const handleSelect = (inst: Institution & { address?: string }) => {
    setTerm(inst.institutionName);
    setOpen(false);
    onInstitutionSelect(inst.institutionName, inst.institutionId, inst.address);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={containerRef}>
      <SearchContainer>
        <StyledInput
          placeholder="기관명 검색"
          value={term}
          onFocus={() => {
            if (term.trim().length > 0) setOpen(true);
          }}
          onChange={(e) => {
            const v = e.target.value;
            setTerm(v);
            onChangeText?.(v);
            setOpen(v.trim().length > 0);
          }}
        />
        <IconWrapper
          role="button"
          tabIndex={0}
          onClick={() => {
            if (term.trim().length === 0) return;
            setOpen((prev) => !prev);
          }}
        >
          <SearchIcon />
        </IconWrapper>
      </SearchContainer>

      {open && filtered.length > 0 && (
        <Dropdown role="listbox">
          {filtered.map((inst) => (
            <DropdownItem
              key={inst.institutionId ?? inst.institutionName}
              onClick={() => handleSelect(inst)}
              role="option"
            >
              <Name>{inst.institutionName}</Name>
              <Address>
                {inst.address ?? ''}
                {inst.institutionId != null
                  ? ` (${inst.institutionId})`
                  : ' (기관 코드 없음)'}
              </Address>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 16px;
  width: 100%;
  height: 52px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;

  &:hover,
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  margin-top: 4px;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  flex-direction: column;

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
  }
`;

const Name = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const Address = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray500};
`;
