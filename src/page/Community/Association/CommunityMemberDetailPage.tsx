import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as ExpelIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import AssociationCard from '@/components/shared/AssociationCard';
import InstitutionCard from '@/components/shared/InstitutionCard';
import Modal from '@/components/common/Modal/Modal';
import ProfileCard from '@/components/shared/ProfileCard';
import { Gender_Mapping } from '@/constants/caregiverMapping';
import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import {
  API_Association_Rank_Mapping,
  Association_Rank_Mapping,
} from '@/constants/associationRank';
import { MemberRankRequest } from '@/types/Community/association';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  useMemberExpel,
  useMembersDetail,
  usePutMembersRank,
} from '@/api/communityAssociation';

const CommunityMemberDetailPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  // const { postId: postIdParam } = useParams<{ postId: string }>();
  // const postId = postIdParam ? parseInt(postIdParam, 10) : 0;

  const userInfo = useRecoilValue(currentUserInfo);
  const isChairman = userInfo.associationRank === 'CHAIRMAN';

  const { data } = useMembersDetail(Number(memberId));

  const { handleGoBack } = useHandleNavigate();

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const memberTypes = ['임원진', '회원'];
  const [memberType, setMemberType] = useState(
    Association_Rank_Mapping[data?.associationRank ?? 'MEMBER'],
  );
  const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   if (data) {
  //     setMemberType(Association_Rank_Mapping[data.associationRank]);
  //   }
  // }, [data]);

  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  const handleMemberTypeChange = (type: string) => {
    setMemberType(type);
    setIsDisabled(false);
  };

  const { mutate: updateRank } = usePutMembersRank();

  const handleMemberModalBtn = () => {
    const memberInfo: MemberRankRequest = {
      memberId: Number(memberId),
      associationRank: API_Association_Rank_Mapping[memberType],
    };
    updateRank(memberInfo);
    handleModal(setIsTypeModalOpen);
    setIsDisabled(true);
  };

  const { mutate: handleExpel } = useMemberExpel(Number(memberId));

  if (!data) {
    return <div>해당 회원의 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회원 정보</NavCenter>}
        color="white"
      />

      <ProfileCard
        profileImgURL={data.institutionImageUrl}
        name={data.name}
        nickname={data.nickName}
        phoneNumber={data.phoneNumber}
        age={data.age}
        gender={Gender_Mapping[data.gender]}
      />

      <SectionWrapper>
        <label className="title">기관 정보</label>
        <InstitutionCard
          date={data?.institutionLastUpdate}
          institution={data?.institutionName}
          year={data.institutionOpenYear}
          types={data.facilityTypes}
          phoneNumber={data?.institutionPhoneNumber}
        />
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="title">협회 정보</label>
        <AssociationCard
          association={data?.associationName}
          type={Association_Rank_Mapping[data?.associationRank]}
          rank={Institution_Rank_Mapping[data?.institutionRank]}
        />
        {isChairman && (
          <Button
            height="52px"
            variant="mainBlue"
            onClick={() => handleModal(setIsTypeModalOpen)}
          >
            회원 유형 변경하기
          </Button>
        )}
      </SectionWrapper>

      {isChairman && (
        <>
          <Border style={{ height: '5px' }} />
          <SectionWrapper>
            <label className="title">협회 탈퇴</label>
            <Expel onClick={() => handleExpel()}>
              <ExpelIcon />
              내보내기
            </Expel>
          </SectionWrapper>
        </>
      )}

      <Modal
        isOpen={isTypeModalOpen}
        onClose={() => handleModal(setIsTypeModalOpen)}
      >
        <ModalWrapper>
          <ModalXImg onClick={() => handleModal(setIsTypeModalOpen)} />
          <ModalTitle>협회 회원 유형 변경</ModalTitle>
          <CheckWrapper>
            {memberTypes.map((type) => (
              <CheckButton
                key={type}
                active={memberType === type}
                onClick={() => handleMemberTypeChange(type)}
              >
                <Check />
                {type}
              </CheckButton>
            ))}
          </CheckWrapper>
          <ModalButtonWrapper>
            <Button
              height="52px"
              variant="subBlue"
              onClick={() => handleModal(setIsTypeModalOpen)}
            >
              취소
            </Button>
            <Button
              height="52px"
              variant={isDisabled ? 'disabled' : 'mainBlue'}
              disabled={isDisabled}
              onClick={handleMemberModalBtn}
            >
              변경하기
            </Button>
          </ModalButtonWrapper>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default CommunityMemberDetailPage;

const Container = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Expel = styled.div`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  color: ${({ theme }) => theme.colors.mainOrange};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  margin: 0 -20px;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors.white};
  width: 300px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
