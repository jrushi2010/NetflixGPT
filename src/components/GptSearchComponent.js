import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSugesstions from './GptMovieSugesstions'
import { background_Img } from '../utils/constants'


const GptSearchComponent = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img src={background_Img} alt='background image' />

      </div>
      <GptSearchBar />
      <GptMovieSugesstions />
    </div>
  )
}

export default GptSearchComponent