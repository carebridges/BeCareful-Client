import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { Step1CommunityImage } from '@/components/SignUp/CommunityFunnel/Step1CommunityImage';
import { Step2CommunityName } from '@/components/SignUp/CommunityFunnel/Step2CommunityName';
import { Step3CommunityRegister } from '@/components/SignUp/CommunityFunnel/Step3CommunityRegister';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { CommunityModal } from '@/components/SignUp/CommunityFunnel/CommunityExitModal';

interface CommunityFunnelProps {
  onDone: () => void;
  onCancel?: () => void;
}

export interface CommunityFormData {
  name: string;
  profileImageUrl: string;
  establishedYear: number;
}

export const CommunityFunnel = ({ onDone, onCancel }: CommunityFunnelProps) => {
  const [communityFormData, setCommunityFormData] = useState<CommunityFormData>(
    {
      name: '',
      profileImageUrl: '',
      establishedYear: new Date().getFullYear(),
    },
  );

  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === 2;
  const goToNext = () => setCurrentStep((prev) => prev + 1);
  const goToPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    <Step1CommunityImage
      key="step1"
      goToNext={goToNext}
      goToPrev={onCancel ?? (() => {})}
      communityFormData={communityFormData}
      setCommunityFormData={setCommunityFormData}
    />,
    <Step2CommunityName
      key="step2"
      goToNext={goToNext}
      onCancel={goToPrev}
      communityFormData={communityFormData}
      setCommunityFormData={setCommunityFormData}
    />,
    <Step3CommunityRegister
      key="step3"
      onComplete={onDone}
      communityFormData={communityFormData}
    />,
  ];

  const stepPercents = [30, 70, 100];
  const percent = stepPercents[currentStep];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickBack = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <IconContainer>
        <IconArrowLeft onClick={handleClickBack} />
      </IconContainer>
      {!isLastStep && <ProgressBar percent={percent} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
      {isModalOpen && (
        <CommunityModal
          width="312px"
          onClose={handleCloseModal}
          recruitmentId={null}
          onCancel={onCancel}
        />
      )}
    </div>
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
`;
