import { useEffect, useState } from "react";
import { Register } from "./Register";
import { useAuth } from "./auth";

export const Admin = () => {
    const auth = useAuth();
    const [isAdmin, setIsAdmin ] = useState(false);
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if(auth.user) {
            setIsAdmin(userRole === "admin");
        }
    }, [auth.user])

    return(
        <div>
            {isAdmin ? (
                <div>Admin page</div>
            ) : (
                <div>You do not have access to this page.</div>
            )}
        </div>
    );
}