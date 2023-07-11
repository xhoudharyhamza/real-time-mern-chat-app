import { createSlice } from "@reduxjs/toolkit";
// localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
let initialState = {
    user: null,
    users:[],
    selectedUser:null,
    onlineUsers:[]
}
let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            // localStorage.setItem("user", JSON.stringify(action.payload))
        },
        setUsers:(state,action)=>{
            state.users=action.payload
        },
        changeSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        logoutUser:(state,action)=>{
            state.user=null
            // localStorage.removeItem("user")
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        }
    }

})
export let { setUser,setUsers, changeSelectedUser,logoutUser,setOnlineUsers } = userSlice.actions
export default userSlice.reducer