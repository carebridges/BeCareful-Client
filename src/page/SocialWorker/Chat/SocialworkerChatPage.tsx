import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ChatPage from '@/components/Chat/ChatPage/ChatPage';
import { OtherUserProfile } from '@/types/chat';
import { useSocialworkerChat } from '@/api/chat';

const SocialworkerChatPage = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const roomId = Number(chatRoomId);
  const { data } = useSocialworkerChat(roomId);

  const otherUser: OtherUserProfile = {
    id: data?.caregiverId ?? 0,
    profileImg:
      data?.caregiverProfileImageUrl ??
      'https://care-bridges-main-bucket.s3.ap-northeast-2.amazonaws.com/caregiver-profile-image/default/caregiver_default.png',
    name: data?.caregiverName ?? '',
  };

  const chatRoomName =
    data?.caregiverName === '탈퇴한 요양보호사'
      ? data.caregiverName
      : `${data?.caregiverName} 요양보호사`;

  return (
    <Container>
      <ChatPage
        chatRoomName={chatRoomName}
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
