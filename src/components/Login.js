import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkValidData} from '../utils/validate';

const Login = () => {

  const [isSignIn,setIsSignIn] = useState();
  const [errorMsg,setErrorMsg] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm= ()=> {
    setIsSignIn(!isSignIn);
  }

  const handleButtonClick = () => {
    
    // validate the form data 


    console.log(email.current.value);
    console.log(password.current.value);

   const message = checkValidData(email.current.value,password.current.value);
   setErrorMsg(message);
    //console.log(message);

    //sign in and sign up

    
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='background image'/>
    
      </div>
      <form onSubmit={(e)=>{
        e.preventDefault()
      }} className='absolute p-12 text-white bg-black w-3/12 my-36 mx-auto right-0 left-0 bg-opacity-80'>
        
        <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In " : "Sign Up"}</h1>

        <input ref={email} className='p-4 my-4 w-full bg-gray-700 ' type='text' placeholder='Email Address'/>
      
        <input ref={password} className='p-4 my-2 w-full bg-gray-700' type='password' placeholder='Password'/>

        {!isSignIn && <input className='p-4 my-2 w-full bg-gray-700' type='password' placeholder='Confirm Password'/>}

        <p className='text-red-500 font-bold text-lg py-2'>{errorMsg}</p>

        <button className='p-4 mt-6 w-full bg-red-600 rounded-md' onClick={handleButtonClick}>{isSignIn ? "Sign In " : "Sign Up"}</button>
      
        <input type='checkbox'/><span> Remember me </span>
        <p className='mt-14 py-4 cursor-pointer' onClick={toggleSignInForm}>
         {isSignIn ? "New to Netflix?  Sign Up Now" : "Already a User! Sign In Now"} 
        </p>
      </form>
    </div>
  )
}

export default Login