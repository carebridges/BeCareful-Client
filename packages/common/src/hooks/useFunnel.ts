import { useState } from 'react';

export const useFunnel = (initialStep = 0) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const goToPrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  return { currentStep, goToNext, goToPrev, setStep };
};
