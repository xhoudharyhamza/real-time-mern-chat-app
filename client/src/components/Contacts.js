import React, { useEffect, useState } from 'react'
import ContactsHeader from './ContactsHeader'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers, changeSelectedUser } from '../redux/userSlice'
const Contacts = () => {
    let [contactsSearch, setContactsSearch] = useState("")
    let dispatch = useDispatch()
    let users = useSelector((state) => {
        return state.user.users
    })
    let activeUser = useSelector((state) => {
        return state.user.user
    })
    let selectedUser = useSelector((state) => {
        return state.user.selectedUser
    })
    let onlineUsers=useSelector((state)=>{return state.user.onlineUsers})
    console.log(onlineUsers)
    let fetchAllContacts = async () => {
        let res = await fetch('/api/users')
        let response = await res.json()
        if (res.status === 200) {
            let { users } = response
            let filteredUsers = users.filter((user) => {
                return user._id !== activeUser._id
            })
            dispatch(setUsers(filteredUsers))
        }
        else {
            let { error } = { response }
            console.log(error)
        }
    }
   let checkUserOnline=(id)=>{
        let checkUser= onlineUsers.find((user)=>{
            return user.userId===id
        })
        if(checkUser){
            return <div></div>
        }
    }
    useEffect(() => {
        fetchAllContacts()
    }, [])
    return (
        <div className='contacts'>
            <ContactsHeader />
            <div className="contacts-search">
                <input type="text" placeholder='Search' value={contactsSearch} onChange={(e) => { setContactsSearch(e.target.value) }} />
            </div>
            <div className="contacts-list">
                {users.filter((user) => {
                    return user.username.includes(contactsSearch) || user.name.includes(contactsSearch)
                }).map((user, index) => {
                    return <div className={selectedUser && selectedUser._id === user._id ? "selected-user contact-item" : "contact-item"} key={index} onClick={() => { dispatch(changeSelectedUser(user)) }}>
                        <ul>
                            <li><img src={user.profilePicture} className="user-profile-image" alt="User-Profile" /></li>
                            <li className='user-contact-credentials'>
                                <ul>
                                <li className="user-name">{user.name}</li>
                                <li className="username">@{user.username}</li>
                                </ul>
                            </li>
                            <li className='online-user-sign'>{checkUserOnline(user._id)}</li>
                        </ul>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Contacts