import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import {AdminRegister} from "./AdminRegister";

export const Admin = () => {
    const auth = useAuth();
    const [isAdmin, setIsAdmin ] = useState(false);
    const userRole = localStorage.getItem('userRole');
    const userToken = localStorage.getItem('token');
    const [isMobile, setIsMobile ] = useState(window.innerWidth < 769);

    const [selectedOperation, setSelectedOperation] = useState(null);

    useEffect(() => {
        if(auth.user) {
            setIsAdmin(userRole === "admin");
        }
    }, [auth.user])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 769);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [isError, setIsError] = useState(false);

    const [theatres, setTheatres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [cinemaHalls, setCinemaHalls] = useState([]);
    const [seats, setSeats] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [admins, setAdmins] = useState([]);

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

    const {
        register: registerCinemaHall,
        handleSubmit: handleSubmitCinemaHall,
        formState: { errors: cinemaHallErrors },
    } = useForm();

    const {
        register: registerSeat,
        handleSubmit: handleSubmitSeat,
        formState: { errors: seatErrors },
    } = useForm();

    const {
        register: registerSession,
        handleSubmit: handleSubmitSession,
        formState: { errors: sessionErrors },
    } = useForm();

    const {
        register: registerAdmin,
        handleSubmit: handleSubmitAdmin,
        formState: { errors: adminErrors },
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
            })
            .catch(error => {
                console.error('There was an error adding theatre!', error);
                setIsError(true);
            });
    };

    const onCinemaHallSubmit = (data) => {
        axios.post('https://localhost:7030/api/CinemaHall', data, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
                console.log('Cinema hall added successfully', response.data);
                setIsError(false);
            })
            .catch(error => {
                console.error('There was an error adding cinema hall!', error);
                setIsError(true);
            });
    };

    const onSeatSubmit = (data) => {
        axios.post('https://localhost:7030/api/Seat', data, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
                console.log('Seat added successfully', response.data);
                setIsError(false);
            })
            .catch(error => {
                console.error('There was an error adding seat!', error);
                setIsError(true);
            });
    };

    const onSessionSubmit = (data) => {
        axios.post('https://localhost:7030/api/Session', data, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
                console.log('Session added successfully', response.data);
                setIsError(false);
                //window.location.reload();
            })
            .catch(error => {
                console.error('There was an error adding session!', error);
                setIsError(true);
            });
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
        axios.get('https://localhost:7030/api/CinemaHall')
        .then(response => {
            setCinemaHalls(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
        axios.get('https://localhost:7030/api/Seat')
        .then(response => {
            setSeats(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
        axios.get('https://localhost:7030/api/Session')
        .then(response => {
            setSessions(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
        axios.get('https://localhost:7030/api/User', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const allUsers = response.data;
                const admins = allUsers.filter(user => user.role == "admin");
                setAdmins(admins);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
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
                setTheatres(prevCinemas => prevCinemas.filter(cinema => cinema.id !== cinemaId));
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
    }

    const onDeleteCinemaHall = (cinemaHallId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this cinema hall?");
        
        if (userConfirmed) {
            axios.delete(`https://localhost:7030/api/CinemaHall/${cinemaHallId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Deletion successful', response.data);
                setCinemaHalls(prevCinemaHalls => prevCinemaHalls.filter(cinemaHall => cinemaHall.id !== cinemaHallId));
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
    }

    const onDeleteSeat = (seatId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this seat?");
        
        if (userConfirmed) {
            axios.delete(`https://localhost:7030/api/Seat/${seatId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Deletion successful', response.data);
                setSeats(prevSeats => prevSeats.filter(seat => seat.id !== seatId));
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
    }

    const onDeleteSession = (sessionId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this session?");
        
        if (userConfirmed) {
            axios.delete(`https://localhost:7030/api/Session/${sessionId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Deletion successful', response.data);
                setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
    }

    const onDeleteAdmin = (adminId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this admin?");
        
        if (userConfirmed) {
            axios.delete(`https://localhost:7030/api/User/${adminId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Deletion successful', response.data);
                setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== adminId));
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
    }

    const getCinemaName = (theatreId) => {
        const theatre = theatres.find(theatre => theatre.id === theatreId);
        return theatre ? theatre.name : 'Unknown Cinema';
    };

    const getCinemaHallObject = (cinemaHallId) => {
        const cinemaHall = cinemaHalls.find(cinemaHall => cinemaHall.id === cinemaHallId);
        return cinemaHall ? cinemaHall : null;
    };

    const getCinemaHallName = (cinemaHallId) => {
        const cinemaHall = cinemaHalls.find(cinemaHall => cinemaHall.id === cinemaHallId);
        return cinemaHall ? cinemaHall.hallNum : 'Unknown Cinema Hall';
    };

    const handleMenuSelect = (operation) => {
        setSelectedOperation(operation);
    };

    return(
        <div>
            {isAdmin ? (
                <div>
                    {!isMobile ? ( 
                        <div className="flex justify-center mt-4 space-x-4 mb-32">
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Cinema</button>
                                <div className="absolute left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createCinema')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteCinema')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Movie</button>
                                <div className="absolute left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createMovie')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteMovie')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Cinema Hall</button>
                                <div className="absolute left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createCinemaHall')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteCinemaHall')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Session</button>
                                <div className="absolute left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createSession')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteSession')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Seat</button>
                                <div className="absolute left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createSeat')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteSeat')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Admin</button>
                                <div className="absolute left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createAdmin')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteAdmin')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="flex flex-col space-y-4">
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Cinema</button>
                                <div className="left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createCinema')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteCinema')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Movie</button>
                                <div className="left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createMovie')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteMovie')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Cinema Hall</button>
                                <div className="left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createCinemaHall')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteCinemaHall')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Session</button>
                                <div className="left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createSession')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteSession')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Seat</button>
                                <div className="left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createSeat')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteSeat')}>Delete</button>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="p-2 border border-orange-500 rounded">Admin</button>
                                <div className="left-0 hidden mt-1 space-y-1 border border-orange-500 rounded shadow-lg group-hover:block group-focus-within:block z-10">
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('createAdmin')}>Create</button>
                                    <button className="block px-4 py-2 text-left" onClick={() => handleMenuSelect('deleteAdmin')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                    

                    {/* <div className="flex flex-col items-center sm:flex-row"> */}
                    {selectedOperation === "createCinema" && (
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
                    )}

                    {selectedOperation === "createMovie" && (
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
                    )}
                        
                        {selectedOperation === "deleteCinema" && (
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
                        )}
                    {/* </div> */}

                    {selectedOperation === "deleteMovie" && (
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
                        </div>
                    )}

                    {selectedOperation === "createCinemaHall" && (
                        <div className="max-w-md mx-auto w-96 h-96">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmitCinemaHall(onCinemaHallSubmit)}>
                                <div className="text-black font-bold text-center">Add Cinema Hall</div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cinema-hall-number">
                                        Cinema Hall Number
                                    </label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="cinema-hall-number" 
                                        type="text" 
                                        placeholder="Cinema hall number" 
                                        {...registerCinemaHall("name", { required: true })} 
                                    />
                                </div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cinema">
                                        Cinema
                                    </label>
                                    <select 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="cinema" 
                                        {...registerCinemaHall("cinemaId", { required: true })}
                                    >
                                        <option value="">Select a cinema</option>
                                        {theatres.map((theatre) => (
                                            <option key={theatre.id} value={theatre.id}>{theatre.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center justify-between form-control">
                                    <button 
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                        type="submit"
                                    >
                                        Add Cinema Hall
                                    </button>
                                </div>
                                {isError && <p className="mt-5 text-red-500 text-xs italic">There was an error adding the cinema hall! Please try again.</p>}
                            </form>
                        </div>
                    )}

                    {selectedOperation === "deleteCinemaHall" && (
                        <div className="flex flex-col items-center sm:flex-row">
                        <div className="relative overflow-scroll rounded mt-10 max-w-md mx-auto w-96 h-96 mb-20">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Cinema Hall</th>
                                        <th scope="col" className="px-6 py-3">Cinema</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cinemaHalls.map(cinemaHall => (
                                        <tr key={cinemaHall.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {cinemaHall.hallNum}
                                            </th>
                                            <td className="px-6 py-4">
                                                {getCinemaName(cinemaHall.cinemaId)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => onDeleteCinemaHall(cinemaHall.id)} className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {selectedOperation === "createSeat" && (
                        <div className="max-w-md mx-auto w-96 h-96">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmitSeat(onSeatSubmit)}>
                                <div className="text-black font-bold text-center">Add Seat</div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seat-number">
                                        Seat Number
                                    </label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="seat-number" 
                                        type="text" 
                                        placeholder="Seat number" 
                                        {...registerSeat("seatNum", { required: true })} 
                                    />
                                </div>
                                <div className="mb-4 form-control">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cinema-hall">
                                        Cinema Hall
                                    </label>
                                    <select 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="cinema-hall" 
                                        {...registerSeat("cinemaHallId", { required: true })}
                                    >
                                        <option value="">Select a cinema hall</option>
                                        {cinemaHalls.map((cinemaHall) => (
                                            <option key={cinemaHall.id} value={cinemaHall.id}>{cinemaHall.hallNum}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center justify-between form-control">
                                    <button 
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                        type="submit"
                                    >
                                        Add Seat
                                    </button>
                                </div>
                                {isError && <p className="mt-5 text-red-500 text-xs italic">There was an error adding the seat! Please try again.</p>}
                            </form>
                        </div>
                    )}

                    {selectedOperation === "deleteSeat" && (
                        <div className="flex flex-col items-center sm:flex-row">
                        <div className="relative overflow-scroll rounded mt-10 max-w-md mx-auto w-96 h-96 mb-20">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Seat</th>
                                        <th scope="col" className="px-6 py-3">Cinema Hall</th>
                                        <th scope="col" className="px-6 py-3">Cinema</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seats.map(seat => (
                                        <tr key={seat.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {seat.seatNum}
                                            </th>
                                            <td className="px-6 py-4">
                                                {getCinemaHallName(seat.cinemaHallId)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getCinemaName(getCinemaHallObject(seat.cinemaHallId).cinemaId)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => onDeleteSeat(seat.id)} className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {selectedOperation === "createAdmin" && (
                        <AdminRegister></AdminRegister>
                    )}

                    {selectedOperation === "deleteAdmin" && (
                            <div className="relative overflow-scroll rounded mt-10 max-w-md mx-auto w-96 h-96 mb-20">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Admins
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins.map(admin => (
                                            <tr key={admin.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {admin.email}
                                                </th>
                                                <td className="px-6 py-4">
                                                <button onClick={() => onDeleteAdmin(admin.id)} className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                                                        Delete
                                                </button>
                                                </td>
                                            </tr>
                                        ))} 
                                    </tbody>
                                </table>
                            </div>
                        )}
                    
                    
                </div>
                
            ) : (
                <div>You do not have access to this page.</div>
            )}
        </div>
    );
}