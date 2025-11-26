import ChatList from '@/components/Chat/ChatList';
import ChatListCardSocialworker from '@/components/Chat/ChatListCardSocialworker';
import { useGetSocialworkerChatList } from '@/api/chat';

const SocialworkerChatListPage = () => {
  const { data } = useGetSocialworkerChatList();

  return (
    <ChatList
      data={data}
      CardComponent={ChatListCardSocialworker}
      isCaregiver={false}
    />
  );
};

export default SocialworkerChatListPage;
