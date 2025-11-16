import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as CloseButton } from '@/assets/icons/caregiver/my/CloseButton.svg';
import { ApplicationDropdown } from '@/components/Caregiver/Mypage/ApplicationDropdown';
import { Button } from '@/components/common/Button/Button';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import { NavBar } from '@/components/common/NavBar/NavBar';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import WorkLocationModal from '@/components/Caregiver/Apply/WorkLocationModal';
import { caretypes } from '@/constants/common/caretypes';
import { days } from '@/constants/common/day';
import { TIMES_LONG, TIMES_LONG_TO_SHORT } from '@/constants/common/time';
import { SALARY_KR_TO_EN, salaryTypes } from '@/constants/common/salary';
import { WorkApplicationRequest } from '@/types/Caregiver/work';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useLocationSelection } from '@/hooks/Caregiver/apply/useLocationSelection';
import { useApplicationForm } from '@/hooks/Caregiver/apply/useApplicationForm';
import { usePutApplicationMutation } from '@/hooks/Caregiver/mutation/usePutApplicationMutation';
import { formatDaysToEN, formatTimeToEN } from '@/utils/caregiverFormatter';
import { useApplicationQuery } from '@/api/caregiver';

const CaregiverApplicationPage = () => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const { data, error } = useApplicationQuery();
  if (error) {
    console.log('getApplication 에러: ', error);
  }

  // 신청서 데이터
  const {
    payType,
    setPayType,
    pay,
    selectTime,
    selectDay,
    selectCaretype,
    handleAmountChange,
    handleSelectTime,
    handleSelectDay,
    handleSelectCaretype,
  } = useApplicationForm(data?.workApplicationDto);

  // 근무 지역
  const {
    isAreaModalOpen,
    setIsAreaModalOpen,
    closeAreaModal,
    selectedArea,
    selectedCity,
    selectedGu,
    selectedDong,
    handleCitySelect,
    handleGuSelect,
    handleDongSelect,
    handleSelectBtn,
    removeSelectedArea,
  } = useLocationSelection(data?.workApplicationDto);

  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    const isFormValid =
      payType !== '' &&
      pay !== '' &&
      selectTime.length > 0 &&
      selectDay.length > 0 &&
      selectCaretype.length > 0 &&
      selectedArea.length > 0;

    setIsChanged(isFormValid);
  }, [pay, payType, selectTime, selectDay, selectCaretype, selectedArea]);

  // 완료 모달
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: updateApplication } = usePutApplicationMutation({
    onSuccessCallback: (dataExists) => {
      if (dataExists) {
        setIsEditModalOpen(true);
      } else {
        setIsRegisterModalOpen(true);
      }
    },
  });

  const handleBtnClick = () => {
    const convertedTime = selectTime.map((time) => TIMES_LONG_TO_SHORT[time]);

    const applicationData: WorkApplicationRequest = {
      workSalaryUnitType: SALARY_KR_TO_EN[payType],
      workSalaryAmount: Number(pay.replaceAll(',', '')),
      workTimes: formatTimeToEN(convertedTime),
      workDays: formatDaysToEN(selectDay),
      workLocations: selectedArea,
      careTypes: selectCaretype,
    };

    console.log(applicationData);
    updateApplication(applicationData);
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={
          <NavCenter>
            일자리 지원서 {data?.workApplicationDto ? '수정' : '등록'}
          </NavCenter>
        }
        color="white"
      />

      <SectionWrapper>
        <LocationWrapper>
          <div className="location">
            <label className="title">
              희망 근무지역 <span>*</span>
            </label>
            <label className="guide">최대 5개까지 선택 가능</label>
          </div>
          <Button
            height="52px"
            width="88px"
            variant="subBlue"
            onClick={() => setIsAreaModalOpen(true)}
          >
            지역선택
          </Button>
        </LocationWrapper>

        {selectedArea.length > 0 && (
          <SelectedAreasWrapper>
            {selectedArea.map((area, index) => (
              <SelectedArea key={index}>
                {area.siGuGun} {area.eupMyeonDong}
                <CloseButton onClick={() => removeSelectedArea(index)} />
              </SelectedArea>
            ))}
          </SelectedAreasWrapper>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          희망 근무요일 <span>*</span>
        </label>
        <label className="guide">중복선택 가능</label>
        <SelectWrapper gap="4px">
          {days.map((day) => (
            <CheckBoxSelect
              key={day}
              id={day}
              label={day}
              checked={selectDay.includes(day)}
              onChange={handleSelectDay}
              width="100%"
              height="42px"
            />
          ))}
        </SelectWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          희망 근무시간 <span>*</span>
        </label>
        <label className="guide">중복선택 가능</label>
        <TimeWrapper>
          {TIMES_LONG.map((time) => (
            <CheckBoxSelect
              key={time}
              id={time}
              label={time}
              checked={selectTime.includes(time)}
              onChange={handleSelectTime}
              width="100%"
              height="48px"
            />
          ))}
        </TimeWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          희망 급여 <span>*</span>
        </label>
        <PayWrapper>
          <ApplicationDropdown
            title={payType || '시급'}
            contents={salaryTypes}
            selectedContents={[payType]}
            setSelectedContents={(values) => setPayType(values[0] || '')}
          />
          <div className="pay">
            <Pay
              id="pay"
              placeholder="10,030"
              value={pay}
              onChange={handleAmountChange}
            />
            <label className="count">원</label>
          </div>
        </PayWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title">
          근무 유형 <span>*</span>
        </label>
        <label className="guide">중복선택 가능</label>
        <SelectWrapper gap="">
          {caretypes.slice(0, 3).map((careType) => (
            <CheckBoxSelect
              key={careType}
              id={careType}
              label={careType}
              checked={selectCaretype.includes(careType)}
              onChange={handleSelectCaretype}
              width="100%"
              height="48px"
            />
          ))}
        </SelectWrapper>
        <SelectWrapper gap="">
          {caretypes
            .slice(3)
            .map((careType, index) =>
              index === 2 ? (
                <CheckBoxSelect
                  key={careType}
                  id={careType}
                  label={careType}
                  width="100%"
                  height="48px"
                  border={false}
                />
              ) : (
                <CheckBoxSelect
                  key={careType}
                  id={careType}
                  label={careType}
                  checked={selectCaretype.includes(careType)}
                  onChange={handleSelectCaretype}
                  width="100%"
                  height="48px"
                />
              ),
            )}
        </SelectWrapper>
      </SectionWrapper>

      <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleBtnClick}
        >
          지원서 {data?.workApplicationDto ? '수정' : '등록'}하기
        </Button>
      </Bottom>

      <WorkLocationModal
        isOpen={isAreaModalOpen}
        onClose={closeAreaModal}
        selectedCity={selectedCity}
        selectedGu={selectedGu}
        selectedDong={selectedDong}
        handleCitySelect={handleCitySelect}
        handleGuSelect={handleGuSelect}
        handleDongSelect={handleDongSelect}
        handleSelectBtn={handleSelectBtn}
      />

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <ModalLimit
          onClose={() => setIsRegisterModalOpen(false)}
          title={'일자리 지원서 작성이\n완료되었습니다!'}
          detail={
            '입력하신 조건에 맞는 공고가 표시됩니다.\n구인 연락을 기다려주세요!'
          }
          button="내 지원서 보기"
          handleBtnClick={() => {
            setIsRegisterModalOpen(false);
            handleNavigate('/caregiver/my');
          }}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalLimit
          onClose={() => setIsEditModalOpen(false)}
          title="지원서 수정이 완료되었어요!"
          detail={
            '입력하신 조건으로 수정되었습니다.\n새로운 조건에 맞는 공고가 표시됩니다.'
          }
          button="내 지원서 보기"
          handleBtnClick={() => {
            setIsEditModalOpen(false);
            handleNavigate('/caregiver/work');
          }}
        />
      </Modal>
    </Container>
  );
};

export default CaregiverApplicationPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 116px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
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
  text-align: center;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .guide {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;

  .location {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const SelectWrapper = styled.div<{ gap: string }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => (gap ? gap : '8px')};
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const PayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;

  .pay {
    position: relative;
    width: 100%;
    display: flex;
  }

  .count {
    position: absolute;
    right: 16px;
    top: 16px;
  }
`;

const Pay = styled.input`
  width: 100%;
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

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

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

const SelectedAreasWrapper = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SelectedArea = styled.button`
  padding: 8px 16px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;
