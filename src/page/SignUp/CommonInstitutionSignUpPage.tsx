import { CommonSocialworkerSignUpFunnel } from '@/components/SignUp/SocialWorkerSignUpFunnel/CommonSocialworkerSignUpFunnel';
import { CommonSocialworkerSignUpProvider } from '@/contexts/CommonSocialWorkerSignUpContext';

export const CommonInstitutionSignUpPage = () => {
  return (
    <CommonSocialworkerSignUpProvider>
      <CommonSocialworkerSignUpFunnel />
    </CommonSocialworkerSignUpProvider>
  );
};
