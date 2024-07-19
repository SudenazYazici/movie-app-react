import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Admin = () => {
    const auth = useAuth();
    const [isAdmin, setIsAdmin ] = useState(false);
    const userRole = localStorage.getItem('userRole');

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
        axios.post('https://localhost:7030/api/Movie', data)
            .then(response => {
                console.log('Registration successful', response.data);
                setIsError(false);
            })
            .catch(error => {
                console.error('There was an error adding movie!', error);
                setIsError(true);
            });
    };

    const onTheatreSubmit = (data) => {
        axios.post('https://localhost:7030/api/Cinema', data)
            .then(response => {
                console.log('Registration successful', response.data);
                setIsError(false);
            })
            .catch(error => {
                console.error('There was an error adding theatre!', error);
                setIsError(true);
            });
    };

    return(
        <div>
            {isAdmin ? (
                <div>
                    
                    <div className="max-w-md mx-auto">
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
                    
                    <div className="max-w-md mx-auto">
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
                
            ) : (
                <div>You do not have access to this page.</div>
            )}
        </div>
    );
}