import { createContext, useEffect, useState } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

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

    //run this once when the component mounted, 
    //useeffect will also run whatever you return from the callback when it unmounted
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{

            //if sign-in/ sign-up: user will not be null ==> execute this block
            if(user){
                //within this function, there is a block of code that check if the snapshot for the doc exist so either way we will get a valid docref 
                createUserDocFromAuth(user);     
            }

            //this is for all cases including sign out ==> set user to null
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}