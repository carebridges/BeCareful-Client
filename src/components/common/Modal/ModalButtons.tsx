import styled from 'styled-components';
import React from 'react';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { Button } from '@/components/common/Button/Button';

interface ModalProps {
  onClose: () => void;
  title: string;
  detail: string;
  left: string;
  right: string;
  handleLeftBtnClick: () => void;
  handleRightBtnClick: () => void;
  color?: string;
}

const ModalButtons = ({
  onClose,
  title,
  detail,
  left,
  right,
  handleLeftBtnClick,
  handleRightBtnClick,
  color = 'mainBlue',
}: ModalProps) => {
  return (
    <ModalWrapper>
      <ModalXImg onClick={onClose} />
      <ModalLabelWrapper>
        <ModalTitleLabel>
          {title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </ModalTitleLabel>
        <ModalDetailLabel color={color}>
          {detail.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </ModalDetailLabel>
      </ModalLabelWrapper>
      <ModalButtonWrapper>
        <Button
          height="52px"
          variant={color === 'red' ? 'gray' : 'subBlue'}
          onClick={handleLeftBtnClick}
        >
          {left}
        </Button>
        <Button
          height="52px"
          variant={color === 'red' ? 'mainOrange' : 'mainBlue'}
          onClick={handleRightBtnClick}
        >
          {right}
        </Button>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

export default ModalButtons;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  width: 272px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const ModalDetailLabel = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'red' ? theme.colors.mainOrange : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;
  text-align: center;
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
