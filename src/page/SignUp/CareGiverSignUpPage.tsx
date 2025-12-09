import { KakaoCareGiverSignUpFunnel } from '@/components/SignUp/CareGiverSignUpFunnel/KakaoCaregiverSignUpFunnel';
import { useGetGuestInfoForCaregiver } from '@/hooks/SignUp/useGuestInfoForCaregiver';

export const KakaoCareGiverSignUpPage = () => {
  useGetGuestInfoForCaregiver();
  return <KakaoCareGiverSignUpFunnel />;
};
