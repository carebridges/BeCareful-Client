import { createContext, useContext, useState } from 'react';
import { useFunnel } from '@/hooks/SignUp/useFunnel';
import { CaregiverSignUpFormData } from '@/types/auth';

interface CaregiverSignUpContextType extends ReturnType<typeof useFunnel> {
  formData: CaregiverSignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<CaregiverSignUpFormData>>;
}
const CaregiverSignUpContext = createContext<CaregiverSignUpContextType | null>(
  null,
);

export const CommonCaregiverSignUpProvider = ({
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
    password: '',
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
    profileImageTempKey: 'default',
    loginProvider: '',
  });

  return (
    <CaregiverSignUpContext.Provider
      value={{ ...funnel, formData, setFormData }}
    >
      {children}
    </CaregiverSignUpContext.Provider>
  );
};

export const useCommonCaregiverSignUpContext = () => {
  const context = useContext(CaregiverSignUpContext);
  if (!context) throw new Error('commoncaregiversignupcontext.tsx error');
  return context;
};
