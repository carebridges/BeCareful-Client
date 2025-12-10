import { KakaoCareGiverSignUpFunnel } from '@/components/SignUp/CareGiverSignUpFunnel/KakaoCaregiverSignUpFunnel';
import { CommonCaregiverSignUpProvider } from '@/contexts/CommonCaregiverSignUpContext';

export const CommonCareGiverSignUpPage = () => {
  return (
    <CommonCaregiverSignUpProvider>
      <KakaoCareGiverSignUpFunnel />
    </CommonCaregiverSignUpProvider>
  );
};
