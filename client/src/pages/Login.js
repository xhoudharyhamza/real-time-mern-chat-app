import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setUser} from "../redux/userSlice"
import {useDispatch} from "react-redux"
const Login = () => {
    let navigate = useNavigate()
    let dispatch=useDispatch()
    let [loginUserData, setLoginUserData] = useState({ username: "", password: "" })
    let [loading, setLoading] = useState(false)
    let changeHandler = (e) => {
        setLoginUserData({ ...loginUserData, [e.target.name]: e.target.value })
    }
    let loginUsers = async (e) => {
        e.preventDefault()
        let { username, password } = loginUserData
        setLoading(true)
        let res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        let response = await res.json()
        if (res.status === 200) {
            setLoading(false)
            toast.success("Login SUccessfully!")
            let { user } = response
            dispatch(setUser(user))
            navigate('/chat')
        }
        else {
            setLoading(false)
            let { error } = response
            toast.error(error)
        }
    }
    return (
        <div className="container">
            <div className="login-user">
                <div className="login-user-form">
                    <h2>Login</h2>
                    <form onSubmit={loginUsers}>
                        <input type="text" required name='username' placeholder='Username' onChange={changeHandler} value={loginUserData.username} />
                        <input type="password" required placeholder='Password' onChange={changeHandler} name='password' value={loginUserData.password} />
                        <div className="form-buttons">
                            <Link className='register-button' to={"/signup"}>Register</Link>
                            <button className='login-button' disabled={loading} type="submit">{loading ? "Logging In..." : "Login"}</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login