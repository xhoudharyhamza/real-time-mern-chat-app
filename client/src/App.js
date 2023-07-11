import { Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chats from "./pages/Chats";
import { useSelector } from "react-redux";
function App() {
  let user= useSelector((state)=>{
    return state.user.user
  })
  return (
    <>
      <Routes>
      <Route exact path="/" element={user?<Chats/>:<Login/>}/>
        <Route exact path="/chat" element={user?<Chats/>:<Login/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
