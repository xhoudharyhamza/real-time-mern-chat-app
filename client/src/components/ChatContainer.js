import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';
import { setUserNotifications } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
const ChatContainer = ({ socket }) => {
  let dispatch=useDispatch()
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
  let deleteNotifications=async()=>{
    let res= await fetch(`/api/notifications/${receiverId}/${senderId}`,{method:"DELETE"})
    if(res.status===200){
      let {notifications}=await res.json()
      dispatch(setUserNotifications(notifications))
    }
  }
  const addNewMessage = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  };
  useEffect(()=>{
    deleteNotifications()
  },[])
  useEffect(() => {
    fetchAllMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        const msg = {
          members: [message.sender, message.receiver],
          sender: message.sender,
          message: message.message,
        };
        addNewMessage(msg);
      });
    }
  }, [socket]);

  useEffect(() => {
    chatMessagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat]);

  return (
    <div className='chat-container'>
      <ChatHeader />
      <div className='chat-messages'>
        {chat.map((message, index) => (
          <div
            key={index}
            className={message.sender === senderId ? 'message-sender' : 'message-receiver'}
          >
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <ChatForm addNewMessage={addNewMessage} socket={socket} />
      <div ref={chatMessagesRef} />
    </div>
  );
};

export default ChatContainer;
