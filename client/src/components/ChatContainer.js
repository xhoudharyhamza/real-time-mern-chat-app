import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';

const ChatContainer = ({ socket }) => {
  const senderId = useSelector((state) => state.user.user._id);
  const receiverId = useSelector((state) => state.user.selectedUser._id);
  const [chat, setChat] = useState([]);
  const chatMessagesRef = useRef(null);

  const fetchAllMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${senderId}/${receiverId}`);
      if (res.status === 200) {
        const { messages } = await res.json();
        setChat(messages);
      } else {
        const { error } = await res.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewMessage = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  useEffect(() => {
    fetchAllMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', handleReceivedMessage);
    }
    return () => {
      if (socket) {
        socket.off('receiveMessage', handleReceivedMessage);
      }
    };
  }, [socket]);

  const handleReceivedMessage = (message) => {
    const msg = {
      members: [message.sender, message.receiver],
      sender: message.sender,
      message: message.message,
    };
    addNewMessage(msg);
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className='chat-container'>
      <ChatHeader />
      <div className='chat-messages' ref={chatMessagesRef}>
        {chat.length > 0 &&
          chat.map((message, index) => {
            return message.sender === senderId ? (
              <div className='message-sender' key={index}>
                <span>{message.message}</span>
              </div>
            ) : (
              <div className='message-receiver' key={index}>
                <span>{message.message}</span>
              </div>
            );
          })}
      </div>
      <ChatForm addNewMessage={addNewMessage} socket={socket} />
    </div>
  );
};

export default ChatContainer;
