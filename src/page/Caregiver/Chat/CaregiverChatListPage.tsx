import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import CaregiverChatCard from '@/components/Chat/CaregiverChatCard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGetCaregiverChatList } from '@/api/caregiver';

const CaregiverChatListPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const { data } = useGetCaregiverChatList();

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>채팅 목록</NavCenter>}
        color=""
      />
      {data?.map((chat) => (
        <CaregiverChatCard key={chat.matchingId} chat={chat} />
      ))}
    </Container>
  );
};

export default CaregiverChatListPage;

const Container = styled.div``;

const NavLeft = styled(ArrowLeft)`
  margin-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
