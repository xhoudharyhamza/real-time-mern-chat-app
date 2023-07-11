import React from 'react'
import { useSelector } from 'react-redux'
const ChatHeader = () => {
  let selectedUser = useSelector((state) => { return state.user.selectedUser })
  return (
    <div className="chat-header">
      <div className="chat-header-list">
        <ul>
          <li>{selectedUser.name}</li>
          <li className='selected-user-profile-picture'><img src={selectedUser.profilePicture} alt="selected user profile" /></li>
        </ul>
      </div>
    </div>
  )
}

export default ChatHeader