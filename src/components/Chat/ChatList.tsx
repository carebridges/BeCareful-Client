import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import NoChatList from '@/components/Chat/NoChatList';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

interface ChatItem {
  chatRoomId: number;
}

interface ChatListProps<T extends ChatItem> {
  data: T[] | undefined;
  CardComponent: React.ComponentType<{ chat: T }>;
  isCaregiver: boolean;
}

const ChatList = <T extends ChatItem>({
  data,
  CardComponent,
  isCaregiver,
}: ChatListProps<T>) => {
  const { handleGoBack } = useHandleNavigate();

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>채팅 목록</NavCenter>}
        color=""
      />

      {data?.length === 0 ? (
        <NoChatWrapper>
          <NoChatList isCaregiver={isCaregiver} />
        </NoChatWrapper>
      ) : (
        data?.map((chat) => <CardComponent key={chat.chatRoomId} chat={chat} />)
      )}
    </Container>
  );
};

export default ChatList;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const NoChatWrapper = styled.div`
  padding: 0px 20px;
  padding-bottom: 56px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
`;
