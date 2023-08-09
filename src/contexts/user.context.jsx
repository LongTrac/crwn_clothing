import { createContext, useEffect, useReducer } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

//Context consist of 2 different parts
//this is the actual value that you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


export const USER_ACTION_TYPE = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}
//REDUCER:-------------------------------------------------------------------------------------------------------------
const userReducer = (state, action) => {
    const {type, payload} = action;         //meaning: based of this type I want to return/update this obj within payload

    console.log('dispatch');
    console.log(action);
    switch(type){
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return (
                //return an obj that spread thru any of the unaffected attr and upthat the one needed
                {   ...state,
                    currentUser: payload
                }
            );
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null,
}
//-----------------------------------------------------------------------------------------------------------------------


//the provider: is the component that will wrap around any  other component that need access to the context inside 
export const UserProvider = ({ children }) => {

    //const [currentUser, setCurrentUser] = useState(null);
    //USEREDUCER HOOK :  take in a reducer and init state, spit out a state and a dispatcher
    const [state, dispatch] = useReducer(userReducer,INITIAL_STATE);     //take in a reducer and init state
    const {currentUser} = state

    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPE.SET_CURRENT_USER, payload:user })
    }


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
    
    const value = { currentUser, setCurrentUser };             //the opposite of decontruction

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}