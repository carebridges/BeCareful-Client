import { CommonSocialworkerSignUpFunnel } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/CommonSocialworkerSignUpFunnel';
import { CommonSocialworkerSignUpProvider } from '@/contexts/CommonSocialWorkerSignUpContext';

export const CommonInstitutionSignUpPage = () => {
  return (
    <CommonSocialworkerSignUpProvider>
      <CommonSocialworkerSignUpFunnel />
    </CommonSocialworkerSignUpProvider>
  );
};
