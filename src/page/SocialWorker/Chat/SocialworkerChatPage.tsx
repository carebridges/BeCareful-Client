import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSocialworkerChat } from '@/api/chat';
import { OtherUserProfile } from '@/types/common/chat';
import ChatPage from '@/components/Chat/ChatPage/ChatPage';

const SocialworkerChatPage = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const roomId = Number(chatRoomId);
  const { data } = useSocialworkerChat(roomId);

  const otherUser: OtherUserProfile = {
    profileImg:
      data?.caregiverProfileImageUrl ??
      'https://care-bridges-main-bucket.s3.ap-northeast-2.amazonaws.com/caregiver-profile-image/default/caregiver_default.png',
    name: data?.caregiverName ?? '',
  };

  return (
    <Container>
      <ChatPage
        chatRoomName={`${data?.caregiverName} 요양보호사`}
        data={data}
        role="SOCIAL_WORKER"
        chatRoomId={roomId}
        otherUser={otherUser}
        placeholder="메세지 입력"
      />
    </Container>
  );
};

export default SocialworkerChatPage;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.subBlue};
  min-height: 100vh;
`;
