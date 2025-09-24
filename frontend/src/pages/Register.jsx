import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from "../api";
import '../style/register.css';
function Register() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await register ({username,password});
      alert("User registered successfully!");
      navigate("/");
    }
    catch(err)
    {
      alert("Registration failed!");
    }
    
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    
    <hr/>
     <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="psw" id="psw" value={username} onChange={e=>setUsername(e.target.value)} required/>
    <label for="psw-repeat"><b>Enter Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw-repeat" id="psw-repeat" value={password} onChange={e=>setPassword(e.target.value)} required/>
    

    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
    <button type="submit" class="registerbtn">Register</button>
  

 
</form>
    </div>
  )
}

export default Register
