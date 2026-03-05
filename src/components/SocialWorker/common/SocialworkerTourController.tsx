import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { ProgressDots } from '@/components/common/ProgressDots/ProgressDots';
import { SocialworkerTourTooltip } from '@/components/SocialWorker/common/SocialworkerTourTooltip';
import { SOCAILWORKER_TOUR_STEPS } from '@/constants/tour';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

export const SocialworkerTourController = () => {
  const { handleNavigate } = useHandleNavigate();
  const { pathname } = useLocation();

  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const visited = localStorage.getItem('socialworkerTour');
    if (!visited && !run) {
      const timer = setTimeout(() => setRun(true), 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!run) return;

      const target = e.target as HTMLElement;
      if (target.closest('.tour-skip-button')) return;

      const currentStep = SOCAILWORKER_TOUR_STEPS[stepIndex];
      const nextStepIndex = stepIndex + 1;

      if (nextStepIndex < SOCAILWORKER_TOUR_STEPS.length) {
        if (currentStep.data?.next) {
          setRun(false);
          handleNavigate(currentStep.data.next);
        }
        setStepIndex(nextStepIndex);
      } else {
        setRun(false);
        localStorage.setItem('socialworkerTour', 'true');
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [run, stepIndex, handleNavigate]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, action, step } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      localStorage.setItem('socialworkerTour', 'true');
    } else if (type === 'step:after' && action === 'prev') {
      if (step.data?.previous) {
        setRun(false);
        handleNavigate(step.data.previous);
      }
      setStepIndex(index - 1);
    }
  };

  return (
    <>
      {run && (
        <Overlay>
          <Top
            className="tour-skip-button"
            onClick={(e) => {
              e.stopPropagation();
              setRun(false);
              localStorage.setItem('socialworkerTour', 'true');
            }}
          >
            건너뛰기
          </Top>
          <div className="middle">
            {stepIndex === 4 ? (
              '이제 서비스를 이용해보세요!'
            ) : (
              <div>
                화면을 눌러
                <br />
                다음 안내를 확인할 수 있어요
              </div>
            )}
            <ProgressDots
              index={stepIndex}
              total={SOCAILWORKER_TOUR_STEPS.length}
            />
          </div>
        </Overlay>
      )}

      <Joyride
        steps={SOCAILWORKER_TOUR_STEPS}
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        tooltipComponent={SocialworkerTourTooltip}
        continuous
        showSkipButton={true}
        disableOverlayClose={true}
        disableScrolling={false}
        scrollToFirstStep={true}
        styles={{
          options: {
            zIndex: 1000,
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            arrowColor: 'transparent',
          },
        }}
      />
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;

  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  .middle {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const Top = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
