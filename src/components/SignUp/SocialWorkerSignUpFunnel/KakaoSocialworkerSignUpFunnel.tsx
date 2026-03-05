import { Step1SelectRole } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step1SelectRole';

import { Step3InstitutionName } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step3InstitutionName';
import { Step4BasicInfo } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo';
import { Step5AcceptTerms } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step5AcceptTerms';
import { Step7SignUpComplete } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step7SignUpComplete';
import { useSignUpContext } from '@/contexts/KakaoSocialWorkerSignUpContext';

import { ReactComponent as IconClose } from '@/assets/icons/IconClose.svg';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SignUpModal } from '@/components/SignUp/common/SingUpModal';
import { useState } from 'react';
import { Step6UploadPhoto } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step6UploadPhoto';

const steps = [
  Step1SelectRole,
  Step3InstitutionName,
  Step4BasicInfo,
  Step5AcceptTerms,
  Step6UploadPhoto,
  Step7SignUpComplete,
];
const stepPercents = [20, 40, 60, 80, 100, 100];

export const KakaoSocialworkerSignUpFunnel = () => {
  const { currentStep, isInstitutionFunnel } = useSignUpContext();
  const StepComponent = steps[currentStep];
  const percent = stepPercents[currentStep];
  const isLastStep = currentStep === 5;
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
      {!isInstitutionFunnel && !isLastStep && <ProgressBar percent={percent} />}
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
