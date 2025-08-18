import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import ChatCard from '@/components/Chat/ChatCard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  formatDateLabel,
  formatTimeLabel,
  groupByDate,
} from '@/utils/formatTime';
import { useGetSocialworkerChat } from '@/api/socialworker';

const SocialworkerChatPage = () => {
  const { matchingId } = useParams<{ matchingId: string }>();

  const { handleGoBack, handleNavigate, handleNavigateState } =
    useHandleNavigate();

  const { data } = useGetSocialworkerChat(Number(matchingId));

  // 일자리 지원 최종 확정 여부
  // const [finalConfirm, setFinalConfirm] = useState(false);
  const location = useLocation();
  const { finalConfirm } = (location.state as { finalConfirm?: boolean }) || {
    finalConfirm: false,
  };

  const groupedContracts = groupByDate(data?.contractList ?? []);
  const sortedDates = Object.keys(groupedContracts).sort((a, b) =>
    a > b ? 1 : -1,
  );

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>{data?.caregiverInfo.name} 요양보호사</NavCenter>}
        color=""
      />

      <Elder>
        <div className="left">
          <img src={data?.elderlyInfo.elderlyProfileImageUrl} />
          <div className="name">{data?.elderlyInfo.elderlyName} 어르신</div>
        </div>
        <div className="right">정보 보기</div>
      </Elder>

      <ChatRoom>
        {sortedDates.map((date) => {
          const isLastDate = date === sortedDates[sortedDates.length - 1];
          const contracts = groupedContracts[date];

          return (
            <ChatWrapper key={date}>
              <label className="date">{formatDateLabel(date)}</label>
              {contracts.map((contract, index) => {
                const isLastItem = index === contracts.length - 1;
                return (
                  <Chat key={contract.contractId}>
                    <label className="time">
                      {formatTimeLabel(contract.createdDate)}
                    </label>
                    <ChatCard
                      border="left"
                      title="합격을 축하드립니다!"
                      name={data?.elderlyInfo.elderlyName ?? ''}
                      items={contract}
                      isSocialworker={true}
                      elder={data?.elderlyInfo}
                      hasButton={isLastDate && isLastItem}
                      buttonContent="근무조건 수정하기"
                      buttonClick={() =>
                        handleNavigateState(
                          `/socialworker/chat/${contract.contractId}/edit`,
                          { state: { matchingId: data?.matchingId } },
                        )
                      }
                    />
                  </Chat>
                );
              })}
            </ChatWrapper>
          );
        })}
        {finalConfirm && (
          <>
            <ApproveWrapper>
              <label className="title">최종 승인이 확정되었습니다!</label>
              <label className="detail">
                {data?.elderlyInfo.elderlyName} 어르신을 위한 돌봄 일정이
                추가되었습니다.
              </label>
            </ApproveWrapper>
            <Buttons>
              <Button
                height="52px"
                variant="mainBlue"
                onClick={() => handleNavigate('/socialworker')}
              >
                홈으로 이동하기
              </Button>
              <Button
                height="52px"
                variant="mainBlue"
                onClick={() =>
                  handleNavigate('/socialworker/matching/dashboard')
                }
              >
                매칭 통계 확인하기
              </Button>
            </Buttons>
          </>
        )}
      </ChatRoom>
    </Container>
  );
};

export default SocialworkerChatPage;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.subBlue};
  min-height: 100vh;
`;

const NavLeft = styled(ArrowLeft)`
  margin-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Elder = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};

  .left {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .right {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    cursor: pointer;
  }
`;

const ChatRoom = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .date {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Chat = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;

  .time {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const ApproveWrapper = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;

  .title {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-align: center;
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    text-align: center;
  }
`;

const Buttons = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
