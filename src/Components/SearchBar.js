import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SearchBar = () => {

    const [input, setInput] = useState();
    const [movies, setMovies] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
      useEffect(() => {
        axios.get('https://localhost:7030/api/Movie')
        .then(response => {
            setMovies(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        })
      }, []);

      const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if(value) {
            setFilteredMovies(movies.filter(movie => movie.name.toLowerCase().includes(value.toLowerCase())));
            setDropdownOpen(true);
        }else {
            setFilteredMovies([]);
            setDropdownOpen(false);
        }

      }

    return(
        <div>
            <div className="flex items-center">
                <FaSearch />
                <input value={input || ''} onChange={handleInputChange} className="mx-2 rounded w-56 text-black px-1" placeholder="Search a movie"/>
            </div>
            {dropdownOpen && (
                <ul className="absolute z-10 bg-white shadow-lg rounded mt-2 w-56 max-h-60 overflow-y-auto">
                {filteredMovies.map(movie => (
                <li key={movie.id} className="text-black mx-2 block border-b border-gray-200">
                    <Link to={`/movies/${movie.id}`} className="btn btn-primary block p-2 mb-2 hover:bg-gray-100">
                        <div>
                            <div>
                                {movie.name}
                            </div>
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
            )}
        </div>
        
    );
}