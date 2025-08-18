import { AssociationInfoResponse } from '@/types/Community/association';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useAssociationChangeForm = (
  data: AssociationInfoResponse | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.associationName);
      setYear(String(data.associationEstablishedYear));
    }
  }, [data]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsChanged(true);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    setIsChanged(true);
  };

  return {
    name,
    year,
    handleNameChange,
    handleYearChange,
  };
};
