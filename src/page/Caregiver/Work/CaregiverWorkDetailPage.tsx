import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as ModalClose } from '@/assets/icons/Close.svg';
import CaregiverWorkDetail from '@/components/Caregiver/CaregiverWorkDetail';
import { MatchingRecruitmentMediateRequest } from '@/types/Caregiver/work';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { apiMediationFormat } from '@/utils/caregiver';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useRecruitmentDetailQuery } from '@/hooks/Caregiver/caregiverQuery';
import {
  usePostApplyMutation,
  usePostMediateMutation,
  usePostRejectMutation,
} from '@/hooks/Caregiver/mutation/useApplyMutation';

const CaregiverWorkDetailPage = () => {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const numRecruitmentId = Number(recruitmentId);

  const { handleNavigate } = useHandleNavigate();

  // 매칭 공고 상세 조회
  const { data, error } = useRecruitmentDetailQuery(Number(recruitmentId));
  if (error) {
    console.log('getRecruitmentDetail 에러: ', error);
  }

  // 매칭 공고 지원
  const { mutate: applyMutation } = usePostApplyMutation(numRecruitmentId, {
    onSuccessCallback: () => {
      setIsApplyModalOpen(false); // 모달 닫기
    },
  });
  // 매칭 공고 거절
  const { mutate: rejectMutation } = usePostRejectMutation(numRecruitmentId, {
    onSuccessCallback: () => {
      handleModal(setIsDeleteModalOpen, setIsRejectModalOpen);
    },
  });
  // 매칭 공고 근무 조건 조율
  const { mutate: mediateMutation } = usePostMediateMutation(numRecruitmentId, {
    onSuccessCallback: () => {
      handleModal(setIsCompleteMediateModalOpen, setIsMediateModalOpen);
    },
  });

  // 팝업 공통
  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  // 지원하기 팝업
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const handleCompleteApply = () => {
    applyMutation();
  };

  // 거절하기 팝업
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  // 그래도 거절 팝업
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 거절하기 팝업 - 거절하기 버튼
  const handleReject = () => {
    rejectMutation();
  };

  // 근무 조건 조율하기 팝업
  const [isMediateModalOpen, setIsMediateModalOpen] = useState(false);
  const [isCompleteMediateModalOpen, setIsCompleteMediateModalOpen] =
    useState(false);
  // 근무조건 조율 입력 팝업 - 조율하여 지원하기 버튼
  const handleMediate = () => {
    // 조율하여 지원하기 api
    const mediateData: MatchingRecruitmentMediateRequest = {
      mediationTypes: apiMediationFormat(mediationTypes),
      mediationDescription: mediationDescription,
    };
    console.log(mediateData);
    mediateMutation(mediateData);
  };

  // 근무조건 조율하기 필터
  const [mediationTypes, setMediationTypes] = useState<string[]>([]);
  const handleMediationChange = (mediation: string) => {
    setMediationTypes((prev) => {
      if (prev.includes(mediation)) {
        return prev.filter((f) => f !== mediation);
      } else {
        return [...prev, mediation];
      }
    });
  };
  // 근무조건 조율하기 설명
  const [mediationDescription, setMediationDescription] = useState('');
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMediationDescription(e.target.value);
  };

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <CaregiverWorkDetail work={data} />
      <Bottom>
        <Button
          isBlue={false}
          onClick={() => handleModal(setIsRejectModalOpen)}
        >
          거절하기
        </Button>
        <Button isBlue={true} onClick={handleCompleteApply}>
          지원하기
        </Button>
      </Bottom>

      {/* 지원완료 팝업(지원하기 버튼 클릭한 경우) */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => handleModal(setIsApplyModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsApplyModalOpen)}
          title={'일자리 지원이\n성공적으로 완료되었어요!'}
          detail={
            '지원해주셔서 감사합니다.\n검토 후 합격시 채팅으로 메시지를 보내드립니다.'
          }
          left="다른 일자리 보기"
          right="지원 내역 보기"
          handleLeftBtnClick={() => handleNavigate('/caregiver/work')}
          handleRightBtnClick={() => handleNavigate('/caregiver/apply')}
        />
      </Modal>

      {/* 거절하기 팝업(거절하기 버튼 클릭한 경우) */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => handleModal(setIsRejectModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsRejectModalOpen)}
          title={'이 일자리가\n조건에 맞지 않으신가요?'}
          detail={
            '거절하면 이 일자리는 목록에서 삭제됩니다.\n조건이 맞지 않다면 근무 조건 조율을 보내보세요.'
          }
          left="근무조건 조율"
          right="거절하기"
          handleLeftBtnClick={() =>
            handleModal(setIsMediateModalOpen, setIsRejectModalOpen)
          }
          handleRightBtnClick={handleReject}
        />
      </Modal>

      {/* 그래도 거절 팝업 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => handleModal(setIsDeleteModalOpen)}
      >
        <ModalLimit
          onClose={() => handleModal(setIsDeleteModalOpen)}
          title="일자리가 목록에서 삭제되었어요"
          // detail={`${name}님께 맞는 다른 일자리를 찾아볼게요!`}
          detail="이선혜님께 맞는 다른 일자리를 찾아볼게요!"
          button="다른 일자리 보러가기"
          handleBtnClick={() => handleNavigate('/caregiver/work')}
        />
      </Modal>

      {/* 근무조건 조율 팝업 */}
      <Modal
        isOpen={isMediateModalOpen}
        onClose={() => handleModal(setIsMediateModalOpen)}
      >
        <MediateModal>
          <MediateTitle>
            <div className="titles">
              <label className="title">근무조건 조율하기</label>
              <label className="detail">
                조율이 필요한 부분을 선택 후
                <br />
                내용을 자세히 입력해 주세요.
              </label>
            </div>
            <ModalClose
              style={{ cursor: 'pointer' }}
              onClick={() => handleModal(setIsMediateModalOpen)}
            />
          </MediateTitle>

          <MediateContent>
            <div className="filters">
              {['시간 조율', '급여 조율', '요일 조율'].map((filter) => (
                <Filter
                  key={filter}
                  active={mediationTypes.includes(filter)}
                  onClick={() => handleMediationChange(filter)}
                >
                  {filter}
                </Filter>
              ))}
            </div>
            <Mediate
              id="memo"
              placeholder={
                'ex) 근무시간을 몇 시로 조율하고싶어요,\n요일을 월요일로 바꾸고 싶어요.'
              }
              value={mediationDescription}
              onChange={handleDescriptionChange}
            />
          </MediateContent>

          <Button
            isBlue={true}
            disabled={
              mediationDescription.length <= 0 || mediationTypes.length === 0
            }
            style={{
              background:
                mediationDescription.length <= 0 || mediationTypes.length === 0
                  ? '#A6A6A6'
                  : '',
            }}
            onClick={handleMediate}
          >
            조율하여 지원하기
          </Button>
        </MediateModal>
      </Modal>

      {/* 조율 후 지원완료 팝업 */}
      <Modal
        isOpen={isCompleteMediateModalOpen}
        onClose={() => handleModal(setIsCompleteMediateModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsCompleteMediateModalOpen)}
          title={'근무조건을\n조율하여 지원했어요!'}
          detail={
            '입력하신 조건으로 지원이 완료되었습니다.\n검토 후 합격시 채팅으로 메시지를 보내드립니다.'
          }
          left="다른 일자리 보기"
          right="지원 내역 보기"
          handleLeftBtnClick={() => handleNavigate('/caregiver/work')}
          handleRightBtnClick={() => handleNavigate('/caregiver/apply')}
        />
      </Modal>
    </Container>
  );
};

export default CaregiverWorkDetailPage;

const Container = styled.div``;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Button = styled.button<{ isBlue: boolean }>`
  width: 100%;
  height: 52px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, isBlue }) => (isBlue ? 'none' : theme.colors.gray100)};
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.white};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.white : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const MediateModal = styled.div`
  width: 272px;
  height: 356px;
  padding: 28px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const MediateTitle = styled.div`
  display: flex;
  justify-content: space-between;

  .titles {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const MediateContent = styled.div`
  width: 100%;
  height: 196px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .filters {
    display: flex;
    gap: 8px;
  }
`;

const Filter = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 8px 12px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
`;

const Mediate = styled.textarea`
  width: 100%;
  height: 140px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
