import { useGuestInfoQuery } from '@/api/guestInfo';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface GuestInfoMapper<T> {
  (guestInfo: {
    name: string;
    birthYymmdd: string;
    birthGenderCode: string | number;
    phoneNumber: string;
  }): Partial<T>;
}

export const useGetGuestInfoBase = <T>(
  useContext: () => { setFormData: (updater: (prev: T) => T) => void },
  mapper: GuestInfoMapper<T>,
) => {
  const [searchParams] = useSearchParams();
  const rawGuestKey = searchParams.get('guestKey');

  useEffect(() => {
    if (rawGuestKey !== null && rawGuestKey !== 'null' && rawGuestKey !== '') {
      sessionStorage.setItem('guestKey', rawGuestKey);
    }
  }, [rawGuestKey]);

  const guestKey =
    rawGuestKey && rawGuestKey !== 'null'
      ? rawGuestKey
      : sessionStorage.getItem('guestKey');

  const { data: guestInfo, isLoading, error } = useGuestInfoQuery(guestKey);
  const { setFormData } = useContext();

  useEffect(() => {
    if (!guestInfo) return;
    const mapped = mapper({
      ...guestInfo,
      birthGenderCode: String(guestInfo.birthGenderCode),
    });
    setFormData((prev) => ({ ...prev, ...mapped }));
  }, [guestInfo, setFormData]);

  return { isLoading, error };
};
