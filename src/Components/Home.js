import { Movies } from "./Movies";
import { MovieTheatres } from "./MovieTheatres";

export const Home = () => {
    return(
        <>
            <div className="m-10 font-extrabold text-5xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-900">
                    Welcome to Movie Theatre App!
                </span>
            </div>
            <Movies/>
            <MovieTheatres/>
        </>
        
    );
}