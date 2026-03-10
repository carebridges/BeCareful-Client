import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { ReactComponent as CloseIcon } from '@/assets/icons/CloseWhite.svg';

interface TabGuideTourProps {
  target: string;
  storageKey: string;
  Img: React.ReactNode;
}

export const TabGuideTour = ({
  target,
  storageKey,
  Img,
}: TabGuideTourProps) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(storageKey)) setRun(true);
  }, [storageKey]);

  const handleCallback = (data: CallBackProps) => {
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(data.status)) {
      localStorage.setItem(storageKey, 'true');
      setRun(false);
    }
  };

  const steps: Step[] = [
    {
      target,
      content: null,
      disableBeacon: true,
    },
  ];

  return (
    <>
      {run && (
        <Overlay>
          <Close
            onClick={(e) => {
              e.stopPropagation();
              localStorage.setItem(storageKey, 'true');
              setRun(false);
            }}
          >
            <CloseIcon />
          </Close>
          <ImgWrapper>{Img}</ImgWrapper>
        </Overlay>
      )}

      <Joyride
        steps={steps}
        run={run}
        callback={handleCallback}
        disableOverlayClose={true}
        styles={{
          options: {
            zIndex: 1000,
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            arrowColor: 'transparent',
          },
          buttonClose: { display: 'none' },
          buttonNext: { display: 'none' },
          tooltip: {
            backgroundColor: 'transparent',
            padding: 0,
            boxShadow: 'none',
          },
        }}
      />
    </>
  );
};

const ImgWrapper = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;

  color: ${({ theme }) => theme.colors.white};
`;
