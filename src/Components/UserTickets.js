import React, {useState, useEffect} from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./auth";

export const UserTickets = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        console.log(user)
      axios.get(`https://localhost:7030/api/User/${userId}/tickets`)
      .then(async response => {
        const ticketsData = response.data;

        const fetchDetails = async (ticket) => {
            const cinemaResponse = await axios.get(`https://localhost:7030/api/Cinema/${ticket.cinemaId}`);
            const cinemaHallResponse = await axios.get(`https://localhost:7030/api/CinemaHall/${ticket.cinemaHallId}`);
            const seatResponse = await axios.get(`https://localhost:7030/api/Seat/${ticket.seatId}`);

            return { 
                ...ticket,
                cinema: cinemaResponse.data.name,
                cinemaHall: cinemaHallResponse.data.hallNum,
                seat: seatResponse.data.seatNum
            };
        };

        const ticketsWithDetails = await Promise.all(ticketsData.map(ticket => fetchDetails(ticket)));
        setTickets(ticketsWithDetails);
      })
      .catch(error => {
          console.error('There was an error fetching the data!', error);
      })
    }, [userId]);

    const formatDateTime = (date) => {
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false
          };
          return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    }

    const onClick = (ticketId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this ticket?");

        if(userConfirmed) {
            axios.delete(`https://localhost:7030/api/Ticket/${ticketId}`)
            .then(response => {
                console.log('Deletion successful', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error deleting!', error);
            });
        }
        
    };

    return(
        <>
            <h1 className="text-xl font-bold mb-4">User Tickets</h1>
            {tickets.length > 0 ? (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.id} className="mb-2">
                            <div className="bg-white text-black shadow-md rounded px-4 py-2">
                                <h2 className="text-lg font-bold">Movie: {ticket.movieName}</h2>
                                <p className="text-neutral-500">Cinema: {ticket.cinema}</p>
                                <p className="text-neutral-500">Cinema Hall: {ticket.cinemaHall}</p>
                                <p className="text-neutral-500">Seat: {ticket.seat}</p>
                                <p className="text-neutral-500">Date: {formatDateTime(ticket.date)}</p>
                                <p className="text-neutral-500">Price: {ticket.price}</p>
                                <button onClick={() => onClick(ticket.id)} className="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Delete Ticket
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tickets found for this user.</p>
            )}
        </>
    );
}