import { Movies } from "./Movies";
import { MovieTheatres } from "./MovieTheatres";

export const Home = () => {
    return(
        <>
            <div className="mb-10">
                Welcome to Movie Theatre App!
            </div>
            <Movies/>
            <MovieTheatres/>
        </>
        
    );
}