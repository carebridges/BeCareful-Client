import { ReactComponent as IconClose } from '@repo/ui/src/assets/icons/IconClose.svg';
import { styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SignUpModal } from '@/components/SignUp/common/SingUpModal';
import { useState } from 'react';
import { useCommonSignUpContext } from '@/contexts/CommonSocialWorkerSignUpContext';
import { Step2InstitutionName } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step2InstitutionName';
import { Step3AccountCredentials } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials';
import { Step1SelectRole } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step1SelectRole';
import { Step4BasicInfo } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step4BasicInfo';
import { Step5AcceptTerms } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step5AcceptTerms';
import { Step6SignUpComplete } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step6SignUpComplete';
import { ProgressBar } from '@repo/ui';

const steps = [
  Step1SelectRole,
  Step2InstitutionName,
  Step3AccountCredentials,
  Step4BasicInfo,
  Step5AcceptTerms,
  Step6SignUpComplete,
];
const stepPercents = [18, 36, 54, 72, 90, 100];

export const CommonSocialworkerSignUpFunnel = () => {
  const { currentStep, isInstitutionFunnel } = useCommonSignUpContext();
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
