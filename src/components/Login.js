import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {background_Img} from '../utils/constants'

const Login = () => {

  const [isSignIn, setIsSignIn] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const name = useRef();
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMsg(message);

    if (message) return;

    //sign in or sign up logic
    if (!isSignIn) {
      //sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          //updating the profile with name
          updateProfile(user, {
            displayName: name.current.value, photoURL: ""
          }).then(() => {
            //console.log(user);
            const { uid, email, displayName } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
          }).catch((error) => {
            setErrorMsg(error.message);
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    }

    else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          //console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    }


  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className='h-screen object-cover md:object-none md:h-auto' src={background_Img} alt='background image' />

      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
      }} className='absolute p-12 text-white bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 bg-opacity-80'>

        <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In " : "Sign Up"}</h1>

        {!isSignIn && <input ref={name} className='p-4 my-2 w-full bg-gray-700' type='text' placeholder='Full Name' />}

        <input ref={email} className='p-4 my-4 w-full bg-gray-700 ' type='text' placeholder='Email Address' />

        <input ref={password} className='p-4 my-2 w-full bg-gray-700' type='password' placeholder='Password' />

        {!isSignIn && <input className='p-4 my-2 w-full bg-gray-700' type='password' placeholder='Confirm Password' />}

        <p className='text-red-500 font-bold text-lg py-2'>{errorMsg}</p>

        <button className='p-4 mt-6 w-full bg-red-600 rounded-md' onClick={handleButtonClick}>{isSignIn ? "Sign In " : "Sign Up"}</button>

        <input type='checkbox' /><span> Remember me </span>
        <p className='mt-14 py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignIn ? "New to Netflix?  Sign Up Now" : "Already a User! Sign In Now"}
        </p>
      </form>
    </div>
  )
}

export default Login