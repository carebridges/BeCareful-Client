import styled from 'styled-components';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
// import { ReactComponent as Point } from '@/assets/icons/Point.svg';
// import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { ReactComponent as Person } from '@/assets/icons/caregiver/home/Person.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/ArrowRight.svg';
import { ReactComponent as ArrowRightCircle } from '@/assets/icons/caregiver/home/ArrowRightCircle.svg';
import { ReactComponent as Notice } from '@/assets/icons/caregiver/home/Notice.svg';
import { ReactComponent as Status } from '@/assets/icons/caregiver/home/Status.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import CaregiverHomeWorkCard from '@/components/Caregiver/Home/CaregiverHomeWorkCard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useCaregiverHomeInfoQuery } from '@/api/caregiver';

const CaregiverHomePage = () => {
  const { handleNavigate } = useHandleNavigate();

  const { data, error } = useCaregiverHomeInfoQuery();
  if (error) {
    console.log('getCaregiverHomeInfo 에러: ', error);
  }

  return (
    <Container>
      <NavBar
        left={<NavLeft />}
        right={
          <NavRight onClick={() => handleNavigate('/caregiver/chat')}>
            {data?.hasNewChat ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="blue"
      />
      <BannerWrapper>
        <div className="labelWrapper">
          {data?.isWorking ? (
            <label>
              {data.name}님,
              <br />
              돌봄을 시작하세요!
            </label>
          ) : (
            <label>
              {data?.name}님,
              <br />
              오늘의 일정이에요!
            </label>
          )}
        </div>
        <Person style={{ position: 'absolute', right: '0', top: '51px' }} />
      </BannerWrapper>

      <MainWrapper>
        {data?.isWorking ? (
          data.workScheduleList && data.workScheduleList.length > 0 ? (
            <CardWrapper>
              {data.workScheduleList.map((workSchedule, index) => (
                <CaregiverHomeWorkCard
                  key={index}
                  workSchedule={workSchedule}
                />
              ))}
            </CardWrapper>
          ) : (
            <ScheduleWrapper>
              <label className="detail">편안한 하루 보내세요!</label>
              <label className="title">오늘은 정해진 근무 일정이 없어요</label>
            </ScheduleWrapper>
          )
        ) : (
          <ScheduleWrapper>
            <label className="detail">새로운 돌봄을 시작해보세요!</label>
            <label className="title">
              내 근무 일정을 한눈에 확인할 수 있어요
            </label>
          </ScheduleWrapper>
        )}

        <ButtonsWrapper>
          <ApplyButton onClick={() => handleNavigate('/caregiver/my')}>
            <div className="top">
              <label>일자리 지원</label>
              <label className="title">
                {data?.isApplying ? '지원중' : '미지원'}
              </label>
            </div>
            <div className="bottom">
              <label>변경하기</label>
              <ArrowRightCircle />
            </div>
          </ApplyButton>

          <WorkButtons>
            <WorkButton onClick={() => handleNavigate('/caregiver/work')}>
              <div className="left">
                <label className="title">모집공고</label>
                <div className="detail">
                  <label className="number">{data?.recruitmentCount}</label>
                  <label className="unit">건</label>
                </div>
              </div>
              <Notice />
            </WorkButton>
            <WorkButton onClick={() => handleNavigate('/caregiver/apply')}>
              <div className="left">
                <label className="title">지원현황</label>
                <div className="detail">
                  <label className="number">{data?.applicationCount}</label>
                  <label className="unit">건</label>
                </div>
              </div>
              <Status />
            </WorkButton>
          </WorkButtons>
        </ButtonsWrapper>

        <MyWorkButton onClick={() => handleNavigate('/caregiver/mywork')}>
          <label>나의 일자리</label>
          <ArrowRight />
        </MyWorkButton>
      </MainWrapper>
    </Container>
  );
};

export default CaregiverHomePage;

const Container = styled.div`
  background: #f2f3f7;
  position: relative;
  min-height: 100vh;
`;

const NavLeft = styled(Logo)`
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  padding-right: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
`;

const BannerWrapper = styled.div`
  background: ${({ theme }) => theme.colors.mainBlue};
  height: 188px;

  .labelWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
  }

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .pointWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .point {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    cursor: pointer;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 192px;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 16px 20px;
  height: 68px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  .title {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ApplyButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  padding-top: 20px;
  width: 100%;
  height: 186px;
  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 12px;
  // width: 51.25%;

  .top {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const WorkButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  // width: 46.25%;
`;

const WorkButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 89px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .detail {
    display: flex;
    align-items: end;
    gap: 1px;
  }

  .number {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 95%;
  }

  .unit {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const MyWorkButton = styled.button`
  display: flex;
  height: 56px;
  padding: 20px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background: #555960;
  margin-bottom: 72px;

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;
