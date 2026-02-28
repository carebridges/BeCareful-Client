'use client';

import { useState, useEffect } from 'react';
import SearchIcon from '@repo/ui/src/assets/icons/signup/SearchIcon.svg';
import { styled } from 'styled-components';

export const CommunitySearchInput = ({
  onCommunitySelect,
}: {
  onCommunitySelect: (name: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onCommunitySelect(searchTerm);
  }, [searchTerm]);

  return (
    <Wrapper>
      <SearchContainer>
        <StyledInput
          placeholder="협회명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
      </SearchContainer>
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
