import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import { useAuth } from '../hooks/useAuth';

const Register = () => {

  const {loading, handleRagister} = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e)=>{
    e.preventDefault();
    await handleRagister({
      username,
      email,
      password
    })
    setUsername("");
    setEmail("");
    setPassword("");
    navigate('/');
  }

  if (loading) {
    return <main>
      <p style={{fontSize: '5vw'}}>Loading...</p>
      </main>;
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Resiter User</h1>
        <form onSubmit={submitHandler}>
          <div className='input-group'>
            <label htmlFor="name">UserName</label>
            <input type="text" name='name' id='name' placeholder='Enter your name' value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='input-group'>
            <label htmlFor="email">Password</label>
            <input type="password" name='password' id='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type='submit' className='button primary-button'>Login</button>
        </form>
        <p>Already have account, <Link className='link' to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register