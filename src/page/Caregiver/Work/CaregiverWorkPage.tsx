import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Chat } from '@/assets/icons/ChatNewBlack.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import CaregiverWorkCard from '@/components/Caregiver/CaregiverWorkCard';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { CAREGIVER_WORK_FILTERS } from '@/constants/caregiverWorkFilters';
import {
  caretypeFormat,
  dayFormat,
  locationFormat,
  timeFormat,
} from '@/utils/caregiver';
import {
  useApplicationQuery,
  useRecruitmentListQuery,
} from '@/hooks/Caregiver/caregiverQuery';
import { useWorkApplicationToggleMutation } from '@/hooks/Caregiver/useWorkApplicationToggleMutation';

const CaregiverWorkPage = () => {
  const navigate = useNavigate();

  const chatNew = false;

  // 신청서 조회
  const { data: applicationData, error: applicationError } =
    useApplicationQuery();
  if (applicationError) {
    console.log('getApplication 에러: ', applicationError);
  }

  // 매칭 공고 리스트 조회
  const { data: matchingListData, error: matchingListError } =
    useRecruitmentListQuery();
  if (matchingListError) {
    console.log('getMatchingList 에러: ', matchingListError);
  }

  const [isToggleChecked, setIsToggleChecked] = useState(false);
  useEffect(() => {
    if (applicationData) {
      setIsToggleChecked(true);
    } else {
      setIsToggleChecked(false);
    }
  }, [applicationData]);

  const { mutate: toggleWorkApplication } = useWorkApplicationToggleMutation({
    onSuccessCallback: (newIsActive) => {
      setIsToggleChecked(newIsActive);
    },
  });
  const handleToggleChange = () => {
    toggleWorkApplication(isToggleChecked);
  };

  const [activeTab, setActiveTab] = useState('전체');
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };
  const filteredMatchingList = useMemo(() => {
    if (!matchingListData) {
      return [];
    }

    switch (activeTab) {
      case '전체':
        return matchingListData;
      case '시급 TOP':
        return matchingListData.filter((item) => item.isHourlySalaryTop);
      case '인기공고':
        return matchingListData.filter((item) => item.isHotRecruitment);
      case '조건일치':
        return matchingListData.filter((item) =>
          ['높음', '보통'].includes(item.matchingResultStatus),
        );
      default:
        return matchingListData;
    }
  }, [matchingListData, activeTab]);

  const applyInfo = [
    {
      title: '케어항목',
      detail: applicationData
        ? caretypeFormat(applicationData.careTypes, 2)
        : '-',
    },
    {
      title: '근무요일',
      detail: applicationData ? dayFormat(applicationData.workDays) : '-',
    },
    {
      title: '근무시간',
      detail: applicationData ? timeFormat(applicationData.workTimes) : '-',
    },

    {
      title: '희망급여',
      detail: applicationData
        ? `${applicationData.workSalaryAmount.toLocaleString('ko-KR')}원`
        : '-',
    },
    {
      title: '근무지역',
      detail: applicationData
        ? locationFormat(applicationData.workLocations, 2)
        : '-',
    },
  ];

  return (
    <Container>
      <NavBar
        left={<NavLeft>일자리</NavLeft>}
        right={
          <NavRight
            onClick={() => {
              navigate('/caregiver/chatlist');
              window.scrollTo(0, 0);
            }}
          >
            {chatNew ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color=""
      />

      <Application>
        <Top>
          <div className="left">
            {applicationData ? (
              <div className="dateWrapper">
                <label className="date">최근 수정일 </label>
                <span>
                  {applicationData.lastModifiedDate.replaceAll('-', '.')}
                </span>
              </div>
            ) : (
              <label className="date">아직 등록된 신청서가 없어요!</label>
            )}
            {/* <label className="title">{applicationData.name}일자리 신청서</label> */}
            <label className="title">이선혜 일자리 신청서</label>
          </div>

          <div className="right">
            <Toggle
              checked={isToggleChecked ? true : false}
              onChange={handleToggleChange}
            />
            <ToggleLabel isBlue={isToggleChecked}>
              {isToggleChecked ? '신청중' : '미신청'}
            </ToggleLabel>
          </div>
        </Top>

        <InfoDisplay items={applyInfo} gapColumn="8px" gapRow="32px" />

        <Button
          onClick={() => {
            navigate('/caregiver/my/application');
            window.scrollTo(0, 0);
          }}
        >
          {applicationData ? '내 신청서 수정하기' : '내 신청서 등록하기'}
        </Button>
      </Application>

      <Border />

      <FiltersWrapper>
        {CAREGIVER_WORK_FILTERS.map((filter) => (
          <Filter
            key={filter.name}
            active={activeTab === filter.name}
            onClick={() => handleTabChange(filter.name)}
          >
            {filter.icon && <span>{filter.icon}</span>}
            <span>{filter.name}</span>
          </Filter>
        ))}
      </FiltersWrapper>

      <ApplicationsWrapper>
        {filteredMatchingList.map((matching) => (
          <CaregiverWorkCard
            key={matching.recruitmentInfo.recruitmentId}
            recruitment={matching}
            stateColor={
              matching.recruitmentInfo.isRecruiting ? 'mainGreen' : 'gray500'
            }
            bgColor={
              matching.recruitmentInfo.isRecruiting ? 'subGreen' : 'gray50'
            }
            stateLabel={
              matching.recruitmentInfo.isRecruiting
                ? '일자리 모집중'
                : '일자리 마감'
            }
            navigatePath="work"
          />
        ))}
      </ApplicationsWrapper>
    </Container>
  );
};

export default CaregiverWorkPage;

const Container = styled.div`
  margin: auto 20px;
  padding-bottom: 72px;

  div {
    display: flex;
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
`;

const Application = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const Top = styled.div`
  gap: auto;
  justify-content: space-between;

  .left {
    flex-direction: column;
    gap: auto;
    justify-content: space-between;
  }

  .dateWrapper {
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .right {
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }
`;

const ToggleLabel = styled.label<{ isBlue: boolean | undefined }>`
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const Border = styled.div`
  width: 100vw;
  height: 5px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const FiltersWrapper = styled.div`
  padding: 16px 0px;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Filter = styled.div<{ active: boolean }>`
  padding: 8px 12px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
  text-align: center;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
`;

const ApplicationsWrapper = styled.div`
  flex-direction: column;
  gap: 12px;
`;
