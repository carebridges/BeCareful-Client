import { useSignUpContext } from '@/contexts/SocialWorkerSignUpContext';
import { useGetGuestInfoBase } from '@/hooks/SignUp/useGetGuestInfoBase';
import { getGenderCode } from '@/utils/getGenderCode';

export const useGetGuestInfo = () => {
  return useGetGuestInfoBase(useSignUpContext, (guest) => ({
    realName: guest.name,
    birthYymmdd: guest.birthYymmdd,
    genderCode: getGenderCode(String(guest.birthGenderCode)),
    phoneNumber: guest.phoneNumber,
  }));
};
