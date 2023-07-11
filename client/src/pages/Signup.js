import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import app from '../firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    let navigate=useNavigate()
    const storage = getStorage(app);
    const [signupUserData, setSignupUserData] = useState({ name: '', username: '', password: '' });
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [fileUploadStatus, setFileUploadStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const changeHandler = (e) => {
        setSignupUserData({ ...signupUserData, [e.target.name]: e.target.value });
    };
    const handleUploadProfilePicture = async () => {
        if (profilePicture) {
            setFileUploadStatus(true)
            try {
                const storageRef = ref(storage, `profile-pictures/${profilePicture.name}`);
                await uploadBytes(storageRef, profilePicture);
                const downloadURL = await getDownloadURL(storageRef);
                setProfilePictureUrl(downloadURL);
                setFileUploadStatus(false)
                toast.success("Image Uploaded...")
            } catch (error) {
                setFileUploadStatus(false)
               toast.error(error)
            }
        }
    };
    let registerUser=async(e)=>{
        e.preventDefault()
        let {name,username,password}=signupUserData
        const usernameRegex = /^[a-zA-Z0-9_-]{5,16}$/;
        if(!usernameRegex.test(username)){
            toast.error("Usernames must be between 5 and 16 characters and can only contain letters, numbers, underscores, and hyphens.")
        }
        else{
        setLoading(true)
        let res=await fetch("/api/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,username,password,profilePictureUrl})
        })
        let response=await res.json()
        if(res.status===200){
            let {user}=response
            setLoading(false)
            toast.success("User SignedUp Successfully!")
            navigate('/login')
        }
        else{
            let {error}=response
            toast.error(error)
            setLoading(false)
        }
    }
    }
    useEffect(() => {
        handleUploadProfilePicture()
    }, [profilePicture])
    return (
        <div className="container">
            <div className="signup-user">
                <div className="signup-user-form">
                    <h2>Register</h2>
                    <form onSubmit={registerUser}>
                        <input type="text" placeholder="Full Name" name="name" required onChange={changeHandler} value={signupUserData.name} />
                        <input type="text" required placeholder="Username" name="username" onChange={changeHandler} value={signupUserData.username} />
                        <input type="password" required placeholder="Password" name="password" onChange={changeHandler} value={signupUserData.password} />
                        {profilePictureUrl && <div className='user-profile-picture'><img src={profilePictureUrl} /></div>}
                        <label htmlFor="profile-picture">Choose Profile Picture</label>
                        <input type="file" required onChange={(e) => { setProfilePicture(e.target.files[0]) }} />
                        {fileUploadStatus && <p>Uploading Image...</p>}
                        <div className="form-buttons">
                            <Link className="login-button" to={"/login"}>Login</Link>
                            <button className="register-button" type="submit" disabled={fileUploadStatus||loading}>{loading?"SigningUp...":"Register"}</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
