let checkUserOnline=(id, onlineUsers)=>{
    let checkUser= onlineUsers.find((user)=>{
        return user.userId===id
    })
    if(checkUser){
        return <div></div>
    }
}
let checkNotificationsCount=(receiver,sender,notifications)=>{
    let count= notifications.filter((notification)=>{
        return notification.sender===sender&&notification.receiver===receiver
    })
    return count.length
}
export {checkUserOnline,checkNotificationsCount}