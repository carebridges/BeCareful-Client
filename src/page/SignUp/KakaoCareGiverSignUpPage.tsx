import { KakaoCareGiverSignUpFunnel } from '@/components/SignUp/CareGiverSignUpFunnel/KakaoCaregiverSignUpFunnel';
import { KakaoCaregiverSignUpProvider } from '@/contexts/KakaoCaregiverSignUpContext';
import { useGetGuestInfoForCaregiver } from '@/hooks/SignUp/useGuestInfoForCaregiver';

export const KakaoCareGiverSignUpPage = () => {
  return (
    <KakaoCaregiverSignUpProvider>
      <KakaoCareGiverSignUpInner />
    </KakaoCaregiverSignUpProvider>
  );
};

const KakaoCareGiverSignUpInner = () => {
  useGetGuestInfoForCaregiver();
  return <KakaoCareGiverSignUpFunnel />;
};
