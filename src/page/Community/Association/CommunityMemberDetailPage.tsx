import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import { LogoutButton } from '@/components/common/Button/LogoutButton';
import AssociationCard from '@/components/shared/AssociationCard';
import InstitutionCard from '@/components/shared/InstitutionCard';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import ProfileCard from '@/components/shared/ProfileCard';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { INSTITUTION_RANK_EN_TO_KR } from '@/constants/common/institutionRank';
import {
  ASSOCIATION_RANK_KR_TO_EN,
  ASSOCIATION_RANK_EN_TO_KR,
  ASSOCIATION_MEMBER_TYPES,
} from '@/constants/common/associationRank';
import { MemberRankRequest } from '@/types/Community/association';
import { ServerErrorResponse } from '@/types/common/ServerError';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { AxiosError } from 'axios';
import {
  useMemberExpel,
  useMembersDetail,
  usePutMembersRank,
} from '@/api/communityAssociation';
import { useGetSocialWorkerMy } from '@/api/socialworker';

const CommunityMemberDetailPage = () => {
  const { memberId } = useParams<{ memberId: string }>();

  const { data: myData } = useGetSocialWorkerMy();
  const isChairman = myData?.socialWorkerInfo.associationRank === 'CHAIRMAN';

  const { data } = useMembersDetail(Number(memberId));

  const { handleGoBack } = useHandleNavigate();

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [memberType, setMemberType] = useState(
    ASSOCIATION_RANK_EN_TO_KR[data?.associationRank ?? 'MEMBER'],
  );
  const [isChanged, setIsChanged] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setMemberType(ASSOCIATION_RANK_EN_TO_KR[data.associationRank]);
    }
  }, [data]);

  const handleMemberTypeChange = (type: string) => {
    setMemberType(type);
    setIsChanged(true);
  };

  const { mutate: updateRank } = usePutMembersRank();

  const handleMemberModalBtn = () => {
    const memberInfo: MemberRankRequest = {
      memberId: Number(memberId),
      associationRank: ASSOCIATION_RANK_KR_TO_EN[memberType],
    };
    updateRank(memberInfo, {
      onSuccess: () => {
        setIsTypeModalOpen(false);
        setIsChanged(false);
      },
      onError: (error: AxiosError<ServerErrorResponse>) => {
        setIsTypeModalOpen(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const apiMessage = error.response.data.message;
          if (apiMessage === '최소 한 명의 임원진이 유지되어야 합니다.') {
            setIsErrorModalOpen(true);
          }
        }
      },
    });
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
        gender={GENDER_EN_TO_KR_2[data.gender]}
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
          type={ASSOCIATION_RANK_EN_TO_KR[data?.associationRank]}
          rank={INSTITUTION_RANK_EN_TO_KR[data?.institutionRank]}
        />
        {isChairman && (
          <Button
            height="52px"
            variant="mainBlue"
            onClick={() => setIsTypeModalOpen(true)}
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
            <LogoutButton content="내보내기" onClick={() => handleExpel()} />
          </SectionWrapper>
        </>
      )}

      <Modal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)}>
        <ModalWrapper>
          <ModalXImg onClick={() => setIsTypeModalOpen(false)} />
          <ModalTitle>협회 회원 유형 변경</ModalTitle>
          <CheckWrapper>
            {ASSOCIATION_MEMBER_TYPES.map((type) => (
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
              onClick={() => setIsTypeModalOpen(false)}
            >
              취소
            </Button>
            <Button
              height="52px"
              variant={isChanged ? 'mainBlue' : 'disabled'}
              disabled={!isChanged}
              onClick={handleMemberModalBtn}
            >
              변경하기
            </Button>
          </ModalButtonWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      >
        <ModalLimit
          title="임원진이 1명만 남아 있습니다."
          detail={'공석을 방지하려면\n새로운 임원진을 먼저 추가해 주세요.'}
          onClose={() => setIsErrorModalOpen(false)}
          handleBtnClick={() => setIsErrorModalOpen(false)}
        />
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
