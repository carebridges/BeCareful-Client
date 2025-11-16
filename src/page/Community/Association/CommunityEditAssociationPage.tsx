import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import InputBox from '@/components/common/InputBox/InputBox';
import ProfileImgUploader from '@/components/common/ProfileImgUploader';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useAssociationChangeForm } from '@/hooks/Community/Association/useAssociationChangeForm';
import { useProfileImg } from '@/hooks/useProfileImg';
import { AssociationInfoRequest } from '@/types/Community/association';
import {
  useAssociationInfo,
  usePutAssociationInfo,
} from '@/api/communityAssociation';

const CommunityEditAssociationPage = () => {
  const { handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data } = useAssociationInfo();

  const profileUpload = useProfileImg('/association/profile-img/presigned-url');
  const [isImgActionSheetOpen, setIsImgActionSheetOpen] = useState(false);

  const { name, year, handleNameChange, handleYearChange } =
    useAssociationChangeForm(data, setIsChanged);

  const { mutate: updateAssociation } = usePutAssociationInfo();
  const handleEditBtnClick = async () => {
    const profileUrl = profileUpload.getProfileImageKeyForServer();

    const associationRequest: AssociationInfoRequest = {
      profileImageTempKey: profileUrl,
      associationName: name,
      associationEstablishedYear: Number(year),
    };
    // console.log(associationRequest);
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

      {/* title="협회 대표 대문 사진을 설정해 주세요." */}
      <ProfileImgUploader
        hook={profileUpload}
        initialImgUrl={data?.associationProfileImageUrl ?? ''}
        defaultImgUrl=""
        isImgActionSheetOpen={isImgActionSheetOpen}
        setIsImgActionSheetOpen={setIsImgActionSheetOpen}
        setIsChanged={setIsChanged}
      />

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
