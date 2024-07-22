import { Movies } from "./Movies";
import { MovieTheatres } from "./MovieTheatres";

export const Home = () => {
    return(
        <>
            <div className="m-10 font-extrabold">
                Welcome to Movie Theatre App!
            </div>
            <Movies/>
            <MovieTheatres/>
        </>
        
    );
}