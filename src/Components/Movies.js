import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Movies = () => {

      const [movies, setMovies] = useState([]);
      useEffect(() => {
        //fetchMovies();

        axios.get('https://localhost:7030/api/Movie')
        .then(response => {
            setMovies(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
      }, []);

        const getImagePath = (movieName) => {
        try {
          return require(`.././MovieImages/${movieName}.jpg`);
        } catch (error) {
          return require(`.././MovieImages/default.jpg`);
        }
      };
      

      /* const fetchMovies = async() => {
        try {
            const moviesData = await MovieService.GetMovies();
            setMovies(moviesData);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
      } */

        /* let navigate = useNavigate(); 
        const routeChange = (id) =>{ 
            let path = `api/Movie/${id}`; 
            navigate(path);
        } */
      
    return(
        <>
            <div>
                <h1 className="inline-block rounded text-white bg-slate-900 py-1 px-3 mx-10">Movie List</h1>
                <ul className="movie-list mx-10">
                    {movies.map(movie => (
                    <li key={movie.id} className="movie-item">
                        <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                            <div className="movie-container">
                                <img 
                                    src={getImagePath(movie.name)} 
                                    alt={movie.name} 
                                    className="movie-image rounded"
                                />
                                <div className="movie-details">
                                    {movie.name}
                                </div>
                            </div>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    );
}