import { Children, createContext, useEffect, useState } from "react";


const UserContext = createContext()

function userDetailsFromLocalStorage() {
    const storedUserDetails = localStorage.getItem('userInfo')
    return storedUserDetails ? JSON.parse(storedUserDetails) : null
}

const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(userDetailsFromLocalStorage)

    useEffect(() => {
        if (userDetails) {
            localStorage.setItem('userInfo', JSON.stringify(userDetails))
        }
    }, [userDetails])

    const logout = () => {
        setUserDetails(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, logout }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }
