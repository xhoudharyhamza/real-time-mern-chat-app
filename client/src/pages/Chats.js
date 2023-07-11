import React, { useEffect, useState } from 'react'
import Contacts from '../components/Contacts'
import { useDispatch, useSelector } from 'react-redux'
import ChatContainer from '../components/ChatContainer'
import NoSelectedUser from '../components/NoSelectedUser'
import { setOnlineUsers } from '../redux/userSlice'
import io from 'socket.io-client';

const Chats = () => {
  let [socket, setSocket] = useState(null)
  let dispatch= useDispatch()
  let selectedUser = useSelector((state) => {
    return state.user.selectedUser
  })
  let user = useSelector((state) => {
    return state.user.user
  })

  useEffect(() => {
    setSocket(io("http://localhost:8000"))
  }, [])

  useEffect(() => {
    if (socket && user) {
      socket.emit("addUser", user._id);
      socket.on("getUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })
    }
  }, [user, socket])

  return (
    <div className='chats'>
      <div className="contact-side">
        <Contacts />
      </div>
      <div className="chat-side">
        {selectedUser ? <ChatContainer socket={socket} /> : <NoSelectedUser />}
      </div>
    </div>
  )
}

export default Chats;
