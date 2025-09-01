import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Camera } from '@/assets/icons/Camera.svg';
import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { FACILITY_TYPES } from '@/constants/socialworker/institutionFacilityTypes';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
import { useInstitutionForm } from '@/hooks/Socialworker/useInstitutionForm';
import { NursingAssociationInfoRequest } from '@/types/Socialworker/mypage';
import { useUploadInstitutionProfileImage } from '@/api/institutionFunnel';
import {
  useGetSocialWorkerMy,
  usePutInstitutionInfo,
} from '@/api/socialworker';

const SocialworkerEditInstitutionPage = () => {
  const { handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data } = useGetSocialWorkerMy();

  const {
    institutionName,
    institutionCode,
    year,
    types,
    phoneNumber,
    handleChange,
    handleTypesChange,
  } = useInstitutionForm(data?.institutionInfo, setIsChanged);

  const { mutate: uploadImage } = useUploadInstitutionProfileImage();
  const { imgUrl, fileInputRef, handleImageChange, handleCameraClick } =
    useProfileImageUpload<{ file: File; name: string }>({
      initialImgUrl: data?.institutionInfo.institutionImageUrl,
      setIsChanged,
      uploadMutate: uploadImage,
      additionalUploadData: { name: institutionName },
    });

  const { mutate: updateInstitution } = usePutInstitutionInfo();
  const handleEditBtnClick = async () => {
    const institutionData: NursingAssociationInfoRequest = {
      institutionName: institutionName,
      institutionCode: institutionCode,
      openYear: year,
      facilityTypeList: types,
      phoneNumber: phoneNumber,
      profileImageUrl:
        imgUrl ?? data?.institutionInfo.institutionImageUrl ?? '',
    };
    console.log(institutionData);
    updateInstitution(institutionData, {
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
        center={<NavCenter>기관 정보 수정</NavCenter>}
        color="white"
      />

      <ProfileImgWrapper>
        <div>
          <img src={imgUrl} alt="기관 프로필 이미지" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Camera onClick={handleCameraClick} />
        </div>
      </ProfileImgWrapper>

      <CardContainer>
        <label className="title">
          소속된 기관명 <span className="star">*</span>
        </label>
        <label className="detail">
          소속된 기관의 정확한 명칭을 검색해 주세요.
        </label>
        <Input
          placeholder="소속된 기관명"
          value={institutionName}
          onChange={(e) => handleChange('institutionName', e.target.value)}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">소속된 기관 코드</label>
        <Input
          placeholder="소속된 기관 코드"
          value={institutionCode}
          onChange={(e) => handleChange('institutionCode', e.target.value)}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">
          개소 연도 <span className="star">*</span>
        </label>
        <label className="detail">
          센터가 설립되고 운영을 시작한 해를 입력해 주세요.
        </label>
        <Input
          placeholder="개소 연도"
          value={year}
          onChange={(e) => handleChange('year', e.target.value)}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">
          시설 유형 <span className="star">*</span>
        </label>
        <label className="detail">복수 선택이 가능해요.</label>
        {FACILITY_TYPES.map((type) => (
          <CheckCard
            key={type}
            pressed={types.includes(type)}
            text={type}
            onClick={() => handleTypesChange(type)}
          />
        ))}
      </CardContainer>

      <CardContainer>
        <label className="title">
          연락처 <span className="star">*</span>
        </label>
        <label className="detail">기관 대표 전화번호를 입력해 주세요.</label>
        <Input
          placeholder="연락처"
          value={phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
        />
      </CardContainer>

      <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          기관 정보 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default SocialworkerEditInstitutionPage;

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
  align-items: center;
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

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .star {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Input = styled.input`
  //   width: 100%;
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
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
