import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ProgressDots } from '@/components/common/ProgressDots/ProgressDots';
import { Button } from '@/components/common/Button/Button';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { OnboardingItem } from '@/types/common';

interface CommonOnboardingPageProps {
  steps: OnboardingItem[];
  path: string;
  storageKey: string;
}

export const CommonOnboardingPage = ({
  steps,
  path,
  storageKey,
}: CommonOnboardingPageProps) => {
  const { handleNavigate } = useHandleNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    const hasVisited = localStorage.getItem(storageKey);
    if (hasVisited) {
      handleNavigate(path);
    }
  }, [storageKey, path, handleNavigate]);

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem(storageKey, 'true');
      handleNavigate(path);
    }
  };

  const data = steps[currentStep];

  return (
    <Container>
      <div className="text">
        <div className="title">{data.title}</div>
        <div className="detail">
          {data.detail.split('\n').map((line, idx) => (
            <div key={idx}>
              {line}
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="image">
        <img src={data.image} />
      </div>

      <div className="bottom">
        <ProgressDots index={currentStep} total={steps.length} />

        <Button
          height="52px"
          variant="mainBlue"
          onClick={handleNext}
          style={{
            width: 'calc(100vw - 40px)',
          }}
        >
          {data.buttonText}
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    text-align: center;
    margin: 40px 0px 48px 0px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .image {
    position: relative;
    min-width: 320px;
    min-height: 260px;

    &::before {
      content: '';
      width: 320px;
      height: 260px;
      background: #e6f5ff;
      border-radius: 320px;
      filter: blur(75px);
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    img {
      position: relative;
      z-index: 1;
    }
  }

  .bottom {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
