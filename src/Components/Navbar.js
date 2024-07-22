import { NavLink } from "react-router-dom";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { SearchBar } from "./SearchBar";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";

export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMobile, setIsMobile ] = useState(window.innerWidth < 769);
    const [showModal, setShowModal ] = useState(false);

    const auth = useAuth();
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();

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

    const handleLogout = () => {
        auth.logout();
        setDropdownOpen(false);
        navigate('/');
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleBarsIconClick = () => {
        toggleModal();
    };

    return(
        <>
            {!isMobile ? ( 
                // Laptop Navbar code
                <nav className="absolute w-full p-4 flex items-center justify-between z-50">
                    <div>
                        <NavLink to='/'>
                            <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                Home
                            </button>
                        </NavLink>
                        <NavLink to='/movies'>
                            <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                Movies
                            </button>
                        </NavLink>
                        <NavLink to='/movie-theatres'>
                            <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                Movie Theatres
                            </button>
                        </NavLink>
                        <NavLink to='/book-tickets'>
                            <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                Book Tickets
                            </button>
                        </NavLink>
                        {auth.user && isAdmin ? (
                            <NavLink to='/admin'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Panel
                                </button>
                            </NavLink>
                        ): (
                            <div></div>
                        )}
                    </div>
                    {!auth.user && (
                        <div className="flex items-center">
                            <SearchBar/>
                            <NavLink to='/admin-register'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Admin
                                </button>
                            </NavLink>
                            <NavLink to='/login'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-3 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Login
                                </button>
                            </NavLink>
                            <NavLink to='/register'>
                                <button className="inline-block bg-orange-700 rounded hover:border-gray-200 text-white hover:bg-orange-900 py-1 px-3">
                                    Sign up
                                </button>
                            </NavLink>
                        </div>
                    )}
                    {auth.user && (
                        <div>
                            <div className="flex items-center">
                                <SearchBar/>
                                <button
                                    className="inline-block bg-gray-700 rounded hover:border-gray-200 text-white hover:bg-gray-900 py-2 px-4"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <VscAccount />
                                </button>
                            </div>
                            
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
            ) : (
                // Mobile Navbar code
                <div className="bg-zinc-800">
                    <div className="flex items-center">
                        <FaBars onClick={handleBarsIconClick} className="text-white cursor-pointer m-4" />
                        <SearchBar/>
                    </div>
                    
                    {showModal && (
                        <div className="flex flex-col bg-zinc-700">
                            <NavLink to='/'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Home
                                </button>
                            </NavLink>
                            <NavLink to='/movies'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Movies
                                </button>
                            </NavLink>
                            <NavLink to='/movie-theatres'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Movie Theatres
                                </button>
                            </NavLink>
                            <NavLink to='/book-tickets'>
                                <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                    Book Tickets
                                </button>
                            </NavLink>
                            {auth.user && isAdmin ? (
                                <NavLink to='/admin'>
                                    <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                        Panel
                                    </button>
                                </NavLink>
                            ): (
                                <div></div>
                            )}
                            {!auth.user ? (
                                <div className="flex flex-col">
                                    <NavLink to='/admin-register'>
                                        <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                            Admin
                                        </button>
                                    </NavLink>
                                    <NavLink to='/login'>
                                        <button className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                            Login
                                        </button>
                                    </NavLink>
                                    <NavLink to='/register'>
                                        <button className="inline-block bg-orange-700 rounded hover:border-gray-200 text-white hover:bg-orange-900 py-1 px-5">
                                            Sign up
                                        </button>
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    <NavLink to='/tickets'>
                                        <button
                                            className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <div>
                                                My Tickets
                                            </div>
                                        </button>
                                    </NavLink>
                                        <button
                                            className="inline-block rounded text-orange-400 hover:bg-zinc-800 py-1 px-5 hover:text-white"
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
                </div>
            )}
        </>
    );
}