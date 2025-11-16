import { useEffect, useRef, useState } from 'react';
import { ReactComponent as SearchIcon } from '@/assets/icons/signup/SearchIcon.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/CloseCircle.svg';
import { styled } from 'styled-components';
import { useSearchInstitution } from '@/api/signupFunnel';
import { SearchInstitution } from '@/types/SocialSignUp';
import { FindNewInstitutionModal } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step3InstitutionName/FindNewInstitutionModal';
import { theme } from '@/style/theme';
import { ReactComponent as ArrowRight } from '@/assets/icons/ArrowRight.svg';

type Props = {
  onInstitutionSelect: (
    name: string,
    id?: number,
    address?: string,
    code?: string,
  ) => void;
  onRequestRegister?: () => void;
  institution?: string;
};

export const InstitutionSearchInput = ({
  onInstitutionSelect,
  onRequestRegister,
  institution,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState(institution ? institution : '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [openNoResult, setOpenNoResult] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: institutions = [] } = useSearchInstitution(searchTerm.trim(), {
    enabled: searchTerm.trim().length > 0,
  });

  const handleSelect = (inst: SearchInstitution) => {
    setSearchTerm(inst.name);
    setShowDropdown(false);
    onInstitutionSelect(
      inst.name,
      inst.institutionId,
      inst.address || undefined,
      inst.institutionCode || undefined,
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (institution !== searchTerm) {
      setSearchTerm(institution || '');
    }
  }, [institution]);

  return (
    <Wrapper ref={wrapperRef}>
      <SearchContainer>
        <StyledInput
          ref={inputRef}
          placeholder="기관명 검색"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
        />

        <IconWrapper>
          <Close onClick={() => setSearchTerm('')} />
          <SearchIcon />
        </IconWrapper>
      </SearchContainer>

      {showDropdown && (
        <Dropdown role="listbox">
          {institutions.map((inst) => (
            <DropdownItem
              key={inst.institutionId}
              onClick={() => handleSelect(inst)}
              role="option"
            >
              <Name>{inst.name}</Name>
              <Address>
                {inst.address}
                {inst.institutionCode
                  ? ` (${inst.institutionCode})`
                  : ' (기관 코드 없음)'}
              </Address>
            </DropdownItem>
          ))}

          <DropdownItem
            key="no-result"
            onClick={() => setOpenNoResult(true)}
            role="option"
          >
            <NoResultContainer>
              <NoResultTexts>
                <Name style={{ color: theme.colors.mainBlue }}>
                  소속 기관이 목록에 없으신가요?
                </Name>
                <Address>소속 기관 직접 등록하러 가기</Address>
              </NoResultTexts>
              <ArrowIcon />
            </NoResultContainer>
          </DropdownItem>
        </Dropdown>
      )}

      {openNoResult && (
        <FindNewInstitutionModal
          width="320px"
          onClose={() => setOpenNoResult(false)}
          onCancel={() => {
            setOpenNoResult(false);
            inputRef.current?.focus();
          }}
          onApply={() => {
            setOpenNoResult(false);
            onRequestRegister?.();
          }}
        />
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
  gap: 8px;
`;

const Close = styled(CloseIcon)`
  cursor: pointer;
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
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
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

const NoResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NoResultTexts = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowIcon = styled(ArrowRight)`
  & path {
    stroke: ${({ theme }) => theme.colors.mainBlue} !important;
  }
  flex-shrink: 0;
`;
