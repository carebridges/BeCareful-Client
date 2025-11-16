import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';

import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';

import { ProfileImageUploader } from '@/components/SignUp/InstitutionFunnel/Step5UploadPhoto/ProfileImageUploader';
import { useUploadInstitutionProfileImage } from '@/api/institutionFunnel';
import { useState } from 'react';

interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
  institutionFormData: InstitutionFormData;
  setInstitutionFormData: React.Dispatch<
    React.SetStateAction<InstitutionFormData>
  >;
}

export const Step5UploadPhoto = ({
  goToNext,
  goToPrev,

  setInstitutionFormData,
}: StepProps) => {
  const { mutate: uploadImage } = useUploadInstitutionProfileImage();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleImageUpload = (file: File) => {
    uploadImage(file, {
      onSuccess: ({ tempKey, previewUrl }) => {
        setInstitutionFormData((prev) => ({
          ...prev,
          profileImageTempKey: tempKey,
        }));

        setPreviewUrl(previewUrl);
      },
      onError: () => {
        alert('이미지 업로드에 실패했습니다.');
      },
    });
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관의 사진을 등록하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 기관의 대표 사진을 업로드해 주세요.(선택)</SubText>
      </HeaderSection>

      <ProfileContainer>
        <ProfileImageUploader
          imageUrl={previewUrl ?? undefined}
          onChange={handleImageUpload}
        />
      </ProfileContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button onClick={goToNext} height="52px" variant="blue">
          다음
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
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
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
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0px 20px;
`;
