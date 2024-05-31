// pages/chat/[id].js
import { useRouter } from 'next/router';
import ChatBox from '../../components/chat/ChatBox';
import { useContext } from 'react';
import { userContext } from '../../context';
const ChatPage = () => {
  const router = useRouter();
  const _id= router.query._id;
  const [state,setState]=useContext(userContext)
  const senderId=state.user._id

  return (
    <div>
      <h1 style={{textAlign:"center", marginTop:"10px"}}>Chat Room</h1>
      <ChatBox senderId={senderId} receiverId={_id} />
    </div>
  );
};

export default ChatPage;
