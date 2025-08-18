import styled from 'styled-components';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as PointIcon } from '@/assets/icons/Point.svg';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

const PointPage = () => {
  const { handleGoBack } = useHandleNavigate();

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<label>포인트 적립 내역</label>}
        color="white"
      />

      <NameWrapper>
        <img src="" />
        <label>김사회</label>
      </NameWrapper>

      <SectionWrapper>
        <label>보유 포인트</label>
        <Point>
          <PointIcon />
          <label>1,500P</label>
        </Point>
        <Button>포인트 충전하기</Button>
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label>포인트 적립·사용 내역</label>
        <History>
          <div className="historyWrapper">
            <label className="date">2025.2.21. 10:24</label>
            <div className="history">
              <label className="title">요양보호사 채용 제안 발송</label>
              <label className="title">- 300원</label>
            </div>
          </div>
          <div className="border" />
          <div className="historyWrapper">
            <label className="date">2025.2.21. 10:11</label>
            <div className="history">
              <label className="title">요양보호사 연락처 열람</label>
              <label className="title">- 100원</label>
            </div>
          </div>
          <div className="border" />
          <div className="historyWrapper">
            <label className="date">2025.2.20. 12:24</label>
            <div className="history">
              <label className="title">회원가입 축하 보상</label>
              <label className="title">+ 5,000원</label>
            </div>
          </div>
        </History>
      </SectionWrapper>

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <div className="about-point">
          <label className="question">?</label>
          <label>포인트는 무엇인가요?</label>
        </div>
        <Description>
          · '돌봄다리' 통합서비스 이용 시 포인트를 적립하고 사용하실 수
          있습니다.
          <br />
          · 적립된 포인트는 ‘돌봄다리’ 통합서비스 내에서 사용 가능하며, 현금으로
          전환하거나 환급할 수 없습니다.
          <br />
          · 1원의 가치를 가집니다. 추후 포인트 충전 기능이 추가될 예정입니다.
          <br />· 포인트제 관련 모든 사항은 전자상거래법을 준수하여 운영됩니다.
        </Description>
      </SectionWrapper>
    </Container>
  );
};

export default PointPage;

const Container = styled.div`
  margin: auto 20px;

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NameWrapper = styled.div`
  margin-top: 12px;
  gap: 12px;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 0.279px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;

  .about-point {
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  .question {
    width: 24px;
    height: 24px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray200};
    background: ${({ theme }) => theme.colors.gray50};
    line-height: 150%;
  }
`;

const Point = styled.div`
  padding: 20px;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  label {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const History = styled.div`
  padding: 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .historyWrapper {
    flex-direction: column;
    gap: 5px;
  }

  .history {
    gap: auto;
    justify-content: space-between;
  }

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }

  .date {
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .border {
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const Description = styled.div`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
