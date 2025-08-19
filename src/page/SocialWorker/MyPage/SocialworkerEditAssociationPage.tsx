import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Camera } from '@/assets/icons/Camera.svg';
import { ReactComponent as WithdrawIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import InputBox from '@/components/common/InputBox/InputBox';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useAssociationChangeForm } from '@/hooks/Community/Association/useAssociationChangeForm';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
import {
  useAssociationInfo,
  usePutAssociationInfo,
  usePutAssociationLeave,
} from '@/api/communityAssociation';
import { AssociationInfoRequest } from '@/types/Community/association';
import { useUploadAssociationProfileImage } from '@/api/communityFunnel';

const SocialworkerEditAssociationPage = () => {
  const { handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data } = useAssociationInfo();

  const { name, year, handleNameChange, handleYearChange } =
    useAssociationChangeForm(data, setIsChanged);

  const { mutate: uploadImage } = useUploadAssociationProfileImage();
  const { imgUrl, fileInputRef, handleImageChange, handleCameraClick } =
    useProfileImageUpload<File>({
      initialImgUrl: data?.associationProfileImageUrl,
      setIsChanged,
      uploadMutate: uploadImage,
    });

  const { mutate: leaveAssociation } = usePutAssociationLeave();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };
  const handleWithdraw = () => {
    console.log('협회탈퇴');
    leaveAssociation(undefined, {
      onSuccess: () => {
        handleModal(setIsWithdrawModalOpen);
        handleGoBack();
      },
    });
  };

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

      <Border />

      <WithdrawWrapper>
        <label className="title">탈퇴하기</label>
        <Withdraw onClick={() => handleModal(setIsWithdrawModalOpen)}>
          <WithdrawIcon />
          탈퇴하기
        </Withdraw>
      </WithdrawWrapper>

      <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          협회 정보 수정하기
        </Button>
      </Bottom>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => handleModal(setIsWithdrawModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsWithdrawModalOpen)}
          title="정말 탈퇴 하시겠습니까?"
          detail={`${data?.associationName} 커뮤니티에서 탈퇴됩니다.\n계속하시겠습니까?`}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => handleModal(setIsWithdrawModalOpen)}
          handleRightBtnClick={handleWithdraw}
        />
      </Modal>
    </Container>
  );
};

export default SocialworkerEditAssociationPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;

  display: flex;
  flex-direction: column;
  gap: 40px;
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

const WithdrawWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Withdraw = styled.div`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
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
