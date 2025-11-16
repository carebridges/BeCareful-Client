import styled from 'styled-components';
import ProfileCard from '@/components/common/card/ProfileCard';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { CaregiverInfo } from '@/types/Caregiver/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

interface ProfileSectionProps {
  data: CaregiverInfo | undefined;
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <ProfileWrapper>
      <ProfileCard
        profileImgURL={data?.profileImageUrl ?? ''}
        name={data?.name ?? ''}
        chevronClick={() => handleNavigate('/caregiver/my/profile')}
        phoneNumber={data?.phoneNumber ?? ''}
        age={data?.age ?? 0}
        gender={GENDER_EN_TO_KR_2[data?.gender ?? 'FEMALE']}
      />

      <Bottom>
        <div className="certificateWrapper">
          <label className="title-label">기본 자격</label>
          <div className="certificates">
            <CertificateCard isBlue={data?.caregiverDetailInfo.havingCar}>
              {data?.caregiverDetailInfo.havingCar
                ? '자차 보유'
                : '자차 미보유'}
            </CertificateCard>
            <CertificateCard
              isBlue={data?.caregiverDetailInfo.completeDementiaEducation}
            >
              {data?.caregiverDetailInfo.completeDementiaEducation
                ? '치매교육 이수 완료'
                : '치매교육 이수전'}
            </CertificateCard>
          </div>
        </div>
        <div className="certificateWrapper">
          <label className="title-label">보유 자격증</label>
          <div className="certificates">
            {data?.certificates?.map((certificate, index) => (
              <label key={index} className="certificate">
                {certificate}
              </label>
            ))}
          </div>
        </div>
      </Bottom>
    </ProfileWrapper>
  );
};

export default ProfileSection;

const ProfileWrapper = styled.div`
  padding: 12px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const Bottom = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .certificateWrapper {
    flex-direction: column;
    gap: 16px;
  }

  .certificates {
    gap: 6px;
  }

  .certificate {
    padding: 4px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const CertificateCard = styled.label<{ isBlue: boolean | undefined }>`
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, isBlue }) => (isBlue ? 'none' : theme.colors.gray100)};
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.subBlue : theme.colors.gray50};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
