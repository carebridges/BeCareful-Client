import styled from 'styled-components';
import { ReactComponent as Setting } from '@/assets/icons/Setting.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import ProfileCard from '@/components/common/card/ProfileCard';
import BelongCard from '@/components/SocialWorker/MyPage/BelongCard';
import AssociationCard from '@/components/common/card/AssociationCard';
import InstitutionCard from '@/components/common/card/InstitutionCard';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import { ASSOCIATION_RANK_EN_TO_KR } from '@/constants/common/associationRank';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGetSocialWorkerMy } from '@/api/socialworker';

const SocialworkerMyPage = () => {
  const { handleNavigate } = useHandleNavigate();

  const { data } = useGetSocialWorkerMy();
  const isNone = data?.socialWorkerInfo.associationRank === 'NONE';

  return (
    <Container>
      <NavBar
        left={<NavLeft>마이페이지</NavLeft>}
        right={
          <Setting onClick={() => handleNavigate('/socialworker/my/setting')} />
        }
      />

      <ProfileWrapper>
        <ProfileCard
          profileImgURL={data?.socialWorkerInfo.profileImageUrl ?? ''}
          name={data?.socialWorkerInfo.name ?? ''}
          nickname={data?.socialWorkerInfo.nickName ?? ''}
          chevronClick={() => handleNavigate('/socialworker/my/profile')}
          phoneNumber={data?.socialWorkerInfo.phoneNumber ?? ''}
          age={data?.socialWorkerInfo.age ?? 0}
          gender={GENDER_EN_TO_KR_2[data?.socialWorkerInfo.gender ?? 'FEMALE']}
        />

        <BelongCard
          title={data?.institutionInfo.institutionName ?? ''}
          rank={
            INSTITUTION_RANK_EN_TO_KR[
              data?.socialWorkerInfo.institutionRank ?? 'SOCIAL_WORKER'
            ]
          }
        />

        {!isNone && (
          <BelongCard
            title={data?.associationInfo.associationName ?? ''}
            rank={
              ASSOCIATION_RANK_EN_TO_KR[
                data?.socialWorkerInfo.associationRank ?? 'MEMBER'
              ]
            }
          />
        )}
      </ProfileWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">기관 정보</label>
        <InstitutionCard
          institution={data?.institutionInfo.institutionName ?? ''}
          institutionRank={data?.socialWorkerInfo.institutionRank}
          year={data?.institutionInfo.institutionOpenYear ?? 0}
          types={data?.institutionInfo.facilityTypes ?? []}
          phoneNumber={data?.institutionInfo.institutionPhoneNumber ?? ''}
        />
      </SectionWrapper>

      {!isNone && (
        <>
          <Border />

          <SectionWrapper>
            <label className="section-title">협회 정보</label>
            <AssociationCard
              association={data?.associationInfo.associationName ?? ''}
              onClick={() => handleNavigate('/socialworker/my/association')}
              type={
                ASSOCIATION_RANK_EN_TO_KR[
                  data?.socialWorkerInfo.associationRank ?? 'MEMBER'
                ]
              }
            />
          </SectionWrapper>
        </>
      )}
    </Container>
  );
};

export default SocialworkerMyPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 57px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  svg {
    cursor: pointer;
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  padding-top: 12px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .section-title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
