import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {

  const searchText = useRef(null);

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);

  //search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS)
  
    const json = await data.json();

    return json.results;
  }

  const handleGptSaerchClick = async () => {
    console.log(searchText.current.value);

    // make an api call to gpt api and get movie results

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, coma seperated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    console.log(gptResults.choices[0]?.message?.content);

    //Andaz Apna Apna, Chalti Ka Naam Gaadi, Padosan, Chupke Chupke, Chashme Buddoor
    const gptMovieList = gptResults.choices[0]?.message?.content.split(",");

    //for each movie i will search tmdb api

    const promiseArray = gptMovieList.map(movie => searchMovieTMDB(movie)); 

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptMovieList,movieResults: tmdbResults}))

  };

  return (
    <div className='pt-[50%] md:pt-[10%] flex justify-center'>
        <form onSubmit={(e)=>{
          e.preventDefault();
        }} className='w-full md:w-1/2  bg-black grid grid-cols-12'>
            <input ref={searchText} type='text' className='p-6 m-4 col-span-9' placeholder={lang[langKey].gprtSearchPlaceHolder}/>
            <button onClick={handleGptSaerchClick} className='py-2 col-span-3 px-4 m-4 bg-red-700 text-white rounded-lg'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;