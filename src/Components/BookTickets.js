import { useAuth } from "./auth";

export const BookTickets = () => {

    const auth = useAuth();

    return(
        <>
            <div>
                Booking tickets page
            </div>
            {!auth.user && (
                <div>
                    <p>Please first sign in or sign up.</p>
                </div>
            )}
            {auth.user && (
                <div>
                   
                </div>
            )}
        </>
        
    );
}