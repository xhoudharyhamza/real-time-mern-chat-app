import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
const ContactsHeader = () => {
    let dispatch=useDispatch()
    let user= useSelector((state)=>{
        return state.user.user
    })
  return (
    <div className='contact-header'>
        <div className="contact-header-list">
            <ul>
                <li><img src={user.profilePicture} className='user-profile-picture'/></li>
                <li>{user.name}</li>
                <li className='user-logout-btn' onClick={()=>{dispatch(logoutUser())}}>Logout</li>
            </ul>
        </div>
    </div>
  )
}

export default ContactsHeader