import React from 'react';
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {login} from '../api';
import '../style/login.css';


function Login({setRole}) {
  
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await login({username,password});
        localStorage.setItem("token",res.data.token);
        setRole(res.data.role);
        navigate(res.data.role==='admin'? "/admin":"/user");

      }
      catch(err){
           alert ("Login failed! please try again");
      }
    
    };
return(
    <div>
      <form onSubmit={handleSubmit}>
  <div className="imgcontainer">
    {/* <img src="img_avatar2.png" alt="Avatar" class="avatar"/> */}
  </div>

  <div className="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" value={username} onChange={e=>setUsername(e.target.value)} required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={e=>setPassword(e.target.value)} required/>

    <button type="submit" id='loginbtn'>Login</button>

    <label>
      <input type="checkbox"  name="remember"/>Remember me
    </label>
  </div>

  <div className="container" >
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Don't have an account? <Link to="/register">Register</Link></span>
  </div>
</form>
    </div>
  )
}

export default Login
