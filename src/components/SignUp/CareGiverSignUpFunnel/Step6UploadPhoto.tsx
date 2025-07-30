import {
  useRegisterCaregiver,
  useUploadCareGiverProfileImage,
} from '@/api/caregiverFunnel';
import { Button } from '@/components/common/Button/Button';
import { CaregiverProfileImageUploader } from '@/components/SignUp/CareGiverSignUpFunnel/Step6UploadPhoto/CaregiverProfileImageUploader';

import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';
import { styled } from 'styled-components';

export const Step6UploadPhoto = () => {
  const { goToNext, formData, setFormData } = useCaregiverSignUpContext();

  const { mutate: uploadImage } = useUploadCareGiverProfileImage();
  const { mutate: registerCaregiver, isPending } = useRegisterCaregiver();

  const handleImageUpload = (file: File) => {
    uploadImage(
      { file },
      {
        onSuccess: (url) => {
          setFormData((prev) => ({
            ...prev,
            profileImageUrl: url,
          }));
        },
        onError: () => {
          alert('이미지 업로드에 실패했습니다.');
        },
      },
    );
  };

  const handleSubmit = () => {
    registerCaregiver(formData, {
      onSuccess: () => {
        console.log('회원가입 완료');
        goToNext();
      },
      onError: () => {
        alert('회원가입에 실패했습니다.');
      },
    });
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          프로필 사진을 등록해주세요 <br />
          <span className="subtext">
            프로필 사진을 등록하시면 지원 합격률이 올라가요
          </span>
        </Title>
      </HeaderSection>
      <ProfileContainer>
        <CaregiverProfileImageUploader
          imageUrl={formData.profileImageUrl}
          onChange={handleImageUpload}
        />
      </ProfileContainer>
      <ButtonContainer>
        <Button
          onClick={handleSubmit}
          height="52px"
          variant="blue"
          disabled={isPending}
        >
          {isPending ? '등록 중...' : '시작하기'}
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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0px 20px;
`;
