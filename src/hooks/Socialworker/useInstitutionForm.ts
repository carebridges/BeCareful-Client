import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InstitutionInfo } from '@/types/Socialworker/mypage';

export const useInstitutionForm = (
  data: InstitutionInfo | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [institutionName, setInstitutionName] = useState('');
  const [institutionCode, setInstitutionCode] = useState('0');
  const [year, setYear] = useState(0);
  const [types, setTypes] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (data) {
      setInstitutionName(data.institutionName || '');
      setInstitutionCode(data.institutionCode || '');
      setYear(data.institutionOpenYear || 0);
      setTypes(data.facilityTypes || []);
      setPhoneNumber(data.institutionPhoneNumber || '');
    }
  }, [data]);

  const handleChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'institutionName':
        setInstitutionName(value);
        break;
      case 'institutionCode':
        setInstitutionCode(value);
        break;
      case 'year':
        setYear(Number(value));
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
    setIsChanged(true);
  };

  const handleTypesChange = (selectedType: string) => {
    setTypes((prev) => {
      if (prev.includes(selectedType)) {
        return prev.filter((type) => type !== selectedType);
      } else {
        return [...prev, selectedType];
      }
    });
    setIsChanged(true);
  };

  return {
    institutionName,
    institutionCode,
    year,
    types,
    phoneNumber,
    handleChange,
    handleTypesChange,
  };
};
