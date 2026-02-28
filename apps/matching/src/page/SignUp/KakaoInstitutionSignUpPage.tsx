import { KakaoSocialworkerSignUpFunnel } from '@/components/SignUp/SocialWorkerSignUpFunnel/KakaoSocialworkerSignUpFunnel';
import { useGetGuestInfo } from '@/hooks/SignUp/useGetGuestInfo';
import { KakaoSocialworkerSignUpProvider } from '@repo/common';

export const KakaoInstitutionSignUpPage = () => {
  return (
    <KakaoSocialworkerSignUpProvider>
      <KakaoInstitutionSignUpInner />
    </KakaoSocialworkerSignUpProvider>
  );
};

const KakaoInstitutionSignUpInner = () => {
  useGetGuestInfo();
  return <KakaoSocialworkerSignUpFunnel />;
};
