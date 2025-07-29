import { styled } from 'styled-components';
import { ReactComponent as NavigateNext } from '@/assets/icons/signup/NavigateNext.svg';
import { ReactComponent as CertificateSelectModalClose } from '@/assets/icons/signup/ModalClose.svg';

interface CertificateSelectModalProps {
  width: string;
  isOpen: boolean;
  onClose: () => void;
  onAddCertificate: (type: string) => void;
}

export const CertificateSelectModal = ({
  width,
  isOpen,
  onClose,
  onAddCertificate,
}: CertificateSelectModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <CertificateSelectModalContent width={width}>
        <CloseButton onClick={onClose}>
          <CertificateSelectModalClose />
        </CloseButton>
        <CertificateSelectModalHeader>
          자격증 선택
          <span className="highlight">
            아래 자격증 중 소지하신 자격증을
            <br /> 선택해 주세요
          </span>
        </CertificateSelectModalHeader>

        <CardContainer onClick={() => onAddCertificate('사회복지사')}>
          <CardText>사회복지사 자격증 추가하기</CardText>
          <NavigateNext />
        </CardContainer>

        <CardContainer onClick={() => onAddCertificate('간호지원사')}>
          <CardText>간호지원사 자격증 추가하기</CardText>
          <NavigateNext />
        </CardContainer>
      </CertificateSelectModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

const CertificateSelectModalContent = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 28px 20px;
  border-radius: 12px;
  width: ${({ width }) => width};

  margin-bottom: 28px;
  position: relative;

  display: flex;
  flex-direction: column;
`;

const CertificateSelectModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
  gap: 8px;

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 20px;

  background: none;
  border: none;
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: flex;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  margin-bottom: 8px;
  padding: 0px 16px;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CardText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};
`;
