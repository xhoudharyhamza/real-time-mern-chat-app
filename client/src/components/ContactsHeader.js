import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, setUserNotifications } from '../redux/userSlice'
const ContactsHeader = () => {
    let dispatch = useDispatch()
    let user = useSelector((state) => {
        return state.user.user
    })
    let fetchUserNotifications = async () => {
        let res = await fetch(`/api/notifications/${user._id}`)
        let response = await res.json()
        if (res.status === 200) {
            let { notifications } = response
            dispatch(setUserNotifications(notifications))
        }
    }
    useEffect(() => {
        fetchUserNotifications()
    }, [])
    return (
        <div className='contact-header'>
            <div className="contact-header-list">
                <ul>
                    <li><img src={user.profilePicture} className='user-profile-picture' /></li>
                    <li>{user.name}</li>
                    <li className='user-logout-btn' onClick={() => { dispatch(logoutUser()) }}>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default ContactsHeader