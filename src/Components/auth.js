import { useState, createContext, useContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext({id: 1});// maybe export???

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
        setUser({user});
        //setUserId({ userId });
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