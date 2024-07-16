import { useState, createContext, useContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    //const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        //const userId = localStorage.getItem('userId');
        if (userInfo) {
            setUser({ userInfo });
            //setUserId({ userId });
        }
    }, []);

    const login = (user) => {
        setUser(user);
        //setUserId({ userId });
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    const logout = () => {
        setUser(null);
        //setUserId(null);
        localStorage.clear();
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