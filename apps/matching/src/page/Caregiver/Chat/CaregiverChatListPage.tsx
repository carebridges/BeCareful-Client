import ChatList from '@/components/Chat/ChatList/ChatList';
import ChatListCardCaregiver from '@/components/Chat/ChatList/ChatListCardCaregiver';
import { useGetCaregiverChatList } from '@/api/chat';

const CaregiverChatListPage = () => {
  const { data } = useGetCaregiverChatList();

  return (
    <ChatList
      data={data}
      CardComponent={ChatListCardCaregiver}
      isCaregiver={true}
    />
  );
};

export default CaregiverChatListPage;
