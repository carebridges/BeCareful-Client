import { ReactComponent as SearchIcon } from '@/assets/icons/signup/SearchIcon.svg';
import { styled } from 'styled-components';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export const SearchInput = ({
  placeholder,
  value,
  onChange,
  onClick,
  readOnly,
}: SearchInputProps) => {
  return (
    <SearchContainer>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        readOnly={readOnly}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 16px;
  width: 100%;
  box-sizing: border-box;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
