import { useState, createContext, useContext } from "react";
import { useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = (user) => {
        setUser({user});
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
        );
}

export const useAuth = () => {
    return useContext(AuthContext);
}