import {API_OPTIONS} from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addPopularMovies} from '../utils/moviesSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const usePopularMovies = () => {

    const dispatch = useDispatch(store => store.movies.popularMovies);

    const popularMovies = useSelector

    const getPopularMovies = async () =>{

      const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1",API_OPTIONS);
    
      const json = await data.json();
  
      //console.log(json.results);
  
      dispatch(addPopularMovies(json.results));
    
    }
  
    useEffect(()=>{
       !popularMovies && getPopularMovies();
    },[]);
  
}

export default usePopularMovies