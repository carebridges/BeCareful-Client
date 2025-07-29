import styled, { css } from 'styled-components';
import Feature1 from '@/assets/icons/landing/Feature1.svg';
import Feature2 from '@/assets/icons/landing/Feature2.svg';
import Feature3 from '@/assets/icons/landing/Feature3.svg';
import Introduce1 from '@/assets/icons/landing/Introduce1.svg';
import Introduce2 from '@/assets/icons/landing/Introduce2.svg';
import PresidentProfile from '@/assets/icons/landing/President.svg';
import { useIsMobile } from '@/hooks/useIsMobile';
import { mobile } from '@/utils/mobileStyle';
import React from 'react';

const AssociationInfoSection = () => {
  const isMobile = useIsMobile();

  const featureItems = [
    {
      id: '1',
      image: Feature1,
      label: '전문성 강화',
    },
    {
      id: '2',
      image: Feature2,
      label: '회원기관 상호 협력',
    },
    {
      id: '3',
      image: Feature3,
      label: '지역사회 복지 증진',
    },
  ];

  const timelineData = [
    { year: '2010', content: '(가칭)전주시 재가장기요양기관협회 \n태동' },
    { year: '2017', content: '전주시재가장기요양기관협회 \n등록 및 설립' },
    { year: '2018', content: '1대 양우천 회장 취임 \n(전북실버복지센터 대표)' },
    { year: '2020', content: '2대 박경희 회장 취임 \n(전주에코데이케어 대표)' },
    { year: '2022', content: '전주완주장기요양기관협회 \n명칭 변경' },
    {
      year: '2023',
      content: '3대 이승현 회장 취임 \n(금쪽같은내부모님데이케어 대표)',
    },
  ];

  const formatTimelineContent = (text: string) => {
    return text.split('\n').map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Container>
      <Association>
        <div className="titleWrapper">
          <label className="title">협회 소개</label>
          <label className="detail">
            {isMobile ? (
              <>
                우리 협회는 전북 지역 최대 규모의 장기요양기관 협회로,
                <br />
                센터 간의 소통과 협력을 통해
                <br />
                장기요양서비스의 질 향상에 기여하고 있습니다.
              </>
            ) : (
              <>
                우리 협회는 전북 지역 최대 규모의 장기요양기관 협회로,
                <br />
                센터 간의 소통과 협력을 통해 장기요양서비스의 질 향상에 기여하고
                있습니다.
              </>
            )}
          </label>
        </div>

        {!isMobile && (
          <Feature>
            {featureItems.map((feature) => (
              <div key={feature.id}>
                <img src={feature.image} alt={feature.label} />
                <label className="feature">{feature.label}</label>
              </div>
            ))}
          </Feature>
        )}

        <div className="imgs">
          <img src={Introduce1} className="img" alt="협회 소개 이미지 1" />
          <img src={Introduce2} className="img" alt="협회 소개 이미지 2" />
        </div>
      </Association>

      <President>
        <label className="title">협회장 인사</label>
        <PresidentMiddle>
          {isMobile ? (
            <>
              <label className="batang">
                "우리 전주완주장기요양기관협회는
                <br />
                장기요양인 여러분과 함께 더 나은 돌봄 환경을
                <br />
                조성하고, 어르신들이 존중받는 사회를
                <br />
                만들어가는 여정에 힘을 보태겠습니다."
              </label>
              <Profile>
                <div className="president">
                  <div className="top">
                    회장<label className="batang">이승현</label>
                  </div>
                  <label className="bottom">
                    (금쪽같은내부모님데이케어 대표)
                  </label>
                </div>
                <img src={PresidentProfile} alt="협회장 프로필 사진" />
              </Profile>
            </>
          ) : (
            <>
              <Profile>
                <img src={PresidentProfile} alt="협회장 프로필 사진" />
                <div className="president">
                  <div className="top">
                    회장<label className="batang">이승현</label>
                  </div>
                  <label className="bottom">
                    금쪽같은내부모님데이케어 대표
                  </label>
                </div>
              </Profile>
              <label className="batang">
                "우리 전주완주장기요양기관협회는
                <br />
                장기요양인 여러분과 함께 더 나은 돌봄 환경을 조성하고,
                <br />
                어르신들이 존중받는 사회를
                <br />
                만들어가는 여정에 힘을 보태겠습니다."
              </label>
            </>
          )}
        </PresidentMiddle>
      </President>

      <TimelineContainer>
        <label className="title">주요 활동</label>
        <div className="timeline">
          <TimelineBar>
            <div className="line" />
            <div className="points">
              {timelineData.map((_, idx) => (
                <div className="point" key={idx} />
              ))}
            </div>
          </TimelineBar>
          <ScheduleItems>
            {timelineData.map((data, index) => (
              <div className="item" key={index}>
                <label className="year">{data.year}년</label>
                <label className="title">
                  {isMobile
                    ? formatTimelineContent(data.content)
                    : data.content}
                </label>
              </div>
            ))}
          </ScheduleItems>
        </div>
      </TimelineContainer>
    </Container>
  );
};

export default AssociationInfoSection;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${mobile(css`
    gap: 0px;
  `)}

  label {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .title {
    font-size: 40px;

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.title3};
    `)}
  }
`;

const Association = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 70px;
  align-items: center;
  text-align: center;

  ${mobile(css`
    gap: 30px;
  `)}

  .titleWrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;

    ${mobile(css`
      gap: 30px;
    `)}
  }

  .detail {
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.body1};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    `)}
  }

  .imgs {
    box-sizing: border-box;
    width: 100%;
    object-fit: cover;

    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;

    ${mobile(css`
      flex-direction: column;
      gap: 20px;
    `)}
  }

  .img {
    width: 600px;
    height: 320px;
    border-radius: 24px;
    box-shadow: 0px 4.217px 32.685px 0px rgba(0, 0, 0, 0.15);
    object-fit: cover;

    ${mobile(css`
      width: 320px;
      height: 240px;
    `)}
  }
`;

const Feature = styled.div`
  width: 620px;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .feature {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const President = styled.div`
  margin-bottom: 50px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: center;
  align-items: center;

  ${mobile(css`
    gap: 30px;
  `)}
`;

const PresidentMiddle = styled.div`
  display: flex;
  gap: 80px;
  justify-content: center;
  align-items: center;

  ${mobile(css`
    flex-direction: column;
    gap: 30px;
  `)}

  .batang {
    font-family: 'KoPub Batang Pro';
    font-weight: bold;
    font-size: 32px;
    text-align: center;

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.body1};
    `)}
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;

  ${mobile(css`
    gap: 40px;
  `)};

  img {
    width: 320px;
    height: 382px;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0px 4.217px 32.685px 0px rgba(0, 0, 0, 0.15);

    ${mobile(css`
      width: 160px;
      height: 191px;
    `)}
  }

  .president {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    ${mobile(css`
      gap: 4px;
    `)}
  }

  .top {
    display: flex;
    gap: 20px;
    align-items: center;

    font-size: 32px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    ${mobile(css`
      gap: 10px;
      font-size: ${({ theme }) => theme.typography.fontSize.title5};
    `)}
  }

  .batang {
    font-family: 'KoPub Batang Pro';
    font-weight: bold;
    font-size: 36px;
    text-align: center;

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.body1};
    `)}
  }

  .bottom {
    font-size: 25px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.body3};
    `)}
  }
`;

const TimelineContainer = styled.div`
  width: 100%;
  height: 852px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  background: #252b42;

  ${mobile(css`
    gap: 40px;
  `)}

  .title {
    color: ${({ theme }) => theme.colors.white};
  }

  .timeline {
    display: flex;
    gap: 36px;

    ${mobile(css`
      gap: 21px;
    `)}
  }
`;

const TimelineBar = styled.div`
  width: 32px;
  height: 733px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile(css`
    width: 25px;
  `)}

  position: relative;

  .line {
    width: 5px;
    height: 100%;
    background: ${({ theme }) => theme.colors.white};
    padding-bottom: 21px;

    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);

    ${mobile(css`
      top: 25px;
      padding-bottom: 66px;
    `)}
  }

  .points {
    display: flex;
    flex-direction: column;
    gap: 90px;
    z-index: 1;

    ${mobile(css`
      gap: 100px;
    `)}
  }

  .point {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.white};

    ${mobile(css`
      width: 25px;
      height: 25px;
    `)}
  }
`;

const ScheduleItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;

  ${mobile(css`
    gap: 28px;
  `)}

  .item {
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    display: flex;
    gap: 60px;

    ${mobile(css`
      flex-direction: column;
      gap: 10px;
      font-size: ${({ theme }) => theme.typography.fontSize.title5};
    `)}
  }

  .year {
    color: ${({ theme }) => theme.colors.white};
    font-size: 28px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    ${mobile(css`
      gap: 10px;
      font-size: ${({ theme }) => theme.typography.fontSize.body1};
    `)}
  }

  .title {
    font-size: 30px;

    ${mobile(css`
      gap: 10px;
      font-size: ${({ theme }) => theme.typography.fontSize.title5};
    `)}
  }
`;
