import React, { useEffect } from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

  useNowPlayingMovies();

  usePopularMovies();

  useUpcomingMovies();

  useTopRatedMovies();

  return (
    <div>
      <Header/>  
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse