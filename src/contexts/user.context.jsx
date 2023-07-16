import { createContext, useState } from "react";

//Context consist of 2 different parts
//this is the actual value that you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//the provider: is the component that will wrap around any  other component that need access to the context inside 
export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };             //the opposite of decontruction

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}