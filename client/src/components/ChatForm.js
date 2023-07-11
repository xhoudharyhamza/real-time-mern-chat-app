import React, { useState,useEffect } from 'react'
import rightArrow from "../images/arrow-right.png"
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from "react-redux"
const ChatForm = ({addNewMessage, socket}) => {
  let [message, setMessage] = useState("")
  let [showEmojis, setShowEmojis] = useState(false)
  let user = useSelector((state) => {
    return state.user.user
  })
  let selectedUser = useSelector((state) => {
    return state.user.selectedUser
  })
  let sendMessage = async (e) => {
    e.preventDefault()
    if (socket) {
      socket.emit("newMessage", { message, sender: user._id, receiver: selectedUser._id });
    }    
    let res = await fetch('/api/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message, sender:user._id, receiver:selectedUser._id})
    })
    let response = await res.json()
    if (res.status === 200) {
      setMessage("")
      let { msg } = response
      addNewMessage(msg)
    }
  }
  return (
    <div className='chat-form'>
      {showEmojis &&
        <EmojiPicker className="emojis" onEmojiClick={(emoji) => {
          setMessage((prevMessage) => prevMessage + emoji.emoji);
        }} />}
      <div className="form-body">
        <form onSubmit={sendMessage}>
          <div className="emoji-picker">
            <p onClick={() => { setShowEmojis(!showEmojis) }}>😊</p>
          </div>
          <div className="message-input">
            <input type="text" placeholder='Type a Message' onChange={(e) => { setMessage(e.target.value) }} value={message} />
          </div>
          <button className='send-message-btn' type='submit' disabled={message.length < 1}> <img src={rightArrow} /></button>
        </form>
      </div>
    </div>
  )
}

export default ChatForm