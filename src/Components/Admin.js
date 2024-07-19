import { Register } from "./Register";
import { useAuth } from "./auth";

export const Admin = () => {
    const auth = useAuth();

    return(
        <div>
            {auth.user.role == "admin" && (
                <div>Admin page</div>
            )}
        </div>
    );
}