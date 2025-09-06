import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { CertificateSelectModal } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateSelectModal';
import { ReactComponent as Plus } from '@/assets/icons/signup/Plus.svg';
import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';
import { useCertificateManager } from '@/hooks/SignUp/useCertificateManager';
import { CertificateCardList } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateCardList';

export const Step2AddCertificate = () => {
  const { goToNext, formData, setFormData, goToPrev } =
    useCaregiverSignUpContext();

  const {
    selectedKeys,
    handleCertificateChange,
    handleAddCertificate,
    isModalOpen,
    openModal,
    closeModal,
  } = useCertificateManager(setFormData);

  const isNextEnabled = selectedKeys.every((key) => {
    const cert = formData[key];
    return cert.certificateNumber.trim() !== '';
  });

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소지하신 자격증 입력해주세요
          <br />
          <span className="subtext">
            등급과 자격증 번호를 정확히 입력해주세요.
          </span>
        </Title>
      </HeaderSection>

      <CertificateCardList
        selectedKeys={selectedKeys}
        onChange={handleCertificateChange}
      />

      {selectedKeys.length < 3 && (
        <CardWrapper>
          <Button
            variant="blue2"
            width="320px"
            height="52px"
            onClick={openModal}
          >
            <ButtonContent>
              <Plus />
              자격증 추가하기
            </ButtonContent>
          </Button>
          <CertificateSelectModal
            width="312px"
            isOpen={isModalOpen}
            onClose={closeModal}
            onAddCertificate={handleAddCertificate}
          />
        </CardWrapper>
      )}

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          disabled={!isNextEnabled}
          variant={isNextEnabled ? 'blue' : 'gray'}
          height="52px"
        >
          다음 단계로 이동
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 112px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .subtext {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;

const CardWrapper = styled.div`
  display: flex;
  padding: 16px 20px 0px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  margin-bottom: 135px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
