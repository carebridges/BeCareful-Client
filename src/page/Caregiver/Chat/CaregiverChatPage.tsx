import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ChatPage from '@/components/Chat/ChatPage/ChatPage';
import { useGetCaregiverChat } from '@/api/chat';
import { OtherUserProfile } from '@/types/common/chat';

const CaregiverChatPage = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const roomId = Number(chatRoomId);
  const { data } = useGetCaregiverChat(roomId);

  const otherUser: OtherUserProfile = {
    profileImg:
      data?.institutionProfileImageUrl ??
      'https://care-bridges-main-bucket.s3.ap-northeast-2.amazonaws.com/institution-profile-image/default/institution_default.png',
    name: data?.institutionName ?? '',
  };

  return (
    <Container>
      <ChatPage
        chatRoomName={data?.institutionName ?? ''}
        data={data}
        role="CAREGIVER"
        chatRoomId={roomId}
        otherUser={otherUser}
        placeholder="근무 조건 조율을 원하시면 메시지를 전송해주세요."
      />
    </Container>
  );
};

export default CaregiverChatPage;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.subBlue};
  min-height: 100vh;
`;
