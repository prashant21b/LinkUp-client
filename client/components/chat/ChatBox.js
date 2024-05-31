import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import Avatar from 'react-avatar';

const ChatBox = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [receiver, setReceiver] = useState(null);
  const messagesEndRef = useRef(null);

  const getReceiverDetails = async () => {
    try {
      const response = await axios.get(`/get-receiver/${receiverId}`);
      setReceiver(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReceiverDetails();
  }, [receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/chats/get-message/${receiverId}`);
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setMessages([]);
          console.error('Expected an array but received:', response.data);
        }
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('/chats/send-message', {
        sender: senderId,
        receiver: receiverId,
        message: newMessage
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    ) : (
      <div className="chat-container d-flex flex-column h-100">
        {receiver && (
          <div key={receiver._id} className="d-flex align-items-center justify-content-between mb-3" style={{backgroundColor:"black",color:"white"}}>
            <div className="d-flex align-items-center ms-4  mt-4">
              {receiver.image ? (
                <Avatar 
                  name={receiver.name} 
                  size="60" 
                  round={true} 
                  className="mr-3" 
                  src={receiver.image.url} 
                />
              ) : (
                <Avatar round="20px" name={receiver.name[0]} className="mb-2" size="40" />
              )}
              <div className="mx-2">
                <h6 className="mb-0 text-white">{receiver.username}</h6>
                <p className=" mb-0 text-white">{receiver.name}</p>
              </div>
            </div>
          </div>
        )}
        <div className="messages flex-grow-1 overflow-auto p-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`message mb-2 p-2 rounded ${msg.sender === senderId ? 'bg-primary text-white align-self-end' : 'bg-light text-dark align-self-start'}`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-group p-3">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    )
  );
};

export default ChatBox;
