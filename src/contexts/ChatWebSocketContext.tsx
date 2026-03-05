import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Client, IMessage } from '@stomp/stompjs';
import { CaregiverChatList, NewChat, SocialworkerChatList } from '@/types/chat';

interface ChatWebSocketContextType {
  stompClient: Client | null;
  hasNewChat: boolean;
  setHasNewChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatWebSocketContext = createContext<
  ChatWebSocketContextType | undefined
>(undefined);

export const ChatWebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const queryClient = useQueryClient();
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const [hasNewChat, setHasNewChat] = useState(false);

  // 초기 데이터 로드 & WebSocket 연결
  useEffect(() => {
    const userRole = location.pathname.includes('/caregiver')
      ? 'caregiver'
      : 'socialworker';

    const client = new Client({
      brokerURL: import.meta.env.VITE_APP_WS_URL,
      connectHeaders: {},
      reconnectDelay: 5000,
      webSocketFactory: () => new WebSocket(import.meta.env.VITE_APP_WS_URL),
      //   debug: (str) => console.log('Global STOMP Debug:', str),
    });

    client.onConnect = () => {
      console.log('전역 STOMP 연결 시작');

      client.subscribe('/user/topic/notifications', (message: IMessage) => {
        try {
          const chatData: NewChat = JSON.parse(message.body);
          console.log('전역 STOMP - 새로운 채팅 메시지 수신:', chatData);

          // 1. 전역 새 채팅 알림 상태 업데이트
          setHasNewChat(true);

          // 2. React Query 캐시 업데이트
          if (userRole === 'caregiver') {
            queryClient.setQueryData(
              ['caregiverChatList'],
              (oldData: CaregiverChatList[] | undefined) => {
                if (!oldData) return [];

                // 수신된 chatRoomId와 일치하는 채팅방 업데이트
                const updatedData = oldData.map((chat) =>
                  chat.chatRoomId === chatData.chatRoomId
                    ? {
                        ...chat,
                        recentChat: chatData.lastChat,
                        lastSendTime: chatData.lastSendTime,
                        unreadCount: chatData.unreadCount,
                      }
                    : chat,
                );
                return updatedData;
              },
            );
          } else {
            queryClient.setQueryData(
              ['socialworkerChatList'],
              (oldData: SocialworkerChatList[] | undefined) => {
                if (!oldData) return [];

                // 수신된 chatRoomId와 일치하는 채팅방 업데이트
                const updatedData = oldData.map((chat) =>
                  chat.chatRoomId === chatData.chatRoomId
                    ? {
                        ...chat,
                        recentChat: chatData.lastChat,
                        lastSendTime: chatData.lastSendTime,
                        unreadCount: chatData.unreadCount,
                      }
                    : chat,
                );
                return updatedData;
              },
            );
          }
        } catch (err) {
          console.error('전역 STOMP - 수신 메시지 파싱 오류:', err);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('전역 STOMP 오류 발생:', frame);
    };

    client.onWebSocketClose = () => {
      console.log('전역 STOMP 연결 종료');
    };

    setStompClient(client);
    client.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
      console.log('전역 STOMP 연결 종료');
    };
  }, [queryClient]);

  return (
    <ChatWebSocketContext.Provider
      value={{
        stompClient,
        hasNewChat,
        setHasNewChat,
      }}
    >
      {children}
    </ChatWebSocketContext.Provider>
  );
};

export const useChatWebSocket = () => {
  const context = useContext(ChatWebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
