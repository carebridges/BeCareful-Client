import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import InputBox from '@/components/common/InputBox/InputBox';
import { CertificateSelectModal } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateSelectModal';
import { CERTIFICATE_CARD_MAP } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateComponentMap';
import { CERTIFICATE_LABEL } from '@/constants/certificateLabel';
import { CertificateFormInput, CertificateKey } from '@/types/CareGiverSignUp';
import { CertificateInfo } from '@/types/Caregiver/common';
import { CaregiverMyRequest } from '@/types/Caregiver/mypage';
import { useCaregiverMyPageInfoQuery } from '@/hooks/Caregiver/caregiverQuery';
import { usePutMyMutation } from '@/hooks/Caregiver/usePutMyMutation';

const CaregiverEditProfilePage = () => {
  const navigate = useNavigate();

  const { data, error } = useCaregiverMyPageInfoQuery();
  if (error) {
    console.log('getCaregiverMyPageInfo 에러: ', error);
  }

  const defaultCert: CertificateInfo = {
    grade: 'FIRST',
    certificateNumber: '',
  };

  const [caregiverCert, setCaregiverCert] =
    useState<CertificateInfo>(defaultCert);
  const [socialworkerCert, setSocialworkerCert] =
    useState<CertificateInfo>(defaultCert);
  const [nursingCert, setNursingCert] = useState<CertificateInfo>(defaultCert);

  const [selectedKeys, setSelectedKeys] = useState<CertificateKey[]>([
    'caregiverCertificate',
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateChange = (
    key: CertificateKey,
    cert: CertificateFormInput,
  ) => {
    const grade: CertificateInfo['grade'] =
      cert.certificateLevel === '2급' ? 'SECOND' : 'FIRST';

    const newCert: CertificateInfo = {
      grade,
      certificateNumber: cert.certificateNumber,
    };

    if (key === 'caregiverCertificate') {
      setCaregiverCert(newCert);
    } else if (key === 'socialWorkerCertificate') {
      setSocialworkerCert(newCert);
    } else if (key === 'nursingCareCertificate') {
      setNursingCert(newCert);
    }
  };

  const handleAddCertificate = (label: string) => {
    const key = Object.entries(CERTIFICATE_LABEL).find(
      ([, value]) => value === label,
    )?.[0] as CertificateKey;

    if (!key || selectedKeys.includes(key)) return;

    setSelectedKeys((prev) => [...prev, key]);
    setIsModalOpen(false);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const [isEduChecked, setIsEduChecked] = useState(false);
  const handleEduToggleChange = () => {
    setIsEduChecked((prevChecked) => !prevChecked);
  };
  const [isCarChecked, setIsCarChecked] = useState(false);
  const handleCarToggleChange = () => {
    setIsCarChecked((prevChecked) => !prevChecked);
  };

  useEffect(() => {
    if (data) {
      setPhoneNumber(data.caregiverInfo.phoneNumber);
      setIsEduChecked(
        data.caregiverInfo.caregiverDetailInfo.completeDementiaEducation,
      );
      setIsCarChecked(data.caregiverInfo.caregiverDetailInfo.havingCar);

      const initialSelectedKeys: CertificateKey[] = [];
      if (data.caregiverInfo.caregiverDetailInfo.caregiverCertificate) {
        setCaregiverCert(
          data.caregiverInfo.caregiverDetailInfo.caregiverCertificate,
        );
        initialSelectedKeys.push('caregiverCertificate');
      } else {
        setCaregiverCert(defaultCert);
      }
      if (data.caregiverInfo.caregiverDetailInfo.socialWorkerCertificate) {
        setSocialworkerCert(
          data.caregiverInfo.caregiverDetailInfo.socialWorkerCertificate,
        );
        initialSelectedKeys.push('socialWorkerCertificate');
      } else {
        setSocialworkerCert(defaultCert);
      }
      if (data.caregiverInfo.caregiverDetailInfo.nursingCareCertificate) {
        setNursingCert(
          data.caregiverInfo.caregiverDetailInfo.nursingCareCertificate,
        );
        initialSelectedKeys.push('nursingCareCertificate');
      } else {
        setNursingCert(defaultCert);
      }

      setSelectedKeys(initialSelectedKeys);
    }
  }, [data]);

  const { mutate: updateMy } = usePutMyMutation();

  const handleEditBtnClick = () => {
    const caregiverData: CaregiverMyRequest = {
      phoneNumber: phoneNumber,
      caregiverCertificate: caregiverCert,
      socialWorkerCertificate: socialworkerCert,
      nursingCareCertificate: nursingCert,
      isHavingCar: isCarChecked,
      isCompleteDementiaEducation: isEduChecked,
    };

    // console.log(caregiverData);
    updateMy(caregiverData);
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        }
        center={<NavCenter>프로필 수정하기</NavCenter>}
        color="white"
      />

      <ProfileImgWrapper>
        <img src="" />
      </ProfileImgWrapper>

      <InputBox
        title="휴대전화 번호"
        placeholder="예) 010-1234-5678"
        value={phoneNumber}
        onChange={handlePhoneNumber}
      />

      <>
        {selectedKeys.map((key) => {
          const Card = CERTIFICATE_CARD_MAP[key];
          const label = CERTIFICATE_LABEL[key];
          return (
            <CertCardWrapper key={key}>
              <Card
                initialType={label}
                onChange={(data) => handleCertificateChange(key, data)}
              />
            </CertCardWrapper>
          );
        })}
      </>

      {selectedKeys.length < 3 && (
        <CardWrapper>
          <Button isBlue={false} onClick={() => setIsModalOpen(true)}>
            <Plus />
            자격증 추가하기
          </Button>
          <CertificateSelectModal
            width="312px"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddCertificate={handleAddCertificate}
          />
        </CardWrapper>
      )}

      <Border style={{ marginTop: '16px' }} />

      <ToggleWrapper>
        <label>치매교육 이수</label>
        <Toggle checked={isEduChecked} onChange={handleEduToggleChange} />
      </ToggleWrapper>

      <Border />

      <ToggleWrapper>
        <label>자차보유</label>
        <Toggle checked={isCarChecked} onChange={handleCarToggleChange} />
      </ToggleWrapper>

      <Bottom>
        <Button isBlue={true} onClick={handleEditBtnClick}>
          프로필 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default CaregiverEditProfilePage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 100px;

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const ProfileImgWrapper = styled.div`
  padding: 24px 0px 16px 0px;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }
`;

const CertCardWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  padding: 20px 0px;
  justify-content: space-between;
  align-items: center;

  label {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Bottom = styled.div`
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Button = styled.button<{ isBlue: boolean }>`
  width: 100%;
  height: 52px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.subBlue};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.white : theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
