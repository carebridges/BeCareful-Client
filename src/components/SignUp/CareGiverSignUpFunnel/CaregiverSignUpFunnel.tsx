import { Step1BasicInfo } from '@/components/SignUp/CareGiverSignUpFunnel/Step1BasicInfo';
import { Step2AddCertificate } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate';
import { Step3IsCarOwner } from '@/components/SignUp/CareGiverSignUpFunnel/Step3IsCarOwner';
import { Step4IsDementialTrained } from '@/components/SignUp/CareGiverSignUpFunnel/Step4IsDementialTrained';
import { Step5CurrentAddress } from '@/components/SignUp/CareGiverSignUpFunnel/Step5CurrentAddress';
import { Step6UploadPhoto } from '@/components/SignUp/CareGiverSignUpFunnel/Step6UploadPhoto';
import { Step7SignUpComplete } from '@/components/SignUp/CareGiverSignUpFunnel/Step7SignUpComplete';
import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';

import { ReactComponent as IconClose } from '@/assets/icons/IconClose.svg';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SignUpModal } from '@/components/SignUp/common/SingUpModal';
import { useState } from 'react';

const steps = [
  Step1BasicInfo,
  Step2AddCertificate,
  Step3IsCarOwner,
  Step4IsDementialTrained,
  Step5CurrentAddress,
  Step6UploadPhoto,
  Step7SignUpComplete,
];

const stepPercents = [18, 36, 54, 72, 90, 100];

export const CareGiverSignUpFunnel = () => {
  const { currentStep } = useCaregiverSignUpContext();
  const StepComponent = steps[currentStep];
  const percent = stepPercents[currentStep];
  const isLastStep = currentStep === 6;
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
