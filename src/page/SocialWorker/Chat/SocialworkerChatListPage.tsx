import ChatList from '@/components/Chat/ChatList/ChatList';
import ChatListCardSocialworker from '@/components/Chat/ChatList/ChatListCardSocialworker';
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
