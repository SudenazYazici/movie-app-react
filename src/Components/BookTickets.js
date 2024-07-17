import { useAuth } from "./auth";
import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const BookTickets = () => {

    const auth = useAuth();

    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState("");
    const [theatres, setTheatres] = useState([]);
    const [selectedTheatreId, setSelectedTheatreId] = useState("");
    const [cinemaHalls, setCinemaHalls] = useState([]);
    const [selectedCinemaHallId, setSelectedCinemaHallId] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [seats, setSeats] = useState([]);
    const [selectedSeatId, setSelectedSeatId] = useState("");
    const [userTickets, setUserTickets] = useState([]);
    /* const [startIndex, setStartIndex] = useState(0);
    const moviesPerPage = 6; */

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
        /* if (auth.user) {
            const userTicketsResponse = axios.get(`https://localhost:7030/api/User/${auth.user.id}/tickets`);
            setUserTickets(userTicketsResponse.data);
        } */
    }, []);

    useEffect(() => {
        if (selectedTheatreId) {
            axios.get(`https://localhost:7030/api/Cinema/${selectedTheatreId}/cinemaHalls`)
            .then(response => {
                setCinemaHalls(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            })

            if(selectedCinemaHallId) {
                axios.get(`https://localhost:7030/api/CinemaHall/${selectedCinemaHallId}/seats`)
            .then(response => {
                setSeats(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            })
            }
        }
    }, [selectedTheatreId, selectedCinemaHallId]);

    const handleRowClick = (id) => {
        setSelectedTheatreId(id);
    };
    const handleMovieClick = (id) => {
        setSelectedMovieId(id);
    };
    const handleCinemaHallChange = (event) => {
        setSelectedCinemaHallId(event.target.value);
    };
    const handleDateTimeChange = (date) => {
        setSelectedDateTime(date);
    };
    const handleSeatChange = (event) => {
        setSelectedSeatId(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedMovieId || !selectedTheatreId || !selectedCinemaHallId || !selectedDateTime) {
            alert("Please select a movie, theatre, cinema hall, seat, and date-time.");
            return;
        }

        console.log(auth.user);

        const selectedMovie = movies.find(movie => movie.id === selectedMovieId);
        const ticketData = {
            MovieName: selectedMovie.name,
            UserId: auth.user.id,
            CinemaId: selectedTheatreId,
            CinemaHallId: selectedCinemaHallId,
            SeatId: selectedSeatId,
            Date: selectedDateTime.toISOString(),
            Price: 10 // Assuming a default price
        };

        axios.post('https://localhost:7030/api/Ticket', ticketData)
            .then(response => {
                console.log('Registration successful', response.data);
            })
            .catch(error => {
                console.error('There was an error buying ticket!', error);
            });
    };
    /* const handleNextClick = () => { // use these later
        setStartIndex(startIndex + moviesPerPage);
    }; 
    const handlePrevClick = () => {
        setStartIndex(startIndex - moviesPerPage);
    }; */

    const today = new Date();
    const oneWeekFromToday = new Date();
    oneWeekFromToday.setDate(today.getDate() + 7);

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
                                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${selectedTheatreId === theatre.id ? 'bg-red-200 dark:bg-red-600' : ''}`}
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
                        <ul className="movie-list mx-10">
                            {movies.map(movie => (
                            <li key={movie.id} 
                            className={`relative p-4 cursor-pointer ${selectedMovieId === movie.id ? 'border border-red-500 rounded' : ''}`}
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
                    {/* {selectedTheatreId && selectedMovieId && (
                        <div className="text-center mt-4">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleBookTicket}
                            >
                                Book Ticket
                            </button>
                        </div>
                    )} */}
                    <div className="flex">

                        {selectedTheatreId && (
                            <div className="mt-10 mx-10">
                                <label htmlFor="cinemaHall" className="block text-sm font-medium text-gray-700">Select Cinema Hall</label>
                                <select
                                    id="cinemaHall"
                                    className="mb-5 text-black block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedCinemaHallId}
                                    onChange={handleCinemaHallChange}
                                >
                                    <option value="">Select a cinema hall</option>
                                    {cinemaHalls.map(hall => (
                                        <option key={hall.id} value={hall.id}>{hall.hallNum}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {selectedTheatreId && (
                            <div className="mt-10 mx-10">
                                <label htmlFor="seat" className="block text-sm font-medium text-gray-700">Select Seat</label>
                                <select
                                    id="seat"
                                    className="mb-5 text-black block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedSeatId}
                                    onChange={handleSeatChange}
                                >
                                    <option value="">Select a seat</option>
                                    {seats.map(seat => (
                                        <option key={seat.id} value={seat.id}>{seat.id}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {selectedTheatreId && (
                            <div className="mt-10 mx-10">
                                <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Select Date and Time</label>
                                <DatePicker
                                    id="dateTime"
                                    className="mb-5 text-black block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    selected={selectedDateTime}
                                    onChange={handleDateTimeChange}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    minDate={new Date()}
                                    maxDate={oneWeekFromToday}
                                    minTime={new Date(0, 0, 0, 9, 0)}
                                    maxTime={new Date(0, 0, 0, 23, 30)}
                                />
                            </div>
                        )}

                        {selectedTheatreId && selectedMovieId && selectedCinemaHallId && selectedSeatId && selectedDateTime && (
                            <div className="text-center mt-10 mx-10">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSubmit}
                                >
                                    Book Ticket
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}