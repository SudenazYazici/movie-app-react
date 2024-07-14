import { useAuth } from "./auth";
import axios from "axios";
import { useState, useEffect } from "react";

export const BookTickets = () => {

    const auth = useAuth();

    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [theatres, setTheatres] = useState([]);
    const [selectedTheatreId, setSelectedTheatreId] = useState(null);
    const getImagePath = (movieName) => {
        try {
          return require(`.././MovieImages/${movieName}.jpg`);
        } catch (error) {
          return require(`.././MovieImages/default.jpg`);
        }
      };
    useEffect(() => {
        axios.get('https://localhost:7030/api/Cinema')
        .then(response => {
            setTheatres(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })

        axios.get('https://localhost:7030/api/Movie')
        .then(response => {
            setMovies(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
    }, []);

    const handleRowClick = (id) => {
        setSelectedTheatreId(id);
    };
    const handleMovieClick = (id) => {
        setSelectedMovieId(id);
    };

    return(
        <>
            {!auth.user && (
                <div>
                    <p>Please first sign in or sign up.</p>
                </div>
            )}
            {auth.user && (
                <div>

                    <div className="relative overflow-x-auto rounded mt-10 mx-10">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Theatre name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        City
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {theatres.map(theatre => (
                                    <tr key={theatre.id}
                                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${selectedTheatreId === theatre.id ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                                     onClick={() => handleRowClick(theatre.id)}>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {theatre.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {theatre.city}
                                        </td>
                                        <td className="px-6 py-4">
                                            {theatre.address}
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h1 className="inline-block rounded text-white bg-slate-900 py-1 px-3 mx-10">Movie List</h1>
                        <ul className="movie-list mx-10">
                            {movies.map(movie => (
                            <li key={movie.id} 
                            className={`relative p-4 cursor-pointer ${selectedMovieId === movie.id ? 'border border-red-500' : ''}`}
                            onClick={() => handleMovieClick(movie.id)}>
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
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
        
    );
}