import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSugesstions from './GptMovieSugesstions'
import { background_Img } from '../utils/constants'


const GptSearchComponent = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className='h-screen object-cover md:object-none md:h-auto' src={background_Img} alt='background image' />

      </div>

      <div className=''>

        <GptSearchBar />
        <GptMovieSugesstions />
      </div>
    </>
  )
}

export default GptSearchComponent