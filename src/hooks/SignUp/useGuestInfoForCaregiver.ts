import { useCaregiverSignUpContext } from '@/contexts/KakaoCaregiverSignUpContext';
import { useGetGuestInfoBase } from '@/hooks/SignUp/useGetGuestInfoBase';

const getGenderCode = (char: string): number => {
  if (char === '1' || char === '3') return 1;
  if (char === '2' || char === '4') return 2;
  return 0;
};

export const useGetGuestInfoForCaregiver = () => {
  return useGetGuestInfoBase(useCaregiverSignUpContext, (guest) => ({
    realName: guest.name,
    birthYymmdd: guest.birthYymmdd,
    genderCode: getGenderCode(String(guest.birthGenderCode)),
    phoneNumber: guest.phoneNumber,
  }));
};
