import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Admin = () => {
    const auth = useAuth();
    const [isAdmin, setIsAdmin ] = useState(false);
    const userRole = localStorage.getItem('userRole');
    const userToken = localStorage.getItem('token');

    useEffect(() => {
        if(auth.user) {
            setIsAdmin(userRole === "admin");
        }
    }, [auth.user])

    const [isError, setIsError] = useState(false);

    const {
        register: registerMovie,
        handleSubmit: handleSubmitMovie,
        formState: { errors: movieErrors },
    } = useForm();

    const {
        register: registerTheatre,
        handleSubmit: handleSubmitTheatre,
        formState: { errors: theatreErrors },
    } = useForm();

    const onMovieSubmit = (data) => {
        axios.post('https://localhost:7030/api/Movie', data, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('Movie added successfully', response.data);
          setIsError(false);
          window.location.reload();
        })
        .catch(error => {
          console.error('There was an error adding the movie!', error);
          setIsError(true);
        });
      };

    const onTheatreSubmit = (data) => {
        axios.post('https://localhost:7030/api/Cinema', data, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
                console.log('Theatre added successfully', response.data);
                setIsError(false);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error adding theatre!', error);
                setIsError(true);
            });
    };
    const [theatres, setTheatres] = useState([]);
    const [movies, setMovies] = useState([]);
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

    const onDeleteMovie = (movieId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this movie?");

        if(userConfirmed) {
            axios.delete(`https://localhost:7030/api/Movie/${movieId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Deletion successful', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
        
    };

    const onDeleteCinema = (cinemaId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this movie theatre?");
        
        if (userConfirmed) {
            axios.delete(`https://localhost:7030/api/Cinema/${cinemaId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Deletion successful', response.data);
                window.location.reload(); // Consider using React state to update the UI instead of reloading
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
    }

    return(
        <div>
            {isAdmin ? (
                <div>
                    <div className="flex flex-col items-center sm:flex-row">
                        <div className="max-w-md mx-auto w-96 h-96">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmitMovie(onMovieSubmit)}>
                                <div className="text-black font-bold text-center">Add Movie</div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="movie-name">
                                        Movie name
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="movie-name" type="text" placeholder="Movie name" {...registerMovie("name", { required: true })}/>
                                </div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="movie-details">
                                        Movie Details
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="movie-details" type="text" placeholder="Movie details" {...registerMovie("details", { required: true })}/>
                                </div>
                                <div className="flex items-center justify-between form-control">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Add Movie
                                    </button>
                                </div>
                                {isError && <p className="mt-5 text-red-500 text-xs italic">There was an error adding movie! Please try again.</p>}
                            </form>
                        </div>
                        
                        <div className="max-w-md mx-auto w-96 h-96">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmitTheatre(onTheatreSubmit)}>
                                <div className="text-black font-bold text-center">Add Movie Theatre</div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="theatre-name">
                                        Theatre name
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="theatre-name" type="text" placeholder="Theatre name" {...registerTheatre("name", { required: true })}/>
                                </div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                        City
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="City" {...registerTheatre("city", { required: true })}/>
                                </div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                        Address
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Address" {...registerTheatre("address", { required: true })}/>
                                </div>
                                <div className="flex items-center justify-between form-control">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Add Theatre
                                    </button>
                                </div>
                                {isError && <p className="mt-5 text-red-500 text-xs italic">There was an error adding theatre! Please try again.</p>}
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:flex-row">
                        <div className="relative overflow-scroll rounded mt-10 max-w-md mx-auto w-96 h-96 mb-20">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            All Movies
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map(movie => (
                                        <tr key={movie.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {movie.name}
                                            </th>
                                            <td className="px-6 py-4">
                                            <button onClick={() => onDeleteMovie(movie.id)} className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                                                   Delete
                                            </button>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                             </table>
                         </div>
                        <div className="relative overflow-scroll rounded mt-10 max-w-md mx-auto w-96 h-96 mb-20">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            All Movie Theatres
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {theatres.map(theatre => (
                                        <tr key={theatre.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {theatre.name}
                                            </th>
                                            <td className="px-6 py-4">
                                            <button onClick={() => onDeleteCinema(theatre.id)} className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                                                    Delete
                                            </button>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                
            ) : (
                <div>You do not have access to this page.</div>
            )}
        </div>
    );
}