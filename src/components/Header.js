import React, {useEffect} from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import {logo,userIcon} from "../utils/constants";
import {toggleGptSearchView} from '../utils/gptSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);


  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign in case
        const {uid,email,displayName} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}));
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });
    //unscubscribe when component unmount 
    return () => unsubscribe();
  },[]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  const handleGptSearchClick = () =>{
    // Toggle GPT Search button
    dispatch(toggleGptSearchView());
  }

  return (
    <div className="absolute  w-screen px-6 py-1 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className='w-52' src={logo} alt='logo' />
      {user && 
      <div className='flex p-2'>
        <button className='py-2 px-4 mx-4 mt-0 mb-5 text-white bg-purple-800 rounded-lg' onClick={handleGptSearchClick}>GPT Search</button>
        <img className='w-12 h-12' src={userIcon} alt='user icon' />
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>
      }
    </div>
  )
}

export default Header