import { useFunnel } from '@/hooks/SignUp/useFunnel';
import { CaregiverSignUpFormData } from '@/types/CareGiverSignUp';
import { createContext, useContext, useState } from 'react';

interface CaregiverSignUpContextType extends ReturnType<typeof useFunnel> {
  formData: CaregiverSignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<CaregiverSignUpFormData>>;
}
const CaregiverSignUpContext = createContext<CaregiverSignUpContextType | null>(
  null,
);

export const CaregiverSignUpProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const funnel = useFunnel(0);

  const [formData, setFormData] = useState<CaregiverSignUpFormData>({
    realName: '',
    birthYymmdd: '',
    genderCode: 0,
    phoneNumber: '',
    streetAddress: '',
    detailAddress: '',
    caregiverCertificate: { grade: undefined, certificateNumber: '' },
    socialWorkerCertificate: { grade: undefined, certificateNumber: '' },
    nursingCareCertificate: { grade: undefined, certificateNumber: '' },
    isHavingCar: false,
    isCompleteDementiaEducation: false,
    isAgreedToTerms: false,
    isAgreedToCollectPersonalInfo: false,
    isAgreedToReceiveMarketingInfo: false,
    profileImageUrl: '',
  });

  return (
    <CaregiverSignUpContext.Provider
      value={{ ...funnel, formData, setFormData }}
    >
      {children}
    </CaregiverSignUpContext.Provider>
  );
};

export const useCaregiverSignUpContext = () => {
  const context = useContext(CaregiverSignUpContext);
  if (!context) throw new Error('caregiversignupcontext.tsx error');
  return context;
};
