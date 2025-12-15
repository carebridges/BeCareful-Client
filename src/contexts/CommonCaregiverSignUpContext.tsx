import { useFunnel } from '@/hooks/SignUp/useFunnel';
import { CommonCaregiverSignUpFormData } from '@/types/CareGiverSignUp';
import { createContext, useContext, useState } from 'react';

interface CaregiverSignUpContextType extends ReturnType<typeof useFunnel> {
  formData: CommonCaregiverSignUpFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<CommonCaregiverSignUpFormData>
  >;
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

  const [formData, setFormData] = useState<CommonCaregiverSignUpFormData>({
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
