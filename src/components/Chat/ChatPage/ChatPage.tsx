import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as DotIcon } from '@/assets/icons/community/Dots.svg';
import { ReactComponent as Delete } from '@/assets/icons/CloseCircle.svg';
import { ReactComponent as Send } from '@/assets/icons/community/ReplySend.svg';
import { ReactComponent as SendDefault } from '@/assets/icons/community/ReplySendDefault.svg';
import { ReactComponent as KakaoChannelIcon } from '@/assets/icons/KakaoChannel.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import ChatGuide from '@/components/Chat/ChatRoom/ChatGuide';
import ChatRoom from '@/components/Chat/ChatRoom/ChatRoom';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { CaregiverChatResponse } from '@/types/Caregiver/chat';
import { SocialworkerChatResponse } from '@/types/Socialworker/chat';
import {
  OtherUserProfile,
  SendTextChatRequest,
  StatusMessage,
  UserRole,
} from '@/types/common/chat';
import { useChat } from '@/hooks/useChat';

interface ChatPageProps {
  chatRoomName: string;
  data: CaregiverChatResponse | SocialworkerChatResponse | undefined;
  role: UserRole;
  chatRoomId: number;
  otherUser: OtherUserProfile;
  placeholder: string;
}

const ChatPage = ({
  chatRoomName,
  data,
  role,
  chatRoomId,
  otherUser,
  placeholder,
}: ChatPageProps) => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const [isKakaoSheetOpen, setIsKakaoSheetOpen] = useState(false);
  const [newChat, setNewChat] = useState('');
  const [status, setStatus] = useState<StatusMessage>({
    title: '',
    detail: '',
  });

  const { chat, chatRoomStatus, contractStatus, lastContractChatId, send } =
    useChat({
      chatRoomId,
      initialData: {
        chatRoomStatus: data?.chatRoomStatus,
        chatRoomContractStatus: data?.chatRoomContractStatus,
        chatList: data?.chatList,
      },
    });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let statusTitle = '';
    let statusDetail = '';

    if (contractStatus === '채용완료') {
      statusTitle = '최종 채용이 확정되었습니다!';
      statusDetail = `${data?.elderlyName} 어르신을 위한 돌봄 일정이 추가되었습니다.`;
    }
    if (chatRoomStatus !== '채팅가능') {
      statusTitle = '더 이상 메시지를 보낼 수 없습니다.';
      if (chatRoomStatus === '공고마감')
        statusDetail = '해당 공고의 모집이 마감되었습니다.';
      else if (
        chatRoomStatus === '사회복지사전원탈퇴' ||
        chatRoomStatus === '요양보호사탈퇴'
      )
        statusDetail = '더 이상 메시지를 보낼 수 없습니다.';
      else if (chatRoomStatus === '타매칭채용완료')
        statusDetail = '해당 공고는 다른 지원자와의 채용이 완료되었습니다.';
    }

    setStatus({
      title: statusTitle,
      detail: statusDetail,
    });
  }, [contractStatus, chatRoomStatus]);

  // 스크롤 맨 아래로 고정
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSend = () => {
    const request: SendTextChatRequest = {
      sendRequestType: 'SEND_TEXT',
      text: newChat,
    };
    send(chatRoomId, request);
    setNewChat('');
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>{chatRoomName}</NavCenter>}
        right={<NavRight onClick={() => setIsKakaoSheetOpen(true)} />}
        fix={true}
      />

      <Elder>
        <div className="left">
          <img src={data?.elderlyProfileImageUrl} />
          <div className="name">{data?.elderlyName} 어르신</div>
        </div>
        <div
          className="right"
          onClick={() =>
            handleNavigate(`/socialworker/recruitment/${data?.recruitmentId}`)
          }
        >
          정보 보기
        </div>
      </Elder>

      {(contractStatus === '채용완료' || chatRoomStatus !== '채팅가능') && (
        <StatusWrapper>
          <ChatGuide title={status.title} detail={status.detail} top={true} />
        </StatusWrapper>
      )}

      <ChatRoom
        chat={chat}
        role={role}
        lastContractChatId={lastContractChatId ?? null}
        chatRoomId={chatRoomId}
        other={otherUser}
        elderlyName={data?.elderlyName ?? ''}
        // caregiverName={data?.caregiverName}
        // caregiverPhoneNumber={data?.caregiverPhoneNumber}
        chatRoomStatus={chatRoomStatus}
        contractStatus={contractStatus}
        status={status}
      />

      <div ref={bottomRef} />

      <ChatInputWrapper>
        <div className="comment">
          <ChatInput
            placeholder={placeholder}
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
          />
          {newChat.length > 0 && (
            <Delete className="delete" onClick={() => setNewChat('')} />
          )}
        </div>
        {newChat.length > 0 ? (
          <Send className="svg" onClick={handleSend} />
        ) : (
          <SendDefault className="svg" />
        )}
      </ChatInputWrapper>

      <BottomSheet
        isOpen={isKakaoSheetOpen}
        setIsOpen={setIsKakaoSheetOpen}
        title="고객센터"
        titleStar={false}
      >
        <BottomSheetContainer>
          <div className="ask">
            문의하고 싶은 내용이 있으신가요?
            <br />
            돌봄다리 카카오톡 채널을 통해 편하게 문의해주세요.
          </div>
          <div className="border" />
          <KakaoContainer
            onClick={() =>
              (window.location.href = 'http://pf.kakao.com/_xczamn/friend')
            }
          >
            <KakaoChannelIcon />
            <div className="channel">카카오톡 채널 바로가기</div>
          </KakaoContainer>
        </BottomSheetContainer>
      </BottomSheet>
    </Container>
  );
};

export default ChatPage;

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

const NavRight = styled(DotIcon)`
  margin-right: 20px;
  cursor: pointer;
`;

const Elder = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};

  position: fixed;
  top: 56px;
  left: 0;
  right: 0;

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

const StatusWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  top: 106px;
  left: 0;
  right: 0;
`;

const ChatInputWrapper = styled.div`
  padding: 10px 20px;
  height: 44px;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  .comment {
    width: 100%;
    display: flex;
    position: relative;
  }

  .delete {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .svg {
    padding: 4px;
    cursor: pointer;
  }
`;

const ChatInput = styled.input`
  outline: none;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  padding: 9px 16px;
  width: 100%;
  height: 26px;
  display: flex;
  align-items: start;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  caret-color: ${({ theme }) => theme.colors.mainBlue};
`;

const BottomSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .ask {
    margin-bottom: 36px;
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .border {
    margin: 0px -20px;
    widht: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const KakaoContainer = styled.button`
  padding: 17px 16px;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: var(--kakao, #fee500);
  cursor: pointer;

  .channel {
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
