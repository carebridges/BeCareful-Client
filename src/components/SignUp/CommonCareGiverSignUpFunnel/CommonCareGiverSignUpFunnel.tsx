import { ReactComponent as IconClose } from '@/assets/icons/IconClose.svg';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SignUpModal } from '@/components/SignUp/common/SingUpModal';
import { useState } from 'react';
import { useCommonCaregiverSignUpContext } from '@/contexts/CommonCaregiverSignUpContext';
import { Step1AccountCredentials } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step1AccountCredentials';
import { Step5IsDementialTrained } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step5IsDementialTrained';
import { Step6CurrentAddress } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step6CurrentAddress';
import { Step7UploadPhoto } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step7UploadPhoto';
import { Step8SignUpComplete } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step8SignUpComplete';
import { Step4IsCarOwner } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step4IsCarOwner';
import { Step3AddCertificate } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step3AddCertificate';
import { Step2BasicInfo } from '@/components/SignUp/CommonCareGiverSignUpFunnel/Step2BasicInfo';

const steps = [
  Step1AccountCredentials,
  Step2BasicInfo,
  Step3AddCertificate,
  Step4IsCarOwner,
  Step5IsDementialTrained,
  Step6CurrentAddress,
  Step7UploadPhoto,
  Step8SignUpComplete,
];

const stepPercents = [12, 24, 36, 48, 60, 72, 86, 100];

export const CommonCareGiverSignUpFunnel = () => {
  const { currentStep } = useCommonCaregiverSignUpContext();
  const StepComponent = steps[currentStep];
  const percent = stepPercents[currentStep];
  const isLastStep = currentStep === 8;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickBack = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconContainer>
        <IconClose onClick={handleClickBack} />
      </IconContainer>
      {!isLastStep && <ProgressBar percent={percent} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
      {isModalOpen && (
        <SignUpModal
          width="312px"
          onClose={handleCloseModal}
          recruitmentId={null}
        />
      )}
    </>
  );
};

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
  //margin: 24px 0 auto 0;
`;
