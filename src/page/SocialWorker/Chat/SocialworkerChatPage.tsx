import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client, IMessage } from '@stomp/stompjs';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as DotIcon } from '@/assets/icons/community/Dots.svg';
import { ReactComponent as Delete } from '@/assets/icons/CloseCircle.svg';
import { ReactComponent as Send } from '@/assets/icons/community/ReplySend.svg';
import { ReactComponent as SendDefault } from '@/assets/icons/community/ReplySendDefault.svg';
import { ReactComponent as KakaoChannelIcon } from '@/assets/icons/KakaoChannel.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGetSocialworkerChat } from '@/api/chat';
import { ChatRoomStatus } from '@/types/Caregiver/chat';
import { ChatRequest, ChatResponse, SystemInfo } from '@/types/common/chat';
import ChatRoom from '@/components/Chat/ChatRoom';

const SocialworkerChatPage = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const roomId = Number(chatRoomId);
  const { data } = useGetSocialworkerChat(roomId);
  const { handleGoBack } = useHandleNavigate();

  const [isKakaoSheetOpen, setIsKakaoSheetOpen] = useState(false);

  // const [stompClient, setStompClient] = useState<Client | null>(null);
  const stompRef = useRef<Client | null>(null);

  const [chat, setChat] = useState<ChatResponse[]>([]);
  const [chatRoomStatus, setChatRoomStatus] =
    useState<ChatRoomStatus>('채팅가능');
  const [lastContractChatId, setLastContractId] = useState<number | null>();

  const [newChat, setNewChat] = useState('');

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 채팅 수신 처리
  const handleIncoming = useCallback((c: ChatResponse) => {
    setChat((prev) => [...prev, c]);

    if (c.chatType === 'CONTRACT') {
      setLastContractId(c.chatId);
    }

    if (c.chatType === 'CHATROOM_CONTRACT_STATUS_UPDATED') {
      setLastContractId(null);
    }

    if (c.chatType === 'CHATROOM_ACTIVE_STATUS_UPDATED') {
      setChatRoomStatus(c.status);
    }
  }, []);

  // 초기 데이터 로드 & WebSocket 연결
  useEffect(() => {
    setChatRoomStatus(data?.chatRoomStatus ?? '채팅가능');
    setChat(data?.chatList ?? []);

    // 기존 클라이언트 정리
    if (stompRef.current) {
      stompRef.current.deactivate();
      stompRef.current = null;
    }

    const client = new Client({
      brokerURL: import.meta.env.VITE_APP_WS_URL,
      connectHeaders: {},
      reconnectDelay: 3000,
      webSocketFactory: () => new WebSocket(import.meta.env.VITE_APP_WS_URL),

      onConnect: () => {
        console.log('웹소켓 연결 시작');
        client.subscribe(`/topic/chat-room/${roomId}`, (message: IMessage) => {
          const chatData = JSON.parse(message.body);
          handleIncoming(chatData);
        });
      },

      debug: (msg) => console.log(msg),
    });

    stompRef.current = client;
    client.activate();

    return () => {
      console.log('웹소켓 종료!');
      client.deactivate();
    };
  }, [roomId, handleIncoming, data]);

  // 채팅 전송
  const sendNewChat = (chatRoomId: number, request: ChatRequest) => {
    if (!stompRef.current) return;
    stompRef.current.publish({
      destination: `/app/chat/send/${chatRoomId}`,
      body: JSON.stringify(request),
    });
    setNewChat('');
  };

  const addLocalSystemMessage = (title: string, detail: string) => {
    const message: SystemInfo = {
      chatType: 'SYSTEM_INFO',
      senderType: 'SYSTEM',
      title: title,
      detail: detail,
      sentTime: new Date().toISOString(),
    };
    handleIncoming(message);
  };

  // 스크롤 맨 아래로 고정
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>{data?.caregiverName} 요양보호사</NavCenter>}
        right={<NavRight onClick={() => setIsKakaoSheetOpen(true)} />}
        color=""
      />

      <Elder>
        <div className="left">
          <img src={data?.elderlyProfileImageUrl} />
          <div className="name">{data?.elderlyName} 어르신</div>
        </div>
        <div className="right">정보 보기</div>
      </Elder>

      <ChatRoom
        chat={chat}
        role="CAREGIVER"
        lastContractChatId={lastContractChatId ?? null}
        chatRoomId={roomId}
        send={sendNewChat}
        onLocalSystemMessage={addLocalSystemMessage}
        profileImg={data?.caregiverProfileImageUrl ?? ''}
        name={data?.caregiverName ?? ''}
        elderlyName={data?.elderlyName ?? ''}
        caregiverName={data?.caregiverName}
        caregiverPhoneNumber={data?.caregiverPhoneNumber}
        status={chatRoomStatus}
      />
      <div ref={bottomRef} />

      <ChatInputWrapper>
        <div className="comment">
          <ChatInput
            placeholder="메세지 입력"
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
          />
          {newChat.length > 0 && (
            <Delete className="delete" onClick={() => setNewChat('')} />
          )}
        </div>
        {newChat.length > 0 ? (
          <Send
            className="svg"
            onClick={() => {
              console.log('send 클릭');
              console.log('Sending chat request:', {
                sendRequestType: 'SEND_TEXT',
                text: newChat,
              });
              sendNewChat(roomId, {
                sendRequestType: 'SEND_TEXT',
                text: newChat,
              });
            }}
          />
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
