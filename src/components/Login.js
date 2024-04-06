'use client'

import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'

export default function Login() {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true)

  const { currentUser, login, logout, userInfo, signup} = useAuth()

  console.log(currentUser)

  async function submitHandler(){
      if (!email || !password){
          setError('Invalid email or password')
          return
      }

      if (isLogin){
          try {
              await login(email, password)
          } catch (err) {
              setError('Incorrect Email or Password')
          }
          return
      }
      try{
          await signup(email, password)
          // setEmail('')
          // setPassword('')
      } catch (err) {
          setError('Failed to create an account')

      }

  }

  return (
    <div className = "hero">
      <div className = "space-y-2 items-center text-center">
        <h1 className="mb-5 text-5xl font-bold text-center items-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>

        {error && 
        <div 
        className = "w-full max-w-[40ch] border-rose-400 border text-center text-rose-400 py-2">
            {error}
        </div>
            }

        <div className="input input-bordered flex items-center gap-2 w-full max-w-[40ch]">
          <i className="fa-solid fa-envelope"/>
          <input type="text" className="grow text-gray-100" placeholder="Email" value={email} 
          onChange = {(e) => setEmail(e.target.value)}/>
        </div>

        <div className="input input-bordered flex items-center gap-2 w-full max-w-[40ch]">
          <i className="fa-solid fa-key"/>
          <input type="password" className="grow text-gray-100" placeholder='Password' value={password} 
          onChange = {(e) => setPassword(e.target.value)}/>
        </div>

        <button 
        className="btn btn-neutral duration-300 hover:opacity-40 cursor-pointer"
        onClick = {submitHandler}
        >
          Sign in
        </button>
        <h2 className="mb-5 text-xl font-bold duration-300 hover:opacity-40 cursor-pointer" 
        onClick = {()=>{setIsLogin(!isLogin)}}> 
          {!isLogin ? 'Login' : 'Sign Up'}
        </h2>
      </div>
    </div>
  )
    
}
