import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Mywork } from '@/assets/icons/caregiver/MyWork.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import CaregiverMyworkCard from '@/components/Caregiver/Home/CaregiverMyworkCard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useMyWorkListQuery } from '@/hooks/Caregiver/caregiverQuery';

const CaregiverMyworkPage = () => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const { data, error } = useMyWorkListQuery();
  if (error) {
    console.log('getMyWorkList 에러: ', error);
  }

  return (
    <Container isData={!!(data && data.length > 0)}>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>나의 일자리</NavCenter>}
        color="white"
      />
      {data && data.length > 0 ? (
        <CardWrapper>
          {data?.map((workInfo) => (
            <CaregiverMyworkCard key={workInfo.id} workInfo={workInfo} />
          ))}
        </CardWrapper>
      ) : (
        <NoWorkingCard>
          <div className="top">
            <Mywork />
            <label className="title">아직 일자리가 없어요!</label>
            <label className="detail">
              일자리 신청서를 등록하고
              <br />
              나에게 딱 맞는 일자리를 신청해보세요!
            </label>
          </div>
          <Button
            variant="subBlue"
            height="52px"
            onClick={() => handleNavigate('/caregiver/my')}
          >
            일자리 등록하기
          </Button>
        </NoWorkingCard>
      )}
    </Container>
  );
};

export default CaregiverMyworkPage;

const Container = styled.div<{ isData: boolean }>`
  background: ${({ theme, isData }) =>
    isData ? theme.colors.white : theme.colors.gray50};

  min-height: 100vh;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const CardWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const NoWorkingCard = styled.div`
  margin: 124px 20px auto 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};

  .top {
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: center;
    align-items: center;
  }

  label {
    text-align: center;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
