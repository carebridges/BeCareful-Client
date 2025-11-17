import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { SearchInput } from '@/components/SignUp/CareGiverSignUpFunnel/common/SearchInput';
import { PostcodeModal } from '@/components/SignUp/CareGiverSignUpFunnel/Step5CurrentAddress/PostcodeEmbed';
import { CertificateSelectModal } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateSelectModal';
import { CAREGIVER_CERTIFICATE_CARD_MAP } from '@/components/SignUp/CareGiverSignUpFunnel/Step2AddCertificate/CertificateComponentMap';
import InputBox from '@/components/common/InputBox/InputBox';
import BirthInputBox from '@/components/common/InputBox/BirthInputBox';
import ProfileImgUploader from '@/components/common/ProfileImgUploader';
import { CERTIFICATE_LABEL } from '@/constants/caregiver/certificateLabel';
import { CaregiverMyRequest } from '@/types/Caregiver/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { usePutMyMutation } from '@/hooks/Caregiver/mutation/usePutMyMutation';
import { useCaregiverBasicForm } from '@/hooks/Caregiver/mypage/useCaregiverBasicForm';
import { useCaregiverCertForm } from '@/hooks/Caregiver/mypage/useCaregiverCertForm';
import { useProfileImg } from '@/hooks/useProfileImg';
import { useCaregiverMyPageInfoQuery } from '@/api/caregiver';

const CaregiverEditProfilePage = () => {
  const { handleNavigate, handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data, error } = useCaregiverMyPageInfoQuery();
  if (error) {
    console.log('getCaregiverMyPageInfo 에러: ', error);
  }

  const profileUpload = useProfileImg('/caregiver/profile-img/presigned-url');
  const [isImgActionSheetOpen, setIsImgActionSheetOpen] = useState(false);

  const {
    name,
    birth,
    phoneNumber,
    isEduChecked,
    isCarChecked,
    handleEduToggleChange,
    handleCarToggleChange,
    streetAddress,
    detailAddress,
    isAddressModalOpen,
    setIsAddressModalOpen,
    handleAddressComplete,
    handleDetailAddressChange,
  } = useCaregiverBasicForm(data?.caregiverInfo, setIsChanged);

  const {
    caregiverCert,
    socialworkerCert,
    nursingCert,
    selectedKeys,
    isAddCertModalOpen,
    setIsAddCertModalOpen,
    handleCertificateChange,
    handleAddCertificate,
    handleDeleteCertificate,
  } = useCaregiverCertForm(
    data?.caregiverInfo.caregiverDetailInfo,
    setIsChanged,
  );

  const { mutate: updateMy } = usePutMyMutation();
  const handleEditBtnClick = () => {
    const profileUrl = profileUpload.getProfileImageKeyForServer();

    const caregiverData: CaregiverMyRequest = {
      phoneNumber: phoneNumber,
      profileImageTempKey: profileUrl,
      caregiverCertificate: caregiverCert,
      socialWorkerCertificate: socialworkerCert,
      nursingCareCertificate: nursingCert,
      address: {
        streetAddress: streetAddress,
        detailAddress: detailAddress,
      },
      isHavingCar: isCarChecked,
      isCompleteDementiaEducation: isEduChecked,
    };
    console.log(caregiverData);
    updateMy(caregiverData, {
      onSuccess: () => {
        handleNavigate('/caregiver/my');
        setIsChanged(false);
      },
    });
  };

  const defaultImgUrl =
    'https://care-bridges-bucket.s3.ap-northeast-2.amazonaws.com/caregiver-profile-image/default/caregiver_default.png';

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>프로필 수정</NavCenter>}
        color="white"
      />

      {/* <ProfileImageEditor<File, UploadResult>
        initialImgUrl={data?.caregiverInfo.profileImageUrl}
        uploadMutate={uploadImage}
        setIsChanged={setIsChanged}
        onImageChange={(url) => setProfileImgUrl(url)}
        getUrl={(res) => res.presignedUrl}
        setIsImgChanged={setIsImgChanged}
        actionSheetTitle="프로필 사진을 설정해주세요"
      /> */}
      <ProfileImgUploader
        hook={profileUpload}
        initialImgUrl={data?.caregiverInfo.profileImageUrl ?? defaultImgUrl}
        defaultImgUrl={defaultImgUrl}
        isImgActionSheetOpen={isImgActionSheetOpen}
        setIsImgActionSheetOpen={setIsImgActionSheetOpen}
        setIsChanged={setIsChanged}
      />

      <InputWrapper>
        <InputBox title="이름" gray={true} value={name} />
        <BirthInputBox birth={birth} />
        <InputBox title="휴대전화" gray={true} value={phoneNumber} />
        <AddressWrapper>
          <label className="title">
            주소 <span>*</span>
          </label>
          <SearchInput
            placeholder="도로명, 지번, 건물명 검색"
            onClick={() => setIsAddressModalOpen(true)}
            value={streetAddress}
            readOnly
          />
          <PlainInputBox
            width=""
            state="default"
            placeholder="상세 주소 입력"
            guide=""
            value={detailAddress}
            onChange={handleDetailAddressChange}
          />
        </AddressWrapper>
      </InputWrapper>

      <Border style={{ marginTop: '12px', marginBottom: '24px' }} />

      <CertWrapper>
        {selectedKeys.map((key) => {
          const Card = CAREGIVER_CERTIFICATE_CARD_MAP[key];
          const label = CERTIFICATE_LABEL[key];
          return (
            <CertCardWrapper key={key}>
              <Card
                initialType={label}
                onChange={(data) => handleCertificateChange(key, data)}
                initialCert={data?.caregiverInfo.caregiverDetailInfo?.[key]}
                onDelete={() => handleDeleteCertificate(key)}
              />
            </CertCardWrapper>
          );
        })}
      </CertWrapper>

      {selectedKeys.length < 3 && (
        <CardWrapper>
          <Button
            height="52px"
            variant="subBlue"
            onClick={() => setIsAddCertModalOpen(true)}
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
            isOpen={isAddCertModalOpen}
            onClose={() => setIsAddCertModalOpen(false)}
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

      <PostcodeModal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onComplete={handleAddressComplete}
      />
    </Container>
  );
};

export default CaregiverEditProfilePage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 100px;

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

const InputWrapper = styled.div`
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const CertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CertCardWrapper = styled.div`
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
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
