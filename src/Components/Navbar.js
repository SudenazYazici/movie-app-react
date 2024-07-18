import { NavLink } from "react-router-dom";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";

export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        setDropdownOpen(false);
        navigate('/');
    }

    return(
        <>
            <nav className="absolute w-full p-4 flex items-center justify-between z-50">
                <div>
                    <NavLink to='/'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                            Home
                        </button>
                    </NavLink>
                    <NavLink to='/movies'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                            Movies
                        </button>
                    </NavLink>
                    <NavLink to='/movie-theatres'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                            Movie Theatres
                        </button>
                    </NavLink>
                    <NavLink to='/book-tickets'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                            Book Tickets
                        </button>
                    </NavLink>
                </div>
                {!auth.user && (
                    <div>
                        <NavLink to='/login'>
                            <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                Login
                            </button>
                        </NavLink>
                        <NavLink to='/register'>
                            <button className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                                Sign up
                            </button>
                        </NavLink>
                    </div>
                )}
                {auth.user && (
                    <div>
                        <button
                            className="inline-block bg-gray-700 rounded hover:border-gray-200 text-white hover:bg-gray-900 py-2 px-4"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <VscAccount />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                <NavLink to='/tickets'>
                                    <button
                                        className="rounded block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <div>
                                            My Tickets
                                        </div>
                                    </button>
                                </NavLink>
                                <button
                                    className="rounded block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    <div className="flex items-center">
                                        <CgLogOut className="mr-2" />
                                        Logout
                                    </div>
                                    
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </>
        
    );
}