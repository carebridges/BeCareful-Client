import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Camera } from '@/assets/icons/Camera.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import InputBox from '@/components/common/InputBox/InputBox';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  UploadResult,
  useProfileImageUpload,
} from '@/hooks/useProfileImageUpload';
import { useAssociationChangeForm } from '@/hooks/Community/Association/useAssociationChangeForm';
import { AssociationInfoRequest } from '@/types/Community/association';
import {
  useAssociationInfo,
  usePutAssociationInfo,
} from '@/api/communityAssociation';
import { useUploadAssociationProfileImage } from '@/api/communityFunnel';

const CommunityEditAssociationPage = () => {
  const { handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data } = useAssociationInfo();

  const { mutate: uploadImage } = useUploadAssociationProfileImage();
  const { imgUrl, fileInputRef, handleImageChange, handleCameraClick } =
    useProfileImageUpload<File, UploadResult>({
      initialImgUrl: data?.associationProfileImageUrl,
      setIsChanged,
      uploadMutate: uploadImage,
      getUrl: (res) => res.previewUrl,
    });

  const { name, year, handleNameChange, handleYearChange } =
    useAssociationChangeForm(data, setIsChanged);

  const { mutate: updateAssociation } = usePutAssociationInfo();
  const handleEditBtnClick = async () => {
    const associationRequest: AssociationInfoRequest = {
      associationImageUrl: imgUrl ?? data?.associationProfileImageUrl ?? '',
      associationName: name,
      associationEstablishedYear: Number(year),
    };
    updateAssociation(associationRequest, {
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
        center={<NavCenter>협회 정보 수정</NavCenter>}
        color=""
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
        title="협회명"
        detail="협회의 정확한 명칭을 입력해 주세요."
        placeholder="협회명을 입력해주세요"
        value={name}
        onChange={handleNameChange}
      />

      <InputBox
        title="협회 설립일"
        detail="협회의 설립일을 입력해 주세요."
        placeholder="예) 2000"
        value={year}
        onChange={handleYearChange}
        pattern="[0-9]{4}"
        min="1900"
        max={new Date().getFullYear()}
      />

      <Bottom>
        <Button
          height="52px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          협회 정보 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default CommunityEditAssociationPage;

const Container = styled.div`
  margin: 0px 20px;
  margin-bottom: 120px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
