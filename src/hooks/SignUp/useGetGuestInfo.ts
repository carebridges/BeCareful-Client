import { useSignUpContext } from '@/contexts/KakaoSocialWorkerSignUpContext';
import { useGetGuestInfoBase } from '@/hooks/SignUp/useGetGuestInfoBase';
import { getGenderCode } from '@/utils/format/text';

export const useGetGuestInfo = () => {
  return useGetGuestInfoBase(useSignUpContext, (guest) => ({
    realName: guest.name,
    birthYymmdd: guest.birthYymmdd,
    genderCode: getGenderCode(String(guest.birthGenderCode)),
    phoneNumber: guest.phoneNumber,
  }));
};
