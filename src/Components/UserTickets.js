import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, createContext } from "react";
import { AuthContext } from "./auth";

export const UserTickets = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [tickets, setTickets] = useState([]);
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        console.log(user)
      axios.get(`https://localhost:7030/api/User/${userId}/tickets`)
      .then(response => {
          setTickets(response.data);
          console.log(response.data);
      })
      .catch(error => {
          console.error('There was an error fetching the data!', error);
      })
    }, [userId]);

    return(
        <>
            <h1 className="text-xl font-bold mb-4">User Tickets</h1>
            {tickets.length > 0 ? (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.id} className="mb-2">
                            <div className="bg-white shadow-md rounded px-4 py-2">
                                <h2 className="text-lg font-bold">{ticket.movieName}</h2>
                                <p>{ticket.date}</p>
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