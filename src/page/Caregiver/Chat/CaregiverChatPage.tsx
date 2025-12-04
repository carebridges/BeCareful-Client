import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
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
import ChatRoom from '@/components/Chat/ChatRoom';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { handleModal } from '@/utils/handleModal';
import { useGetCaregiverChat } from '@/api/chat';
import { ChatRoomStatus } from '@/types/Caregiver/chat';
import {
  ChatRequest,
  ChatResponse,
  SendTextChatRequest,
  SystemInfo,
} from '@/types/common/chat';

const CaregiverChatPage = () => {
  const { chatRoomIdParam } = useParams();
  const chatRoomId = Number(chatRoomIdParam);
  const { data } = useGetCaregiverChat(chatRoomId);
  const { handleGoBack } = useHandleNavigate();

  const [isKakaoSheetOpen, setIsKakaoSheetOpen] = useState(false);
  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chat, setChat] = useState<ChatResponse[]>([]);

  const [chatRoomStatus, setChatRoomStatus] =
    useState<ChatRoomStatus>('채팅가능');
  const [lastContractChatId, setLastContractId] = useState<number | null>();

  const [newChat, setNewChat] = useState('');
  const handleNewChatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChat(e.target.value);
  };
  const handleNewChatSend = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!newChat.trim()) return; // 댓글 내용이 비어있으면 전송 x
    const request: SendTextChatRequest = {
      sendRequestType: 'SEND_TEXT',
      text: newChat,
    };
    sendNewChat(chatRoomId, request);
  };

  const handleAgree = () => {
    // TODO: 동의하기 전송
    handleModal(setIsCompleteModalOpen, setIsAgreeModalOpen);
  };

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

  useEffect(() => {
    setChatRoomStatus(data?.chatRoomStatus ?? '채팅가능');
    setChat(data?.chatList ?? []);

    const client = new Client({
      brokerURL: import.meta.env.VITE_APP_WS_URL,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('웹소켓 연결 시작');
        client.subscribe(
          `/topic/chat-room/${chatRoomId}`,
          (message: IMessage) => {
            const chatData = JSON.parse(message.body);
            setChat((prev) => [...prev, chatData]);
          },
        );
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      console.log('웹소켓 종료!');
      client.deactivate();
    };
  }, [chatRoomId, handleIncoming]);

  const sendNewChat = (chatRoomId: number, request: ChatRequest) => {
    if (!stompClient) return;
    stompClient.publish({
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
    setChat((prev) => [...prev, message]);
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>{data?.institutionName}</NavCenter>}
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
        chatRoomId={chatRoomId}
        send={sendNewChat}
        onLocalSystemMessage={addLocalSystemMessage}
        profileImg={data?.institutionProfileImageUrl ?? ''}
        name={data?.institutionName ?? ''}
        elderlyName={data?.elderlyName ?? ''}
        status={chatRoomStatus}
      />

      <ChatInputWrapper>
        <div className="comment">
          <ChatInput
            placeholder="근무 조건 조율을 원하시면 메시지를 전송해주세요."
            value={newChat}
            onChange={handleNewChatChange}
          />
          {newChat.length > 0 && (
            <Delete className="delete" onClick={() => setNewChat('')} />
          )}
        </div>
        {newChat.length > 0 ? (
          <Send className="svg" onClick={handleNewChatSend} />
        ) : (
          <SendDefault className="svg" onClick={handleNewChatSend} />
        )}
      </ChatInputWrapper>

      <Modal
        isOpen={isAgreeModalOpen}
        onClose={() => setIsAgreeModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsAgreeModalOpen(false)}
          title="근무 조건에 동의하시겠습니까?"
          detail={
            '근무 조건 동의시 더이상 조율이 불가능하며,\n기관 담당자에게 근무 확정 요청 알림이 가요.'
          }
          left="취소"
          right="동의하기"
          handleLeftBtnClick={() => setIsAgreeModalOpen(false)}
          handleRightBtnClick={handleAgree}
        />
      </Modal>

      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      >
        <ModalLimit
          onClose={() => setIsCompleteModalOpen(false)}
          title="근무 조건에 동의하셨습니다!"
          detail={
            '기관 담당자에게 근무 확정 알림을 전송했어요.\n최종 채용 확정을 기다려 주세요.'
          }
          button="채팅방으로 이동하기"
          handleBtnClick={() => setIsCompleteModalOpen(false)}
        />
      </Modal>

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

export default CaregiverChatPage;

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
