import { useCallback, useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { ChatRoomContractStatus, ChatRoomStatus } from '@/types/Caregiver/chat';
import { ChatRequest, ChatResponse } from '@/types/common/chat';

interface InitialData {
  chatRoomStatus?: ChatRoomStatus;
  chatRoomContractStatus?: ChatRoomContractStatus;
  chatList?: ChatResponse[];
}

interface UseChatProps {
  chatRoomId: number;
  initialData?: InitialData;
}

export const useChat = ({ chatRoomId, initialData }: UseChatProps) => {
  const stompRef = useRef<Client | null>(null);
  const queryClient = useQueryClient();

  const [chat, setChat] = useState<ChatResponse[]>([]);
  const [chatRoomStatus, setChatRoomStatus] =
    useState<ChatRoomStatus>('채팅가능');
  const [contractStatus, setContractStatus] =
    useState<ChatRoomContractStatus>('근무조건조율중');
  const [lastContractChatId, setLastContractId] = useState<number | null>(null);

  // 채팅 수신 처리
  const handleIncoming = useCallback((c: ChatResponse) => {
    if (!c) return;

    if (c.chatType === 'CONTRACT') {
      setLastContractId(c.chatId);
    } else if (c.chatType === 'CHATROOM_CONTRACT_STATUS_UPDATED') {
      setLastContractId(null);
      setContractStatus(c.status);
      return;
    } else if (c.chatType === 'CHATROOM_ACTIVE_STATUS_UPDATED') {
      setChatRoomStatus(c.status);
      return;
    }

    setChat((prev) => [...prev, c]);

    queryClient.invalidateQueries({ queryKey: ['caregiverChatList'] });
    queryClient.invalidateQueries({ queryKey: ['socialworkerChatList'] });
  }, []);

  useEffect(() => {
    if (initialData?.chatList) {
      initialData.chatList.forEach((c) => handleIncoming(c));
    }
    if (initialData?.chatRoomStatus)
      setChatRoomStatus(initialData.chatRoomStatus);
    if (initialData?.chatRoomContractStatus)
      setContractStatus(initialData.chatRoomContractStatus);
  }, [
    initialData?.chatList,
    initialData?.chatRoomContractStatus,
    initialData?.chatRoomStatus,
    handleIncoming,
  ]);

  // 초기 데이터 로드 & WebSocket 연결
  useEffect(() => {
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
        console.log(`Room ID: ${chatRoomId} 웹소켓 연결 시작`);
        client.subscribe(
          `/topic/chat-room/${chatRoomId}`,
          (message: IMessage) => {
            try {
              const chatData = JSON.parse(message.body) as ChatResponse;
              handleIncoming(chatData);
            } catch (err) {
              console.error('parse incoming message', err);
            }
          },
        );
      },

      onStompError: (frame) => {
        console.error('STOMP 오류 발생:', frame);
      },

      onWebSocketClose: () => {
        console.log('웹소켓 연결 종료됨');
      },

      // debug: (msg) => console.log(msg),
    });

    stompRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
      stompRef.current = null;

      console.log(`Room ID: ${chatRoomId} 웹소켓 연결 종료`);
    };
  }, [chatRoomId]);

  const send = useCallback(
    (chatRoomId: number, request: ChatRequest) => {
      if (!stompRef.current) return;
      stompRef.current.publish({
        destination: `/app/chat/send/${chatRoomId}`,
        body: JSON.stringify(request),
      });

      queryClient.invalidateQueries({ queryKey: ['caregiverChatList'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerChatList'] });
    },
    [queryClient],
  );

  return {
    chat,
    setChat,
    chatRoomStatus,
    setChatRoomStatus,
    contractStatus,
    setContractStatus,
    lastContractChatId,
    setLastContractId,
    send,
  };
};
