import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/Close.svg';
import { ReactComponent as CloseButton } from '@/assets/icons/caregiver/my/CloseButton.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { ApplicationDropdown } from '@/components/Caregiver/Mypage/ApplicationDropdown';
import { Button } from '@/components/common/Button/Button';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { Area } from '@/data/Area';
import {
  API_Salary_Type_Mapping,
  Day_Mapping,
  Salary_Type_Mapping,
  Time_Mapping,
} from '@/constants/caregiverMapping';
import { WorkLocation } from '@/types/Caregiver/common';
import { WorkApplicationRequest } from '@/types/Caregiver/work';
import { apiDayFormat, apiTimeFormat } from '@/utils/caregiver';
import { useApplicationQuery } from '@/hooks/Caregiver/caregiverQuery';
import { usePutApplicationMutation } from '@/hooks/Caregiver/usePutApplicationMutation';

const CaregiverApplicationPage = () => {
  const navigate = useNavigate();

  const { data, error } = useApplicationQuery();
  if (error) {
    console.log('getApplication 에러: ', error);
  }

  // 희망 급여 관련 상태
  const payDropContents = ['시급', '월급', '연봉'];
  const [payType, setPayType] = useState('시급');
  const [pay, setPay] = useState('');
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const format = input.replace(/[^0-9]/g, '');
    const amount = Number(format);

    if (!isNaN(amount) && format !== '') {
      setPay(amount.toLocaleString('ko-KR'));
    } else {
      setPay('');
    }
  };

  // 근무 요일
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const handleSelectDay = (id: string) => {
    setSelectDay((prev) => {
      if (prev.includes(id)) {
        return prev.filter((day) => day !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // 근무 시간
  const [selectTime, setSelectTime] = useState<string[]>([]);
  const handleSelectTime = (id: string) => {
    setSelectTime((prev) => {
      if (prev.includes(id)) {
        return prev.filter((time) => time !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const times = ['오전', '오후', '저녁'];

  // 근무 유형
  const [selectCaretype, setSelectCaretype] = useState<string[]>([]);
  const handleSelectCaretype = (id: string) => {
    setSelectCaretype((prev) => {
      if (prev.includes(id)) {
        return prev.filter((care) => care !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const careTypes = [
    '식사보조',
    '이동보조',
    '배변보조',
    '일상생활',
    '질병보조',
    '',
  ];

  // 지역 설정 모달
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const openAreaModal = () => {
    setIsAreaModalOpen(true);
  };
  const closeAreaModal = () => {
    setIsAreaModalOpen(false);
  };

  // 완료 모달
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 근무 지역
  const [selectedArea, setSelectedArea] = useState<WorkLocation[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedGu('');
    setSelectedDong('');
  };
  const handleGuSelect = (gu: string) => {
    setSelectedGu(gu);
    setSelectedDong('');
  };
  const handleDongSelect = (dong: string) => {
    setSelectedDong(dong);
  };
  const handleSelectBtn = () => {
    if (selectedArea.length < 5) {
      setSelectedArea((prev) => [
        ...prev,
        {
          siDo: selectedCity,
          siGuGun: selectedGu,
          dongEupMyeon: selectedDong,
        },
      ]);
    }
    setIsAreaModalOpen(false);
    resetSelections();
  };
  const resetSelections = () => {
    setSelectedCity('');
    setSelectedGu('');
    setSelectedDong('');
  };
  const removeSelectedArea = (index: number) => {
    setSelectedArea((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (data) {
      setPayType(Salary_Type_Mapping[data.workSalaryUnitType]);
      setPay(data.workSalaryAmount.toLocaleString('ko-KR'));
      setSelectDay(data.workDays.map((day) => Day_Mapping[day]));
      setSelectTime(data.workTimes.map((time) => Time_Mapping[time]));
      setSelectCaretype(data.careTypes);
      setSelectedArea(data.workLocations);
    }
  }, [data]);

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
    const applicationData: WorkApplicationRequest = {
      workSalaryUnitType: API_Salary_Type_Mapping[payType],
      workSalaryAmount: Number(pay.replaceAll(',', '')),
      workTimes: apiTimeFormat(selectTime),
      workDays: apiDayFormat(selectDay),
      workLocations: selectedArea,
      careTypes: selectCaretype,
    };

    console.log(applicationData);
    updateApplication(applicationData);
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        }
        center={
          <NavCenter>{data ? '신청서 수정하기' : '신청서 등록하기'}</NavCenter>
        }
        color="white"
      />

      <SectionWrapper>
        <LocationWrapper>
          <div className="location">
            <label>
              희망 근무지역 <span>*</span>
            </label>
            <label className="guide">최대 5개까지 선택 가능</label>
          </div>
          <Button
            height="52px"
            width="88px"
            variant="subBlue"
            onClick={openAreaModal}
          >
            지역선택
          </Button>
        </LocationWrapper>

        {selectedArea.length > 0 && (
          <SelectedAreasWrapper>
            {selectedArea.map((area, index) => (
              <SelectedArea key={index}>
                {area.siGuGun} {area.dongEupMyeon}
                <CloseButton onClick={() => removeSelectedArea(index)} />
              </SelectedArea>
            ))}
          </SelectedAreasWrapper>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <label>
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
        <label>
          희망 근무시간 <span>*</span>
        </label>
        <label className="guide">중복선택 가능</label>
        <SelectWrapper gap="">
          {times.map((time) => (
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
        </SelectWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label>
          희망 급여 <span>*</span>
        </label>
        <PayWrapper>
          <ApplicationDropdown
            title="시급"
            contents={payDropContents}
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
        <label>
          근무 유형 <span>*</span>
        </label>
        <label className="guide">중복선택 가능</label>
        <SelectWrapper gap="">
          {careTypes.slice(0, 3).map((careType) => (
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
          {careTypes
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
        <Button height="52px" variant="mainBlue" onClick={handleBtnClick}>
          {data ? '신청서 수정하기' : '신청서 등록하기'}
        </Button>
      </Bottom>

      <Modal isOpen={isAreaModalOpen} onClose={closeAreaModal}>
        <AreaModal>
          <AreaModalTitle>
            <label className="title">지역설정</label>
            <ModalClose
              onClick={() => {
                setIsAreaModalOpen(!isAreaModalOpen);
              }}
            />
          </AreaModalTitle>

          <AreaWrapper>
            <div className="area">
              <label className="category">시/도</label>
              <AreaItems>
                {Area.city.map((city) => (
                  <AreaItem
                    key={city.name}
                    onClick={() => handleCitySelect(city.name)}
                    color={selectedCity === city.name}
                  >
                    {city.name}
                  </AreaItem>
                ))}
              </AreaItems>
            </div>
            {selectedCity && (
              <div className="area">
                <label className="category">시/군/구</label>
                <AreaItems
                  style={{
                    borderLeft: '1px solid #d9d9d9',
                    borderRight: '1px solid #d9d9d9',
                  }}
                >
                  {Area.city
                    .find((city) => city.name === selectedCity)
                    ?.gu?.map((gu) => (
                      <AreaItem
                        key={gu.name}
                        onClick={() => handleGuSelect(gu.name)}
                        color={selectedGu === gu.name}
                      >
                        {gu.name}
                      </AreaItem>
                    )) || <p>구가 없습니다.</p>}
                </AreaItems>
              </div>
            )}
            {selectedGu && (
              <div className="area">
                <label className="category">동/면/읍</label>
                <AreaItems>
                  {Area.city
                    .find((city) => city.name === selectedCity)
                    ?.gu.find((gu) => gu.name === selectedGu)
                    ?.dong.map((dong) => (
                      <AreaItem
                        key={dong}
                        onClick={() => handleDongSelect(dong)}
                        color={selectedDong === dong}
                      >
                        {dong}
                      </AreaItem>
                    )) || <p>동이 없습니다.</p>}
                </AreaItems>
              </div>
            )}
          </AreaWrapper>

          <Button height="52px" variant="mainBlue" onClick={handleSelectBtn}>
            선택하기
          </Button>
        </AreaModal>
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <ModalButtons
          onClose={() => {
            setIsRegisterModalOpen(!isRegisterModalOpen);
          }}
          title={'일자리 신청서 작성이\n완료되었습니다!'}
          detail="등록 보상 포인트 100P가 지급되었습니다."
          left="닫기"
          right="내 신청서 보기"
          handleLeftBtnClick={() => setIsRegisterModalOpen(false)}
          handleRightBtnClick={() => {
            navigate('/caregiver/my');
            window.scrollTo(0, 0);
          }}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalLimit
          onClose={() => {
            setIsEditModalOpen(!isEditModalOpen);
          }}
          title="신청서 수정이 완료되었어요!"
          detail={
            '입력하신 조건으로 수정되었습니다.\n새로운 조건에 맞는 공고가 표시됩니다.'
          }
          handleBtnClick={() => {
            setIsEditModalOpen(!isEditModalOpen);
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

  label {
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

const AreaModal = styled.div`
  //   width: 316px;
  width: 272px;
  height: 328px;
  padding: 28px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const AreaModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const AreaWrapper = styled.div`
  height: 216px;
  display: flex;
  gap: 1px;

  .area {
    display: flex;
    flex-direction: column;
  }

  .category {
    width: 76px;
    height: 20px;
    padding: 8px;
    background: ${({ theme }) => theme.colors.gray50};

    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-align: center;
  }
`;

const AreaItems = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const AreaItem = styled.div<{ color: boolean }>`
  width: 100%;
  height: 20px;
  padding: 8px 16px;

  color: ${({ theme, color }) =>
    color ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme, color }) =>
    color
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
  text-align: start;

  &:hover {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
