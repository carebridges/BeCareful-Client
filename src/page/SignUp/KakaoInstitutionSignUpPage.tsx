import { KakaoSocialworkerSignUpFunnel } from '@/components/SignUp/SocialWorkerSignUpFunnel/KakaoSocialworkerSignUpFunnel';
import { KakaoSocialworkerSignUpProvider } from '@/contexts/KakaoSocialWorkerSignUpContext';
import { useGetGuestInfo } from '@/hooks/SignUp/useGetGuestInfo';

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
