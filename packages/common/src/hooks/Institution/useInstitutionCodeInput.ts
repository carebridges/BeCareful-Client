'use client';

import { useState, useEffect } from 'react';
import { useCheckInstitutionCode } from '../../api/institution';

export const useInstitutionCodeInput = (
  onDuplicateCheck?: (isDuplicate: boolean) => void,
) => {
  const [input, setInput] = useState('');
  const [searchedCode, setSearchedCode] = useState('');

  const { data: isDuplicate, isLoading } = useCheckInstitutionCode(
    searchedCode,
    {
      enabled: searchedCode.trim().length > 0,
    },
  );

  useEffect(() => {
    if (!isLoading && isDuplicate !== undefined) {
      onDuplicateCheck?.(isDuplicate);
    }
  }, [isDuplicate, isLoading, onDuplicateCheck]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSearch = () => {
    setSearchedCode(input.trim());
  };

  return {
    input,
    setInput,
    handleChange,
    handleSearch,
    searchedCode,
    isDuplicate,
    isLoading,
  };
};
