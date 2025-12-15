import { CommonCareGiverSignUpFunnel } from '@/components/SignUp/CommonCareGiverSignUpFunnel/CommonCareGiverSignUpFunnel';
import { CommonCaregiverSignUpProvider } from '@/contexts/CommonCaregiverSignUpContext';

export const CommonCareGiverSignUpPage = () => {
  return (
    <CommonCaregiverSignUpProvider>
      <CommonCareGiverSignUpFunnel />
    </CommonCaregiverSignUpProvider>
  );
};
