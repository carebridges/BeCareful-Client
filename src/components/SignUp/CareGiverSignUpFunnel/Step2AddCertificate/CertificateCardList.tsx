import { CERTIFICATE_CARD_MAP } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateComponentMap';
import { CERTIFICATE_LABEL } from '@/constants/caregiver/certificateLabel';
import { CertificateFormInput, CertificateKey } from '@/types/CareGiverSignUp';
import { styled } from 'styled-components';

interface Props {
  selectedKeys: CertificateKey[];
  onChange: (key: CertificateKey, data: CertificateFormInput) => void;
}

export const CertificateCardList = ({ selectedKeys, onChange }: Props) => {
  return (
    <>
      {selectedKeys.map((key) => {
        const Card = CERTIFICATE_CARD_MAP[key];
        const label = CERTIFICATE_LABEL[key];
        return (
          <CardWrapper key={key}>
            <Card
              initialType={label}
              onChange={(data) => onChange(key, data)}
            />
          </CardWrapper>
        );
      })}
    </>
  );
};

const CardWrapper = styled.div`
  display: flex;
  padding: 16px 20px 0px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
`;
