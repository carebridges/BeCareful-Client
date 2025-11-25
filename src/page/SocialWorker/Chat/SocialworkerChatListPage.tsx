import ChatList from '@/components/Chat/ChatList';
import SocialworkerChatCard from '@/components/Chat/SocialworkerChatCard';
import { useGetSocialworkerChatList } from '@/api/chat';

const SocialworkerChatListPage = () => {
  const { data } = useGetSocialworkerChatList();

  return (
    <ChatList
      data={data}
      CardComponent={SocialworkerChatCard}
      isCaregiver={false}
    />
  );
};

export default SocialworkerChatListPage;
