import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/constants'
import {addTrailerVideo} from '../utils/moviesSlice'
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const useMoviewTrailer = (id) =>{

    const dispatch = useDispatch();

    const trailerVideo = useSelector(store => store.movies.trailerVideo)

    const getMovieVideo = async () => {

        const data = await fetch("https://api.themoviedb.org/3/movie/"+id+"/videos", API_OPTIONS)

        const json = await data.json();

        //console.log(json);

        const filterData = json.results.filter((video) => video.type == "Trailer");

        const trailer = filterData.length ? filterData[0] : json.results[0];

        console.log(trailer);

        dispatch(addTrailerVideo(trailer))
    };

    useEffect(() => {
        !trailerVideo && getMovieVideo();
    }, []);

}

export default useMoviewTrailer;