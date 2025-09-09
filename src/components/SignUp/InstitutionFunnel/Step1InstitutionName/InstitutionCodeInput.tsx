import { styled } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useInstitutionCodeInput } from '@/hooks/SignUp/useInstitutionCodeInput';

interface InstitutionCodeInputProps {
  onInstitutionCodeChange: (code: string) => void;
  onDuplicateCheck?: (isDuplicate: boolean) => void;
}

export const InstitutionCodeInput = ({
  onInstitutionCodeChange,
  onDuplicateCheck,
}: InstitutionCodeInputProps) => {
  const navigate = useNavigate();

  const {
    input,
    handleChange,
    handleSearch,
    searchedCode,
    isDuplicate,
    isLoading,
  } = useInstitutionCodeInput(onDuplicateCheck);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    onInstitutionCodeChange(e.target.value);
  };

  return (
    <Wrapper>
      <SearchContainer
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      >
        {/* 디자인 수정대면 고칠 예정*/}
        <StyledInput
          placeholder="기관 코드 입력"
          value={input}
          onChange={onInputChange}
        />
      </SearchContainer>

      {searchedCode && !isLoading && isDuplicate === true && (
        <MessageContainer>
          <ValidationMessage state="default">
            <span className="highlight">* 이미 등록된 기관입니다.</span>
            <br />
            <span
              className="bold"
              onClick={() => navigate(-1)}
              role="button"
              style={{ paddingLeft: '10px' }}
            >
              검색 페이지
            </span>
            로 돌아가 기관을 다시 검색해 보세요.
          </ValidationMessage>
        </MessageContainer>
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

const ValidationMessage = styled.p<{ state: 'default' | 'error' }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  .bold {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray600};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0px 0px 0px;
  box-sizing: border-box;
  flex-direction: column;
`;
