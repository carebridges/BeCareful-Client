import { ReactComponent as SearchIcon } from '@/assets/icons/signup/SearchIcon.svg';
import { styled } from 'styled-components';

export const MatchingSearchBox = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <SearchContainer>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
    </SearchContainer>
  );
};
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

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
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
