'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step1InstitutionName } from './Step1InstitutionName';
import { Step2InstitutionOpen } from './Step2InstitutionOpen';
import { Step3InstitutionType } from './Step3InstitutionType';
import { Step4InstitutionContact } from './Step4InstitutionContact';
import { Step5UploadPhoto } from './Step5UploadPhoto';
import { Step6InstitutionRegister } from './Step6InstitutionRegister';
import { ProgressBar } from '../../../components/common';
import {
  getRandomAddress,
  InstitutionFormData,
  useSignUpContext,
} from '@repo/common';

interface InstitutionFunnelProps {
  onDone: (newInstitutionId: number) => void;
  onCancel?: () => void;
}

export const InstitutionFunnel = ({
  onDone,
  onCancel,
}: InstitutionFunnelProps) => {
  const { detail } = getRandomAddress();
  const [institutionFormData, setInstitutionFormData] =
    useState<InstitutionFormData>(() => {
      return {
        institutionName: '',
        institutionCode: '',
        openYear: 0,
        facilityTypeList: [],
        phoneNumber: '',
        streetAddress: '',
        detailAddress: '',
        profileImageTempKey: 'default',
      };
    });
  const [currentStep, setCurrentStep] = useState(0);
  const { setIsInstitutionFunnel } = useSignUpContext();
  const isLastStep = currentStep === 5;

  const goToNext = () =>
    setCurrentStep((prev) => {
      const next = prev + 1;

      if (next === 5) {
        setInstitutionFormData((data) => ({
          ...data,
          streetAddress: data.streetAddress?.trim()
            ? data.streetAddress
            : detail,
        }));
      }

      return next;
    });

  const goToPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    setIsInstitutionFunnel(true);
    return () => setIsInstitutionFunnel(false);
  }, [setIsInstitutionFunnel]);

  const steps = [
    <Step1InstitutionName
      goToNext={goToNext}
      onCancel={onCancel}
      institutionFormData={institutionFormData}
      setInstitutionFormData={setInstitutionFormData}
    />,
    <Step2InstitutionOpen
      goToNext={goToNext}
      goToPrev={goToPrev}
      institutionFormData={institutionFormData}
      setInstitutionFormData={setInstitutionFormData}
    />,
    <Step3InstitutionType
      goToNext={goToNext}
      goToPrev={goToPrev}
      institutionFormData={institutionFormData}
      setInstitutionFormData={setInstitutionFormData}
    />,
    <Step4InstitutionContact
      goToNext={goToNext}
      goToPrev={goToPrev}
      institutionFormData={institutionFormData}
      setInstitutionFormData={setInstitutionFormData}
    />,
    <Step5UploadPhoto
      goToNext={goToNext}
      goToPrev={goToPrev}
      institutionFormData={institutionFormData}
      setInstitutionFormData={setInstitutionFormData}
    />,
    <Step6InstitutionRegister
      onComplete={onDone}
      institutionFormData={institutionFormData}
    />,
  ];

  const stepPercents = [20, 40, 60, 80, 100, 100];

  const percent = stepPercents[currentStep];

  return (
    <div>
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
    </div>
  );
};
