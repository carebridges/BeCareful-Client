import ChatList from '@/components/Chat/ChatList';
import CaregiverChatCard from '@/components/Chat/CaregiverChatCard';
import { useGetCaregiverChatList } from '@/api/chat';

const CaregiverChatListPage = () => {
  const { data } = useGetCaregiverChatList();

  return (
    <ChatList
      data={data}
      CardComponent={CaregiverChatCard}
      isCaregiver={true}
    />
  );
};

export default CaregiverChatListPage;
