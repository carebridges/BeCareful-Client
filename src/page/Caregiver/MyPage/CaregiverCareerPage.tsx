import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import CaregiverCareerExperience from '@/components/Caregiver/Mypage/CaregiverCareerExperience';
import CaregiverCareerNew from '@/components/Caregiver/Mypage/CaregiverCareerNew';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { CareerDetail, CareerRequest } from '@/types/Caregiver/mypage';
import { useCareerQuery } from '@/hooks/Caregiver/caregiverQuery';
import { usePutCareerMutation } from '@/hooks/Caregiver/usePutCareerMutation';

const CaregiverCareerPage = () => {
  const navigate = useNavigate();

  const { data, error } = useCareerQuery();
  if (error) {
    console.log('getCareer 에러: ', error);
  }

  const [title, setTitle] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [experiences, setExperiences] = useState<CareerDetail[]>([]);
  const [activeTab, setActiveTab] = useState('신입');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setIntroduce(data.introduce);
      setExperiences(data.careerDetails);
      setActiveTab(data.careerType);
    }
  }, [data]);

  const { mutate: updateCareer } = usePutCareerMutation();

  const handleBtnClick = () => {
    const careerData: CareerRequest = {
      title: title,
      careerType: activeTab === '신입' ? '신입' : '경력',
      introduce: introduce,
      careerDetails: experiences,
    };

    console.log(careerData);
    updateCareer(careerData);
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
        center={<NavCenter>{data ? '경력서 수정' : '경력서 등록'}</NavCenter>}
        color="white"
      />

      <TitleWrapper>
        <label>
          경력서 제목 <span>*</span>
        </label>
        <Title
          placeholder="나를 표현할 한마디를 적어보세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </TitleWrapper>

      <TabWrapper>
        <Tabs>
          {['신입', '경력'].map((tab) => (
            <Tab
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => handleTabChange(tab)}
            >
              <TabText className={activeTab === tab ? 'active' : ''}>
                {tab}
              </TabText>
            </Tab>
          ))}
        </Tabs>
      </TabWrapper>

      {activeTab == '신입' ? (
        <CaregiverCareerNew
          introduce={introduce}
          handleIntroduceChange={setIntroduce}
        />
      ) : (
        <CaregiverCareerExperience
          careerDetails={experiences}
          handleExperienceChange={setExperiences}
        />
      )}

      <Bottom>
        <Button height="52px" variant="mainBlue" onClick={handleBtnClick}>
          {data ? '경력서 수정하기' : '경력서 등록하기'}
        </Button>
      </Bottom>
    </Container>
  );
};

export default CaregiverCareerPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;
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

const TitleWrapper = styled.div`
  margin: 16px auto 8px auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Title = styled.input`
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

const TabWrapper = styled.div`
  display: flex;
  padding: 6px;
  box-sizing: border-box;

  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;

  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  gap: 4px;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100%;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 6px;

  &.active {
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  }
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
`;

const TabText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &.active {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  &:not(.active) {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
