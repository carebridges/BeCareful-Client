import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { ReactComponent as Point } from '@/assets/icons/Point.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { ReactComponent as Caregiver } from '@/assets/icons/socialworker/home/Caregiver.svg';
import { ReactComponent as Applicant } from '@/assets/icons/socialworker/home/Applicant.svg';
import { ReactComponent as ApplyRate } from '@/assets/icons/socialworker/home/ApplyRate.svg';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { colors } from '@/style/theme/color';
type ColorKey = keyof typeof colors;
const SocialworkerHomePage = () => {
  const navigate = useNavigate();

  const [isNew, setIsNew] = useState(false);
  const chatNew = true;

  const handleNavigate = (path: string) => {
    navigate(`/socialworker/${path}`);
    scrollTo(0, 0);
  };
  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  return (
    <Container>
      {isNew && (
        <Modal isOpen={isNew} onClose={() => handleModal(setIsNew)}>
          <ModalButtons
            onClose={() => handleModal(setIsNew)}
            title="회원가입을 축하드립니다!"
            detail="가입 보상 포인트 5,000P가 지급되었습니다."
            left="내 포인트 확인"
            right="홈으로"
            handleLeftBtnClick={() => handleNavigate('point')}
            handleRightBtnClick={() => handleModal(setIsNew)}
          />
        </Modal>
      )}

      <NavBar
        left={<NavLeft />}
        right={
          <NavRight onClick={() => handleNavigate('chatlist')}>
            {chatNew ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="blue"
      />

      <Top>
        <div className="caregiver">
          <img src="" />
          <label className="title">김미정</label>
          <label className="rank">사회복지사</label>
        </div>

        <div className="pointWrapper" onClick={() => handleNavigate('point')}>
          <Point />
          {/* <label className="point">{data.point}</label> */}
          <label className="point">1,500P</label>
          <ChevronRight />
        </div>
      </Top>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">남산실버복지센터</label>
        </div>

        <Institution>
          <div className="content">
            <div className="left">
              <img src="" />
              <label className="type">어르신</label>
            </div>
            <label className="people">
              <span>58</span>명
            </label>
          </div>

          <div className="border" />

          <div className="content">
            <div className="left">
              <img src="" />
              <label className="type">요양보호사</label>
            </div>
            <label className="people">
              <span>50</span>명
            </label>
          </div>
          <Button>직원 정보 보기</Button>
        </Institution>
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">매칭 통계</label>
          <div className="detailWrapper">
            <label className="detail">자세히 보기</label>
            <ChevronRight />
          </div>
        </div>

        <Matching>
          <div className="matching">
            <Circle color="mainGreen" />
            <label className="status">진행중</label>
            <label className="number">
              0<span className="unit">건</span>
            </label>
          </div>

          <div className="matching">
            <Circle color="mainOrange" />
            <label className="status">최근 완료</label>
            <label className="number">
              0<span className="unit">건</span>
            </label>
          </div>

          <div className="matching">
            <Circle color="mainBlue" />
            <label className="status">전체 매칭</label>
            <label className="number">
              0<span className="unit">건</span>
            </label>
          </div>
        </Matching>
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">지원 통계</label>
        </div>

        <Apply>
          <div className="apply">
            <div className="left">
              <label className="apply-title">현재 지원한 요양보호사</label>
              <label className="number">
                12<span className="unit">명</span>
              </label>
            </div>
            <Caregiver />
          </div>

          <div className="bottom">
            <div className="apply">
              <div className="left">
                <label className="apply-title">
                  평균
                  <br />
                  지원자
                </label>
                <label className="number">
                  4<span className="unit">명</span>
                </label>
              </div>
              <Applicant />
            </div>

            <div className="apply">
              <div className="left">
                <label className="apply-title">
                  평균
                  <br />
                  지원률
                </label>
                <label className="number">
                  72<span className="unit">%</span>
                </label>
              </div>
              <ApplyRate />
            </div>
          </div>
        </Apply>
      </SectionWrapper>

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">매칭 대기중인 어르신</label>
          <div className="detailWrapper">
            <label className="detail">자세히 보기</label>
            <ChevronRight />
          </div>
        </div>

        <Edler>
          <div className="elder">
            <img src="" />
            <div className="elder-info">
              <label className="name">김옥자</label>
              <div className="bottom">
                <label className="extra">65세</label>
                <div className="border" />
                <label className="extra">여</label>
              </div>
            </div>
          </div>
        </Edler>
      </SectionWrapper>
    </Container>
  );
};

export default SocialworkerHomePage;

const Container = styled.div`
  background: #f2f4f6;
  min-height: 100vh;
  padding-bottom: 72px;

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .number {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .unit {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
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
`;

const Top = styled.div`
  padding: 12px 20px;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};

  .caregiver {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 20px;
    gap: 8px;
    align-items: center;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .rank {
    padding: 2px 6px;
    color: ${({ theme }) => theme.colors.mainGreen};
    background: ${({ theme }) => theme.colors.subGreen};
  }

  .pointWrapper {
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }

  .point {
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    cursor: pointer;
  }
`;

const SectionWrapper = styled.div`
  margin: auto 20px;
  margin-top: 12px;
  flex-direction: column;

  .titleWrapper {
    width: 100%;
    padding: 14px 0px;
    align-items: center;
    justify-content: space-between;
  }

  .detailWrapper {
    gap: 2px;
    align-items: center;
    cursor: pointer;
  }

  .detail {
    color: #666666;
    cursor: pointer;
  }

  path {
    stroke: #666666;
    fill: #666666;
  }
`;

const Institution = styled.div`
  padding: 24px 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);

  .content {
    justify-content: space-between;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }

  .left {
    gap: 8px;
    align-items: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .people {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .border {
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Matching = styled.div`
  gap: 8px;

  .matching {
    width: 100%;
    padding: 20px 16px 16px 16px;
    flex-direction: column;
    gap: 8px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  .status {
    margin-bottom: 2px;
  }
`;

const Circle = styled.div<{ color: ColorKey }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, color }) => theme.colors[color]};
`;

const Apply = styled.div`
  flex-direction: column;
  gap: 8px;

  .bottom {
    gap: 10px;
    justify-content: space-between;
  }

  .apply {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 16px;
    gap: 10px;
    justify-content: space-between;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  .left {
    flex-direction: column;
    gap: 10px;
  }
`;

const Edler = styled.div`
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .elder {
    width: 88px;
    padding: 16px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  img {
    width: 56px;
    height: 56px;
  }

  .elder-info {
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .bottom {
    gap: 4px;
    align-items: center;
  }

  .extra {
    color: ${({ theme }) => theme.colors.gray500};
  }

  .border {
    width: 1px;
    height: 12px;
    background: ${({ theme }) => theme.colors.subBlue};
  }
`;
