import { useUploadElderlyProfileImage } from '@/api/elderly';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { ProfileImageUploader } from '@/components/SocialWorker/common/ProfileImageUploader';
import { AddressSelectSection } from '@/components/SocialWorker/ElderyRegister/AddressSelectSection';
import { BirthInputSection } from '@/components/SocialWorker/ElderyRegister/BirthInputSection';
import { CareTypeSection } from '@/components/SocialWorker/ElderyRegister/CareTypeSection';
import { GenderSelectSection } from '@/components/SocialWorker/ElderyRegister/GenderSelectSection';
import { GradeSelectSection } from '@/components/SocialWorker/ElderyRegister/GradeSelectSection';
import { HealthConditionSection } from '@/components/SocialWorker/ElderyRegister/HealthConditionSection';
import { InmateSection } from '@/components/SocialWorker/ElderyRegister/InmateSection';
import { NameInputSection } from '@/components/SocialWorker/ElderyRegister/NameInputSection';
import { PetSection } from '@/components/SocialWorker/ElderyRegister/PetSection';
import { SubmitSection } from '@/components/SocialWorker/ElderyRegister/SubmitSection';
import { AreaSocials } from '@/data/AreaSocial';
import { AreaSelectData } from '@/types/common/matching';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import styled from 'styled-components';
import { useElderDetail } from '@/api/matching.socialWorker';
import { useElderlyEditForm } from '@/hooks/Elderly/useElderlyEditForm';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';

export const ElderlyEditPage = () => {
  const navigate = useNavigate();
  const { elderlyId } = useParams<{ elderlyId: string }>();

  const id = Number(elderlyId);

  const { data, isLoading, isError } = useElderDetail(id);

  const areaData: AreaSelectData[] = AreaSocials.city;

  const form = useElderlyEditForm({
    elderlyId: id,
    elderlyInfo: data?.elderlyInfo,
  });

  const { mutate: uploadImage } = useUploadElderlyProfileImage();

  const handleImageUpload = (file: File) => {
    uploadImage(
      { file },
      {
        onSuccess: ({ tempKey, previewUrl }) => {
          form.setProfileImageTempKey(tempKey);
          form.setProfileImagePreviewUrl(previewUrl);
        },
        onError: () => {
          alert('이미지 업로드에 실패했습니다.');
        },
      },
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError || !data) {
    return <ErrorIndicator />;
  }
  return (
    <Container>
      <NavBar
        left={
          <NavLeft onClick={() => navigate(-1)}>
            <ArrowLeft />
          </NavLeft>
        }
        center={<NavCenter>어르신 수정</NavCenter>}
      />

      <MainContent>
        <ProfileWrapper>
          <ProfileImageUploader
            imageUrl={form.profileImagePreviewUrl}
            onChange={(file) => handleImageUpload(file)}
          />
        </ProfileWrapper>

        <NameInputSection name={form.name} onChange={form.setName} />
        <BirthInputSection birth={form.birth} onChange={form.setBirth} />
        <GenderSelectSection gender={form.gender} onChange={form.setGender} />
        <GradeSelectSection
          selectedGrade={form.selectedGrade}
          onChange={form.setSelectedGrade}
        />
        <AddressSelectSection
          areaData={areaData}
          selectedArea={form.selectedArea}
          detailAddress={form.detailAddress}
          onSelect={form.setSelectedArea}
          onDetailChange={form.setDetailAddress}
        />
        <HealthConditionSection
          healthCondition={form.healthCondition}
          onChange={form.setHealthCondition}
        />
        <CareTypeSection
          selectedCare={form.selectedCare}
          setSelectedCare={form.setSelectedCare}
          selectedDetails={form.selectedDetails}
          setSelectedDetails={form.setSelectedDetails}
        />

        <InmateSection inmate={form.hasInmate} onChange={form.sethasInmate} />
        <PetSection pet={form.hasPet} onChange={form.sethasPet} />
        <SubmitSection onSubmit={form.handleSubmit} isValid={form.isValid} />
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  margin: auto 20px;
`;

const NavLeft = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const MainContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
