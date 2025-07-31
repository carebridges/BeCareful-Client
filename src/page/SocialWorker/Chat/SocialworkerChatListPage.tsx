import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import SocialworkerChatCard from '@/components/Chat/SocialworkerChatCard';
import { useGetSocialworkerChatList } from '@/api/socialworker';

const SocialworkerChatListPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const { data } = useGetSocialworkerChatList();

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>채팅 목록</NavCenter>}
        color=""
      />
      {data?.map((chat) => (
        <SocialworkerChatCard key={chat.matchingId} chat={chat} />
      ))}
    </Container>
  );
};

export default SocialworkerChatListPage;

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
