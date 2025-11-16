import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ReactComponent as ModalClose } from '@/assets/icons/Close.svg';
import CaregiverWorkDetail from '@/components/Caregiver/CaregiverWorkDetail';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Button } from '@/components/common/Button/Button';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useApply } from '@/hooks/Caregiver/work/useApply';
import { useMediate } from '@/hooks/Caregiver/work/useMediate';
import { useRecruitmentDetailQuery } from '@/api/caregiver';

const CaregiverWorkDetailPage = () => {
  const { recruitmentId: recruitmentIdParam } = useParams<{
    recruitmentId: string;
  }>();
  const recruitmentId = Number(recruitmentIdParam);

  const { handleNavigate } = useHandleNavigate();

  // 매칭 공고 상세 조회
  const { data, error } = useRecruitmentDetailQuery(Number(recruitmentId));
  if (error) {
    console.log('getRecruitmentDetail 에러: ', error);
  }

  // 지원하기
  const {
    isApplyModalOpen,
    setIsApplyModalOpen,
    isCompleteApplyModalOpen,
    setIsCompleteApplyModalOpen,
    handleCompleteApply,
  } = useApply(recruitmentId);

  // 조율하기
  const {
    isMediateModalOpen,
    setIsMediateModalOpen,
    isCompleteMediateModalOpen,
    setIsCompleteMediateModalOpen,
    mediationTypes,
    mediationDescription,
    handleMediate,
    handleMediationChange,
    handleDescriptionChange,
  } = useMediate(recruitmentId);

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <CaregiverWorkDetail work={data} />

      <Bottom>
        <Button
          height="52px"
          variant="white"
          onClick={() => setIsMediateModalOpen(true)}
        >
          근무조건 조율하기
        </Button>
        <Button
          height="52px"
          variant="mainBlue"
          onClick={() => setIsApplyModalOpen(true)}
        >
          지원하기
        </Button>
      </Bottom>

      {/* 지원하기 팝업 */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsApplyModalOpen(false)}
          title="일자리에 지원하시겠습니까?"
          detail={
            '지원하기 버튼을 누르면\n기관 담당자에게 근무 지원 메시지가 전달됩니다.'
          }
          left="취소"
          right="지원하기"
          handleLeftBtnClick={() => setIsApplyModalOpen(false)}
          handleRightBtnClick={handleCompleteApply}
        />
      </Modal>

      {/* 지원완료 팝업 */}
      <Modal
        isOpen={isCompleteApplyModalOpen}
        onClose={() => setIsCompleteApplyModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsCompleteApplyModalOpen(false)}
          title={'일자리 지원이\n성공적으로 완료되었어요!'}
          detail={
            '기관 담당자가 빠른 시일 내에 연락드릴 예정입니다.\n지원해 주셔서 감사합니다.'
          }
          left="다른 일자리 보기"
          right="지원 내역 보기"
          handleLeftBtnClick={() => handleNavigate('/caregiver/work')}
          handleRightBtnClick={() => handleNavigate('/caregiver/apply')}
        />
      </Modal>

      {/* 근무조건 조율 팝업 */}
      <Modal
        isOpen={isMediateModalOpen}
        onClose={() => setIsMediateModalOpen(false)}
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
              onClick={() => setIsMediateModalOpen(false)}
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
                'ex) 근무 시간을 몇 시로 조율하고 싶어요.\n요일을 월요일로 바꾸고 싶어요.'
              }
              value={mediationDescription}
              onChange={handleDescriptionChange}
            />
          </MediateContent>

          <Button
            height="52px"
            variant={
              mediationDescription.length <= 0 || mediationTypes.length === 0
                ? 'disabled'
                : 'mainBlue'
            }
            disabled={
              mediationDescription.length <= 0 || mediationTypes.length === 0
            }
            onClick={handleMediate}
          >
            조율하여 지원하기
          </Button>
        </MediateModal>
      </Modal>

      {/* 조율 후 지원완료 팝업 */}
      <Modal
        isOpen={isCompleteMediateModalOpen}
        onClose={() => setIsCompleteMediateModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsCompleteMediateModalOpen(false)}
          title={'입력하신 조건으로\n일자리 지원이 완료되었어요!'}
          detail={
            '기관 담당자가 빠른 시일 내에 연락드릴 예정입니다.\n지원해 주셔서 감사합니다.'
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
