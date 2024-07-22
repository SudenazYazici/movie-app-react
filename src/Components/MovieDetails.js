import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export const MovieDetails = () => {
    const params = useParams();
    const id = params.id;
    const [movie, setMovie] = useState([]);

    const getImagePath = (movieName) => {
        try {
          return require(`.././MovieImages/${movieName}.jpg`);
        } catch (error) {
          return require(`.././MovieImages/default.jpg`);
        }
      };

    useEffect(() => {
        axios.get(`https://localhost:7030/api/Movie/by-id/${id}`)
          .then(response => {
            setMovie(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the data!', error);
          });
      }, [id]);

      
    return(
        <>
            {movie ? (
            <div className="ml-5">
            <h1 className="mb-5 inline-block rounded text-white bg-slate-900 py-1 px-3">Movie Details</h1>
            <div className="movie-item">
              <div className="mb-5 flex flex-col sm:flex-row">
                <img 
                  src={getImagePath(movie.name)} 
                  alt={movie.name} 
                  width="300" 
                  height="450" 
                  className="rounded mb-5"
                  />
                  <div className="ml-5">
                    <div className="flex items-center space-x-2">
                      <h2 className="font-bold">Movie Name:</h2>
                      <p>{movie.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-bold">Movie Details:</h2>
                      <p>{movie.details}</p>
                    </div>
                    <Link to='/book-tickets'>
                        <button className="mt-5 inline-block bg-green-700 rounded hover:border-gray-200 text-white hover:bg-green-900 py-1 px-3">
                            Buy Ticket
                        </button>
                    </Link>
                  </div>
                
              </div>
                <Link to="/movies" className="bg-orange-500 rounded hover:border-gray-200 text-white hover:bg-orange-700 py-1 px-3">
                  Back to Movie List
                </Link>
            </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}