import { KakaoSocialworkerSignUpFunnel } from '@/components/SignUp/SocialWorkerSignUpFunnel/KakaoSocialworkerSignUpFunnel';
import { useGetGuestInfo } from '@/hooks/SignUp/useGetGuestInfo';

export const KakaoInstitutionSignUpPage = () => {
  useGetGuestInfo();
  return (
    <>
      <KakaoSocialworkerSignUpFunnel />
    </>
  );
};
