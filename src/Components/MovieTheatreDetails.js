import { useParams } from "react-router-dom";

export const MovieTheatreDetails = () => {
    const params = useParams();
    const theatreName = params.theatreName;
    return(
        <>
            <div>{theatreName}</div>
        </>
    );
}