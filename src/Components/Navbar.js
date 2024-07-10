import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return(
        <>
            <nav className="absolute w-full p-4 flex items-center justify-between z-50">
                <div>
                    <NavLink to='/'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white">
                            Home
                        </button>
                    </NavLink>
                    <NavLink to='/movies'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white">
                            Movies
                        </button>
                    </NavLink>
                    <NavLink to='/movie-theatres'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white">
                            Movie Theatres
                        </button>
                    </NavLink>
                    <NavLink to='/book-tickets'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white">
                            Book Tickets
                        </button>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/login'>
                        <button className="inline-block rounded text-red-400 hover:bg-slate-900 py-1 px-3 hover:text-white">
                            Login
                        </button>
                    </NavLink>
                    <NavLink to='/register'>
                        <button className="inline-block bg-red-700 rounded hover:border-gray-200 text-white hover:bg-red-900 py-1 px-3">
                            Sign up
                        </button>
                    </NavLink>
                </div>
            </nav>
        </>
        
    );
}