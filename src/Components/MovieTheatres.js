import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const MovieTheatres = () => {
    const [theatres, setTheatres] = useState([]);
      useEffect(() => {

        axios.get('https://localhost:7030/api/Cinema')
        .then(response => {
            setTheatres(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
      }, []);
    return(
        <>
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
                            <th scope="col" className="px-6 py-3">
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {theatres.map(theatre => (
                            <tr key={theatre.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {theatre.name}
                                </th>
                                <td className="px-6 py-4">
                                    {theatre.city}
                                </td>
                                <td className="px-6 py-4">
                                    {theatre.address}
                                </td>
                                <td className="px-6 py-4">
                                <Link to='/book-tickets'>
                                    <button className="inline-block bg-green-700 rounded hover:border-gray-200 text-white hover:bg-green-900 py-1 px-3">
                                        Buy Ticket
                                    </button>
                                </Link>
                                </td>
                            </tr>
                        ))} 
                    </tbody>

                </table>
            </div>
        </>
    );
}