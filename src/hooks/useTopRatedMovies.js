import {API_OPTIONS} from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addTopRatedMovies} from '../utils/moviesSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const useTopRatedMovies = () => {

    const dispatch = useDispatch();

    const topRated = useSelector(store => store.movies.topRated)

    const getTopRatedMovies = async () =>{

      const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1",API_OPTIONS);
    
      const json = await data.json();
  
      //console.log(json.results);
  
      dispatch(addTopRatedMovies(json.results));
    
    }
  
    useEffect(()=>{
      !topRated && getTopRatedMovies();
    },[]);
}

export default useTopRatedMovies