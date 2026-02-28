import { useGetGuestInfoBase } from '@/hooks/SignUp/useGetGuestInfoBase';
import { getGenderCode, useSignUpContext } from '@repo/common';

export const useGetGuestInfo = () => {
  return useGetGuestInfoBase(useSignUpContext, (guest) => ({
    realName: guest.name,
    birthYymmdd: guest.birthYymmdd,
    genderCode: getGenderCode(String(guest.birthGenderCode)),
    phoneNumber: guest.phoneNumber,
  }));
};
