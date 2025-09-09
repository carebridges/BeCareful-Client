import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Camera } from '@/assets/icons/Camera.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import InputBox from '@/components/common/InputBox/InputBox';
import { CertificateSelectModal } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateSelectModal';
import { CERTIFICATE_CARD_MAP } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateComponentMap';
import { CERTIFICATE_LABEL } from '@/constants/caregiver/certificateLabel';
import { CaregiverMyRequest } from '@/types/Caregiver/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
import { usePutMyMutation } from '@/hooks/Caregiver/mutation/usePutMyMutation';
import { useCaregiverBasicForm } from '@/hooks/Caregiver/mypage/useCaregiverBasicForm';
import { useCaregiverCertForm } from '@/hooks/Caregiver/mypage/useCaregiverCertForm';
import { useCaregiverMyPageInfoQuery } from '@/api/caregiver';
import { useUploadCareGiverProfileImage } from '@/api/caregiverFunnel';

const CaregiverEditProfilePage = () => {
  const { handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data, error } = useCaregiverMyPageInfoQuery();
  if (error) {
    console.log('getCaregiverMyPageInfo 에러: ', error);
  }

  const {
    phoneNumber,
    isEduChecked,
    isCarChecked,
    handlePhoneNumber,
    handleEduToggleChange,
    handleCarToggleChange,
  } = useCaregiverBasicForm(data?.caregiverInfo, setIsChanged);

  const {
    caregiverCert,
    socialworkerCert,
    nursingCert,
    selectedKeys,
    isModalOpen,
    setIsModalOpen,
    handleCertificateChange,
    handleAddCertificate,
  } = useCaregiverCertForm(
    data?.caregiverInfo.caregiverDetailInfo,
    setIsChanged,
  );

  const { mutate: uploadImage } = useUploadCareGiverProfileImage();
  const { imgUrl, fileInputRef, handleImageChange, handleCameraClick } =
    useProfileImageUpload<File>({
      initialImgUrl: data?.caregiverInfo.profileImageUrl,
      setIsChanged,
      uploadMutate: uploadImage,
    });

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
    updateMy(caregiverData, {
      onSuccess: () => {
        handleGoBack();
        setIsChanged(false);
      },
    });
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>프로필 수정하기</NavCenter>}
        color="white"
      />

      <ProfileImgWrapper>
        <div>
          <img src={imgUrl} alt="협회 프로필 이미지" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Camera onClick={handleCameraClick} />
        </div>
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
          <Button
            height="52px"
            variant="subBlue"
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
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
  margin-top: -16px;
  display: flex;
  justify-content: center;

  div {
    width: 100px;
    height: 100px;
    position: relative;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }

  input {
    display: none;
  }

  svg {
    position: absolute;
    top: 68px;
    left: 68px;
    cursor: pointer;
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
