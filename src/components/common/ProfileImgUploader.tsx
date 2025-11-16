import styled from 'styled-components';
import { ReactComponent as Camera } from '@/assets/icons/Camera.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { Button } from '@/components/common/Button/Button';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { useProfileImg } from '@/hooks/useProfileImg';

interface ProfileImgUploaderProps {
  hook: ReturnType<typeof useProfileImg>;
  initialImgUrl: string;
  defaultImgUrl: string;
  isImgActionSheetOpen: boolean;
  setIsImgActionSheetOpen: (v: boolean) => void;
  setIsChanged: (v: boolean) => void;
}

const ProfileImgUploader = ({
  hook,
  initialImgUrl,
  defaultImgUrl,
  isImgActionSheetOpen,
  setIsImgActionSheetOpen,
  setIsChanged,
}: ProfileImgUploaderProps) => {
  const {
    fileInputRef,
    previewUrl,
    setPreviewUrl,
    selectedImgAction,
    setSelectedImgAction,
    handleImageChange,
  } = hook;

  //   const imgUrl = previewUrl ?? initialImgUrl ?? '/assets/default-profile.png';
  const imgUrl = previewUrl ?? initialImgUrl;

  const handleActionSheetConfirm = () => {
    if (selectedImgAction === '기본') {
      setPreviewUrl(defaultImgUrl);
    } else if (selectedImgAction === '앨범') {
      fileInputRef.current?.click();
    }
    setIsImgActionSheetOpen(false);
    setIsChanged(true);
  };

  return (
    <Container>
      <ProfileImgWrapper>
        <div>
          <img src={imgUrl} alt="프로필 이미지" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageChange(file);
            }}
          />
          <Camera onClick={() => setIsImgActionSheetOpen(true)} />
        </div>
      </ProfileImgWrapper>

      <BottomSheet
        isOpen={isImgActionSheetOpen}
        setIsOpen={setIsImgActionSheetOpen}
        // title={actionSheetTitle}
        title="프로필 사진을 설정해 주세요."
        titleStar={false}
      >
        <CheckButton
          active={selectedImgAction === '기본'}
          onClick={() => setSelectedImgAction('기본')}
        >
          <Check />
          기본 커버 선택
        </CheckButton>
        <CheckButton
          active={selectedImgAction === '앨범'}
          onClick={() => setSelectedImgAction('앨범')}
        >
          <Check />
          앨범에서 사진 선택
        </CheckButton>
        <DeleteButtons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={() => setIsImgActionSheetOpen(false)}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={handleActionSheetConfirm}
          >
            확인
          </Button>
        </DeleteButtons>
      </BottomSheet>
    </Container>
  );
};

export default ProfileImgUploader;

const Container = styled.div``;

const ProfileImgWrapper = styled.div`
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

const CheckButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.mainBlue : '')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};

    path {
      fill: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`;

const DeleteButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding-top: 66px;
`;
