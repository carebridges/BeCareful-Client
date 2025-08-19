import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
// import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { ReactComponent as Write } from '@/assets/icons/community/Write.svg';
import CommunityWritePage from '@/page/Community/CommunityWritePage';
import CommunityHome from '@/components/Community/home/CommunityHome';
import CommunityDetail from '@/components/Community/home/CommunityDetail';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { CommunityJoinRequestModal } from '@/components/Community/JoinCommunity/CommunityJoinRequestModal';
import { CommunityJoinPendingModal } from '@/components/Home/CommunityJoinPendingModal';
import { CommunityJoinApprovedModal } from '@/components/Home/CommunityJoinApprovedModal';
import { COMMUNITY_BOARDS } from '@/constants/communityBoard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useJoinStatusModal } from '@/hooks/Community/CommunityJoin/useJoinStatusModal';
import { useMyAssociation } from '@/api/community';

const CommunityPage = ({ previewMode = false }: { previewMode?: boolean }) => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const location = useLocation();
  const selectedAssociation = location.state as {
    associationId: number;
    associationName: string;
  };

  const chatNew = false;

  const [activeTab, setActiveTab] = useState('전체');
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0);
  };

  const [isWriting, setIsWriting] = useState(false);

  const { data } = useMyAssociation(!previewMode);
  const {
    isPendingModalOpen,
    isApprovedModalOpen,
    associationName,
    closePendingModal,
    closeApprovedModal,
  } = useJoinStatusModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isWriting ? (
        <CommunityWritePage
          onClose={() => setIsWriting(false)}
          boardType={activeTab}
        />
      ) : (
        <Container>
          <Top $backgroundImageUrl={data?.associationProfileImageUrl || ''}>
            <div className="right">
              <Search onClick={() => handleNavigate('/community/search')} />
              <ChatWrapper onClick={() => handleNavigate('/socialworker/chat')}>
                {chatNew ? <ChatNew /> : <Chat />}
              </ChatWrapper>
            </div>
          </Top>

          <Association>
            <div
              className="chevronWrapper"
              onClick={() =>
                handleNavigate(`/community/${data?.associationId}/info`)
              }
            >
              <label className="title">{data?.associationName}</label>
              <Chevron />
            </div>
            <div className="bottom">
              <div
                className="chevronWrapper"
                onClick={() =>
                  handleNavigate(`/community/${data?.associationId}/members`)
                }
              >
                <label className="member">
                  멤버 {data?.associationMemberCount}
                </label>
                <Chevron />
              </div>
              {/* <div className="invite">
                <Plus />
                <label className="invite-label">초대하기</label>
              </div> */}
            </div>
          </Association>

          <CommunityTabs>
            {COMMUNITY_BOARDS.map((tab) => (
              <Tab
                key={tab}
                active={activeTab === tab}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </Tab>
            ))}
          </CommunityTabs>

          {activeTab === '전체' ? (
            <CommunityHome onTabChange={handleTabChange} />
          ) : (
            <CommunityDetail boardType={activeTab} />
          )}

          <Button onClick={() => setIsWriting(true)}>
            <Write />
            글쓰기
          </Button>

          <SocialWorkerTabBar />

          {previewMode && (
            <CommunityJoinRequestModal
              width="343px"
              associationId={selectedAssociation?.associationId}
              associationName={selectedAssociation?.associationName ?? ''}
              onClose={handleGoBack}
            />
          )}
          {isPendingModalOpen && (
            <CommunityJoinPendingModal
              width="343px"
              associationName={associationName}
              onCancelJoin={() => {
                //TODO
                closePendingModal();
              }}
              onClose={() => {
                closePendingModal();
              }}
            />
          )}

          {isApprovedModalOpen && (
            <CommunityJoinApprovedModal
              width="343px"
              associationName={associationName}
              onClose={() => {
                closeApprovedModal();
              }}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default CommunityPage;

const Container = styled.div`
  padding-bottom: 57px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray50};
`;

const Top = styled.div<{ $backgroundImageUrl: string }>`
  height: 88px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-image: url(${(props) => props.$backgroundImageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const ChatWrapper = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
`;

const Association = styled.div`
  height: 52px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  padding: 14px 20px 10px 20px;

  position: sticky;
  top: 88px;
  z-index: 8;
  background: ${({ theme }) => theme.colors.white};

  div {
    display: flex;
    align-items: center;
  }

  .bottom {
    justify-content: space-between;
  }

  .invite {
    gap: 5px;
    cursor: pointer;
  }

  label {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: 140%;
    cursor: pointer;
  }

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .invite-label {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .chevronWrapper {
    gap: 8px;
  }
`;

const Chevron = styled(ChevronRight)`
  path {
    fill: ${({ theme }) => theme.colors.gray800};
    stroke: ${({ theme }) => theme.colors.gray800};
  }

  cursor: pointer;
`;

const CommunityTabs = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 14px 20px 0px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  position: sticky;
  top: 164px;
  z-index: 6;
  background: ${({ theme }) => theme.colors.white};
`;

const Tab = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  //   gap: 25px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.black};
  padding-bottom: 6px;
  border-bottom: ${({ active }) => (active ? '3px solid #0370ff' : '')};
`;

const Button = styled.button`
  z-index: 10;
  position: fixed;
  bottom: 77px;
  right: 20px;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 25px;
  padding: 16px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: 140%;
`;
